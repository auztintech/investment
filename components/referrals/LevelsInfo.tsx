// src/components/referrals/LevelsInfo.tsx
import type { ReferralLevel } from "@/lib/api/referrals";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { EmptyState } from "@/lib/utils/States";

type Props = { data?: ReferralLevel[] };

export function LevelsInfo({ data }: Props) {
  if (!data || data.length === 0) {
    return <EmptyState message="No level info available." />;
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {data.map((lvl) => (
        <div key={lvl.level} className="rounded-lg border bg-card p-4">
          <div className="font-semibold mb-1">Level {lvl.level}</div>
          <div className="text-sm">Members: {lvl.member_count}</div>
          <div className="text-sm">
            Total commissions: {formatCurrency(lvl.total_commissions, "GHS")}
          </div>
        </div>
      ))}
    </div>
  );
}
