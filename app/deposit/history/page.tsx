"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import BottomNav from "@/components/ButtonNav";
import { HeaderBar } from "@/components/HeaderBar";
import { useDepositHistory } from "@/lib/hooks/useWallet";

export default function DepositHistoryPage() {
  const { data: deposits, isLoading, error } = useDepositHistory();

  if (isLoading)
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  if (error)
    return (
      <p className="text-sm text-red-500">Failed to load deposit history</p>
    );

  if (!deposits || deposits.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No deposit history yet</p>
    );
  }

  return (
    <ProtectedRoute>
      <HeaderBar title="Deposit History" />
      <div className="container space-y-4 mt-6">
        <div className="space-y-3">
          {deposits.map((d) => (
            <div
              key={d.id}
              className="flex justify-between items-center p-3 border rounded-lg bg-muted/20">
              {/* Amount on the left */}
              <span className="font-medium text-sm">{d.amount} GHC</span>

              {/* Status on the right with color coding */}
              <span
                className={`text-xs font-semibold capitalize ${
                  d.status === "pending" || d.status === "paid"
                    ? "text-yellow-600"
                    : d.status === "confirmed" || d.status === "completed"
                    ? "text-green-600"
                    : "text-red-600"
                }`}>
                {d.status === "paid" ? "Pending" : d.status}
              </span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </ProtectedRoute>
  );
}
