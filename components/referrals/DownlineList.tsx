// src/components/referrals/DownlineList.tsx
import type { Downline } from "@/lib/api/referrals";
import { formatDate } from "@/lib/utils/formatCurrency";
import { EmptyState } from "@/lib/utils/States";

type Props = { data: Downline[] };

export function DownlineList({ data }: Props) {
  const groups = [1, 2, 3, 4].map((lvl) => ({
    level: lvl,
    items: data.filter((d) => d.level === lvl),
  }));

  return (
    <div className="space-y-6">
      {groups.map((g) => (
        <div key={g.level}>
          <div className="text-sm text-muted-foreground mb-2 font-medium">
            Level {g.level}
          </div>
          <div className="rounded-xl border bg-card shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted">
                <tr className="text-muted-foreground">
                  <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
                    Username
                  </th>
                  <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
                    Phone
                  </th>
                  <th className="px-4 py-3 text-left font-medium min-w-[140px]">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {g.items.length === 0 && (
                  <tr>
                    <td colSpan={3} className="py-6 text-center">
                      <EmptyState message="No users at this level" />
                    </td>
                  </tr>
                )}

                {g.items.map((it) => (
                  <tr
                    key={it.id}
                    className="border-t hover:bg-muted/40 transition-colors rounded-md">
                    <td className="px-4 py-3 whitespace-nowrap text-xs capitalize">
                      {it.downline_username}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs capitalize">
                      {it.downline_phone}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs capitalize">{formatDate(it.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
