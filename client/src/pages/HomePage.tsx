import { useUser } from "@/hooks/use-user";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  UserCheck,
  CalendarCheck,
  Timer,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/ui/stats-card";
import { ApproachButton } from "@/components/ui/approach-button";
import type { ApproachRecord } from "@db/schema";

export default function HomePage() {
  const { user, logout } = useUser();

  const { data: approaches } = useQuery<ApproachRecord[]>({
    queryKey: ["/api/approaches"],
  });

  const todayApproaches = approaches?.filter((a) => {
    const today = new Date();
    const approachDate = new Date(a.approach_datetime);
    return (
      approachDate.getDate() === today.getDate() &&
      approachDate.getMonth() === today.getMonth() &&
      approachDate.getFullYear() === today.getFullYear()
    );
  });

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mr-4 hidden md:flex">
              <div className="mr-6 flex items-center space-x-2">
                <Users className="h-6 w-6" />
                <span className="hidden font-bold sm:inline-block">
                  ストリートナンパ実績管理
                </span>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
              <div className="w-full flex-1 md:w-auto md:flex-none">
                <Button
                  variant="ghost"
                  className="text-sm"
                  onClick={() => logout()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  ログアウト
                </Button>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center space-y-6 py-10">
              <h1 className="text-3xl font-bold tracking-tight text-center">
                ようこそ {user?.email} さん
              </h1>
              <p className="text-muted-foreground text-center">
                今日も素敵な出会いを見つけましょう
              </p>
            </div>
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
              <StatsCard
                title="本日の声かけ数"
                value={todayApproaches?.length || 0}
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
              />
              <StatsCard
                title="累計声かけ数"
                value={approaches?.length || 0}
                icon={<UserCheck className="h-4 w-4 text-muted-foreground" />}
              />
              <StatsCard
                title="今月の目標達成率"
                value="0%"
                icon={<CalendarCheck className="h-4 w-4 text-muted-foreground" />}
              />
              <StatsCard
                title="平均所要時間"
                value="-"
                icon={<Timer className="h-4 w-4 text-muted-foreground" />}
              />
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-7">
              <div className="md:col-span-4">
                <ApproachButton />
              </div>
              <div className="md:col-span-3">
                {/* TODO: 最近の記録一覧 */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
