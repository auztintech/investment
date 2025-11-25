"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {
  useActiveInvestments,
  InvestmentDetails,
} from "@/lib/hooks/useInvestment";
import { formatCurrency, formatDate } from "@/lib/utils/formatCurrency";

export function ActiveInvestmentsTable() {
  const { data: activeInvestments } = useActiveInvestments();

  return (
    <div className="mb-8 rounded-xl border bg-card p-5">
      <h2 className="text-lg mb-4">Active Investments</h2>

      <div className="w-full overflow-x-auto rounded-xl border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-emerald-50">
              <TableHead className="text-xs">Plan</TableHead>
              <TableHead className="text-xs">Level</TableHead>
              <TableHead className="text-xs">Invested</TableHead>
              <TableHead className="text-xs">Video Earnings</TableHead>
              <TableHead className="text-xs">Referral Earnings</TableHead>
              <TableHead className="text-xs">Total Earnings</TableHead>
              <TableHead className="text-xs">Available Earnings</TableHead>
              <TableHead className="text-xs">Status</TableHead>
              <TableHead className="text-xs">Start Date</TableHead>
              <TableHead className="text-xs">End Date</TableHead>
              <TableHead className="text-xs">Capital Unlock (days)</TableHead>
              <TableHead className="text-xs">Earnings Unlock (days)</TableHead>
              <TableHead className="text-center">...</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {activeInvestments?.active_investments.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={13}
                  className="py-6 text-center text-muted-foreground">
                  No active investments found
                </TableCell>
              </TableRow>
            )}

            {activeInvestments?.active_investments.map(
              (inv: InvestmentDetails) => (
                <TableRow key={inv.id} className="hover:bg-muted/40">
                  <TableCell className="capitalize text-xs">
                    {inv.plan_name}
                  </TableCell>

                  <TableCell className="capitalize text-xs">{inv.plan_level}</TableCell>

                  <TableCell className="capitalize text-xs">
                    {formatCurrency(inv.amount_invested, "GHC")}
                  </TableCell>

                  <TableCell className="capitalize text-xs">
                    {formatCurrency(inv.video_earnings, "GHC")}
                  </TableCell>

                  <TableCell className="capitalize text-xs">
                    {formatCurrency(inv.referral_earnings, "GHC")}
                  </TableCell>

                  <TableCell className="capitalize text-xs">
                    {formatCurrency(inv.total_earnings, "GHC")}
                  </TableCell>

                  <TableCell className="capitalize text-xs">
                    {formatCurrency(inv.available_earnings, "GHC")}
                  </TableCell>

                  <TableCell className="capitalize text-xs">{inv.status}</TableCell>

                  <TableCell className="capitalize text-xs">
                    {formatDate(inv.start_date)}
                  </TableCell>

                  <TableCell className="capitalize text-xs">
                    {formatDate(inv.end_date)}
                  </TableCell>

                  <TableCell className="capitalize text-xs">
                    {inv.days_until_capital_unlock}
                  </TableCell>

                  <TableCell className="capitalize text-xs">
                    {inv.days_until_earnings_unlock}
                  </TableCell>

                  <TableCell className="text-right">
                    <Link href={`/withdrawal/${inv.investment_id}`}
                      className="capitalize text-xs bg-emerald-600 text-white py-1 px-3 rounded-lg">
                      Withdraw
                    </Link>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
