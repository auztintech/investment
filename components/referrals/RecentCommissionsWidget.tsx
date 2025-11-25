import type { ReferralCommission } from "@/lib/api/referrals";
import { formatCurrency, formatDate } from "@/lib/utils/formatCurrency";
import { DollarSign } from "lucide-react";

type Props = { data: ReferralCommission[] };

export function RecentCommissionsWidget({ data }: Props) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="font-medium mb-3 text-lg">Recent Commissions</div>
      <ul className="divide-y divide-muted">
        {data.map((c) => (
          <li
            key={c.id}
            className="flex items-center justify-between py-3 hover:bg-muted/40 transition-colors rounded-md px-2">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-sm font-medium">
                <DollarSign className="h-4 w-4 text-emerald-500" />
                {c.level_display} • {c.referred_phone}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDate(c.created_at)}
              </div>
            </div>
            <div className="text-sm font-semibold text-emerald-600">
              {formatCurrency(c.commission_amount, "GHS")}
            </div>
          </li>
        ))}
        {data.length === 0 && (
          <li className="py-6 text-center text-muted-foreground">
            No recent commissions
          </li>
        )}
      </ul>
    </div>
  );
}
