import { pgTable, uuid, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const approachRecords = pgTable("approach_records", {
  id: uuid("id").defaultRandom().primaryKey(),
  user_id: uuid("user_id").notNull().references(() => users.id),
  approach_datetime: timestamp("approach_datetime").defaultNow().notNull(),
  location: jsonb("location").$type<{
    latitude: number;
    longitude: number;
    place_name?: string;
  }>(),
  result: text("result").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  approaches: many(approachRecords),
}));

export const approachRecordsRelations = relations(approachRecords, ({ one }) => ({
  user: one(users, {
    fields: [approachRecords.user_id],
    references: [users.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertApproachSchema = createInsertSchema(approachRecords);
export const selectApproachSchema = createSelectSchema(approachRecords);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type ApproachRecord = typeof approachRecords.$inferSelect;
export type InsertApproachRecord = typeof approachRecords.$inferInsert;
