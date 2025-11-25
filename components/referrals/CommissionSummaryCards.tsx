import { formatCurrency } from "@/lib/utils/formatCurrency";
import { Sun, CalendarRange, Calendar, Wallet } from "lucide-react";

type Props = {
  today: string;
  thisWeek: string;
  thisMonth: string;
  total: string;
};

export function CommissionSummaryCards({
  today,
  thisWeek,
  thisMonth,
  total,
}: Props) {
  const cards = [
    {
      label: "Today",
      value: today,
      icon: Sun,
      color: "text-emerald-600",
    },
    {
      label: "This week",
      value: thisWeek,
      icon: CalendarRange,
      color: "text-emerald-600",
    },
    {
      label: "This month",
      value: thisMonth,
      icon: Calendar,
      color: "text-emerald-600",
    },
    {
      label: "Total",
      value: total,
      icon: Wallet,
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="rounded-xl border bg-card p-5 grid grid-cols-2 gap-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.label} className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon className={`w-4 h-4 ${c.color}`} />
              {c.label}
            </div>

            <div className="mt-2 text-sm font-semibold text-emerald-700">
              {formatCurrency(c.value, "GHC")}
            </div>
          </div>
        );
      })}
    </div>
  );
}
