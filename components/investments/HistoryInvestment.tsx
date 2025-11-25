"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useHistoryInvestments,
  InvestmentDetails,
} from "@/lib/hooks/useInvestment";
import { formatCurrency, formatDate } from "@/lib/utils/formatCurrency";

export function InvestmentHistoryTable() {
  const { data: historyInvestments } = useHistoryInvestments();

  return (
    <div className="mb-8 rounded-xl border bg-card p-5">
      <h2 className="text-lg mb-4">Investment History</h2>

      <div className="w-full overflow-x-auto rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-emerald-50">
              <TableHead className="text-xs">Plan</TableHead>
              <TableHead className="text-xs">Level</TableHead>
              <TableHead className="text-xs">Invested</TableHead>
              <TableHead className="text-xs">Total Earnings</TableHead>
              <TableHead className="text-xs">Withdrawn</TableHead>
              <TableHead className="text-xs">Status</TableHead>
              <TableHead className="text-xs">
                Start Date
              </TableHead>
              <TableHead className="text-xs">End Date</TableHead>
              <TableHead className="text-xs">Created</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {historyInvestments?.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="py-6 text-center text-muted-foreground">
                  No investment history found
                </TableCell>
              </TableRow>
            )}

            {historyInvestments?.map((inv: InvestmentDetails) => (
              <TableRow key={inv.id} className="hover:bg-muted/40">
                <TableCell className="capitalize text-xs">
                  {inv.plan_name}
                </TableCell>

                <TableCell className="capitalize text-xs">
                  {inv.plan_level}
                </TableCell>

                <TableCell className="capitalize text-xs">
                  {formatCurrency(inv.amount_invested, "GHC")}
                </TableCell>

                <TableCell className="capitalize text-xs">
                  {formatCurrency(inv.total_earnings, "GHC")}
                </TableCell>

                <TableCell className="capitalize text-xs">
                  {formatCurrency(inv.withdrawn_earnings, "GHC")}
                </TableCell>

                <TableCell className="capitalize text-xs">
                  {inv.status}
                </TableCell>

                <TableCell className="capitalize text-xs">
                  {formatDate(inv.start_date)}
                </TableCell>

                <TableCell className="capitalize text-xs">
                  {formatDate(inv.end_date)}
                </TableCell>

                <TableCell className="capitalize text-xs">
                  {formatDate(inv.created_at)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
