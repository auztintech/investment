import { formatCurrency, formatDate } from "@/lib/utils/formatCurrency";
import type { ReferralCommission } from "@/lib/api/referrals";

type Props = { data: ReferralCommission[] };

export function CommissionTable({ data }: Props) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border bg-card shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          <tr className="text-muted-foreground">
            <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
              Level
            </th>
            <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
              Referrer
            </th>
            <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
              Referred
            </th>
            <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
              %
            </th>
            <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
              Investment
            </th>
            <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
              Commission
            </th>
            <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
              Paid
            </th>
            <th className="px-4 py-3 text-left font-medium min-w-[150px]">
              Paid Date
            </th>
            <th className="px-4 py-3 text-left font-medium min-w-[150px]">
              Created
            </th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 && (
            <tr>
              <td
                colSpan={9}
                className="py-6 text-center text-muted-foreground">
                No commission records found
              </td>
            </tr>
          )}

          {data.map((row) => (
            <tr
              key={row.id}
              className="border-t hover:bg-muted/40 transition-colors">
              <td className="px-4 py-3 whitespace-nowrap text-xs capitalize">
                {row.level_display}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-xs capitalize">
                {row.referrer_phone}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-xs capitalize">
                {row.referred_phone}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-xs capitalize">
                {row.commission_percentage}%
              </td>

              <td className="px-4 py-3 whitespace-nowrap text-xs capitalize">
                {formatCurrency(row.investment_amount, "GHS")}
              </td>

              <td className="px-4 py-3 text-emerald-600 whitespace-nowrap text-xs capitalize">
                {formatCurrency(row.commission_amount, "GHS")}
              </td>

              <td className="px-4 py-3 whitespace-nowrap text-xs capitalize">
                {row.is_paid ? (
                  <span className="text-emerald-600 font-medium">Yes</span>
                ) : (
                  <span className="text-red-500">No</span>
                )}
              </td>

              <td className="px-4 py-3 whitespace-nowrap text-xs capitalize">
                {row.paid_date ? formatDate(row.paid_date) : "-"}
              </td>

              <td className="px-4 py-3 whitespace-nowrap text-xs capitalize">
                {formatDate(row.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
