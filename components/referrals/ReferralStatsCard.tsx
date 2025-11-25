import { formatCurrency } from "@/lib/utils/formatCurrency";
import { Users, Layers, Wallet, Star, Award, Crown } from "lucide-react";

type Props = {
  totalReferrals: number;
  totalCommissions: string;
  level1Count: number;
  level2Count: number;
  level3Count: number;
  level4Count: number;
};

export function ReferralStatsCard(props: Props) {
  const items = [
    {
      label: "Total referrals",
      value: props.totalReferrals,
      icon: Users,
      color: "text-emerald-600",
    },
    {
      label: "Total commissions",
      value: formatCurrency(props.totalCommissions, "GHC"),
      icon: Wallet,
      color: "text-emerald-600",
    },
    {
      label: "Level 1",
      value: props.level1Count,
      icon: Star,
      color: "text-emerald-500",
    },
    {
      label: "Level 2",
      value: props.level2Count,
      icon: Award,
      color: "text-emerald-500",
    },
    {
      label: "Level 3",
      value: props.level3Count,
      icon: Layers,
      color: "text-emerald-500",
    },
    {
      label: "Level 4",
      value: props.level4Count,
      icon: Crown,
      color: "text-emerald-500",
    },
  ];

  return (
    <div className="rounded-xl border bg-card p-5">
      <h2 className="text-lg font-semibold mb-4">Referral Statistics</h2>

      <div className="grid grid-cols-2 gap-4">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <div
              key={it.label}
              className="rounded-lg border p-4 bg-muted/30 hover:bg-muted/50 transition">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon className={`w-4 h-4 ${it.color}`} />
                <span className="text-sm">{it.label}</span>
              </div>

              <div className="mt-1 text-sm font-semibold text-emerald-700">
                {it.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
