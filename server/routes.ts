import { type Express } from "express";
import { createServer } from "http";
import { setupAuth } from "./auth";
import { db } from "../db";
import { approachRecords, insertApproachSchema } from "@db/schema";

export function registerRoutes(app: Express) {
  setupAuth(app);

  // 声かけ記録API
  app.post("/api/approaches", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("ログインが必要です");
    }

    const result = insertApproachSchema.safeParse({
      ...req.body,
      user_id: req.user.id,
    });

    if (!result.success) {
      return res.status(400).send(
        "入力が正しくありません: " + result.error.issues.map((i) => i.message).join(", "),
      );
    }

    try {
      const [record] = await db.insert(approachRecords).values(result.data).returning();
      res.json(record);
    } catch (error) {
      res.status(500).send("記録に失敗しました");
    }
  });

  // 声かけ履歴取得API
  app.get("/api/approaches", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("ログインが必要です");
    }

    try {
      const records = await db.query.approachRecords.findMany({
        where: (approaches) => eq(approaches.user_id, req.user.id),
        orderBy: (approaches) => desc(approaches.approach_datetime),
        limit: 50,
      });
      res.json(records);
    } catch (error) {
      res.status(500).send("データの取得に失敗しました");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
