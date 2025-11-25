import type { ReferralRelationship } from "@/lib/api/referrals";
import { formatDate } from "@/lib/utils/formatCurrency";
import { EmptyState } from "@/lib/utils/States";

type Props = { data: ReferralRelationship[] };

export function HistoryTimeline({ data }: Props) {
  if (!data.length) return <EmptyState message="No referral history yet." />;

  return (
    <div className="space-y-6">
      <h2>Referral history</h2>
      {data.map((h, idx) => (
        <div key={h.id} className="relative flex space-x-4">
          {/* Timeline indicator */}
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-emerald-500 rounded-full mt-1"></div>
            {idx !== data.length - 1 && (
              <div className="w-px bg-muted flex-1"></div>
            )}
          </div>

          {/* Card content */}
          <div className="flex-1 rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="font-medium text-sm">
                {h.referred_username} • {h.referred_phone}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDate(h.created_at)}
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Code used: {h.referral_code_used}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
