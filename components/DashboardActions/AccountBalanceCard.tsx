"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useWalletBalance } from "@/lib/hooks/useWallet";
import { formatCurrency } from "@/lib/utils/formatCurrency";

// Define the type of the props that the component will accept
type AccountBalanceCardProps = {
  button?: React.ReactNode; // Button prop can be passed, or it can be undefined
};

export default function AccountBalanceCard({
  button,
}: AccountBalanceCardProps) {
  const { data: balance, isLoading: balanceLoading } = useWalletBalance();
  const [showBalance, setShowBalance] = useState(true);

  return (
    <Card className="w-full shadow-sm rounded-2xl border-0 mb-5 relative z-10">
      <CardContent className="flex justify-between items-end gap-2">
        <div>
          <p className="flex items-center text-sm">
            Wallet Balance
            <button
              onClick={() => setShowBalance((prev) => !prev)}
              className="ml-2 text-muted-foreground hover:text-emerald-600 transition"
              aria-label="Toggle balance visibility">
              {showBalance ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>
          </p>
          <p className="font-bold text-emerald-600 text-[1.2rem] mt-2">
            {balanceLoading
              ? "... "
              : showBalance
              ? formatCurrency(balance?.available_balance ?? 0)
              : "••••••"}
          </p>
        </div>

        {/* Render the button if passed */}
        {button}
      </CardContent>
    </Card>
  );
}
