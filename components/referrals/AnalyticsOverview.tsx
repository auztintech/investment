// src/components/referrals/AnalyticsOverview.tsx
import type { TeamAnalytics } from "@/lib/api/referrals";
import { formatCurrency, formatDate } from "@/lib/utils/formatCurrency";

type Props = { data: TeamAnalytics };
export function AnalyticsOverview({ data }: Props) {
  const cards = [
    { label: "Total team members", value: data.total_team_members },
    { label: "Active team members", value: data.active_team_members },
    {
      label: "Total team investment",
      value: formatCurrency(data.total_team_investment, "GHS"),
    },
    {
      label: "Total commissions",
      value: formatCurrency(data.total_commissions, "GHS"),
    },
  ];
  const levels = [
    {
      label: "Level 1",
      count: data.level_1_count,
      amount: data.level_1_commissions,
    },
    {
      label: "Level 2",
      count: data.level_2_count,
      amount: data.level_2_commissions,
    },
    {
      label: "Level 3",
      count: data.level_3_count,
      amount: data.level_3_commissions,
    },
    {
      label: "Level 4",
      count: data.level_4_count,
      amount: data.level_4_commissions,
    },
  ];
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-lg border bg-card p-4">
            <div className="text-sm text-muted-foreground">{c.label}</div>
            <div className="font-semibold">
              {typeof c.value === "number" ? c.value : c.value}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border bg-card p-4">
        <div className="font-medium mb-2">Per-level overview</div>
        <div className="grid md:grid-cols-2 gap-4">
          {levels.map((l) => (
            <div key={l.label} className="rounded border p-3">
              <div className="text-sm">{l.label}</div>
              <div className="text-xs text-muted-foreground">
                Count: {l.count}
              </div>
              <div className="text-xs text-muted-foreground">
                Commissions: {formatCurrency(l.amount, "GHS")}
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground mt-3">
          Updated: {formatDate(data.updated_at)}
        </div>
      </div>
    </div>
  );
}
