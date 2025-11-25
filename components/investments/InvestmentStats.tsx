"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInvestmentStats } from "@/lib/hooks/useInvestment";
import { formatCurrency } from "@/lib/utils/formatCurrency";

export function InvestmentStatsTable() {
  const { data: investmentStats } = useInvestmentStats();

  return (
    <div className="mb-8 rounded-xl border bg-card p-5">
      <h2 className="text-lg mb-4">Investment Stats</h2>

      <div className="w-full overflow-x-auto rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-emerald-50">
              <TableHead className="text-xs">Total Invested</TableHead>
              <TableHead className="text-xs">Total Earnings</TableHead>
              <TableHead className="text-xs">Available Earnings</TableHead>
              <TableHead className="text-xs">Withdrawn Earnings</TableHead>
              <TableHead className="text-xs">Active Investments</TableHead>
              <TableHead className="text-xs">Completed Investments</TableHead>
              <TableHead className="text-xs">Current Plans</TableHead>
              <TableHead className="text-xs">Daily Video Limit</TableHead>
              <TableHead className="text-xs">
                Total Active Investments Value
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!investmentStats && (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="py-6 text-center text-muted-foreground">
                  No stats available
                </TableCell>
              </TableRow>
            )}

            {investmentStats && (
              <TableRow className="hover:bg-muted/40">
                <TableCell className="text-xs font-semibold">
                  {formatCurrency(investmentStats.total_invested, "GHC")}
                </TableCell>
                <TableCell className="text-xs font-semibold">
                  {formatCurrency(investmentStats.total_earnings, "GHC")}
                </TableCell>
                <TableCell className="text-xs font-semibold">
                  {formatCurrency(investmentStats.available_earnings, "GHC")}
                </TableCell>
                <TableCell className="text-xs font-semibold">
                  {formatCurrency(investmentStats.withdrawn_earnings, "GHC")}
                </TableCell>
                <TableCell className="text-xs font-semibold">
                  {investmentStats.active_investments}
                </TableCell>
                <TableCell className="text-xs font-semibold">
                  {investmentStats.completed_investments}
                </TableCell>
                <TableCell className="text-xs font-semibold">
                  {investmentStats.current_plans.join(", ")}
                </TableCell>
                <TableCell className="text-xs font-semibold">
                  {investmentStats.daily_video_limit}
                </TableCell>
                <TableCell className="text-xs font-semibold">
                  {formatCurrency(
                    investmentStats.total_active_investments_value,
                    "GHC"
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
