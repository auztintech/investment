// src/app/deposit/page.tsx
"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import BottomNav from "@/components/ButtonNav";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { History } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  useDepositRequest,
  useDepositRequestDetails,
} from "@/lib/hooks/useWallet";
import DepositDetailsDialog from "@/components/DepositDetailsDialog";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import AccountBalanceCard from "@/components/DashboardActions/AccountBalanceCard";
import {
  getUserDetails,
  DashboardData,
} from "@/lib/api/dashboard";
import { useQuery } from "@tanstack/react-query";
import { HeaderBar } from "@/components/HeaderBar";

export default function DepositPage() {
  const depositOptions = [100, 450, 500, 1200, 3600, 10000, 15000];

  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState("");
  const [momoNumber, setMomoNumber] = useState("");

  const [depositId, setDepositId] = useState<number | null>(null);
  const { data: depositDetails } = useDepositRequestDetails(depositId);

  const depositMutation = useDepositRequest();

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);

  
  const { data: userPro } = useQuery<DashboardData, Error>({
    queryKey: ["dashboard"],
    queryFn: getUserDetails,
  });

  
  useEffect(() => {
    if (!userPro) return;
    
    if (userPro.profile.mobile_money_number) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMomoNumber(userPro.profile.mobile_money_number);
    }
    if (userPro.profile.mobile_money_provider) {
      setNetwork(userPro.profile.mobile_money_provider.toLowerCase());
    }
  }, [userPro]);


  const formatAmount = (val: string) => {
    const num = Number(val);
    if (Number.isNaN(num) || num <= 0) return "";
    return num.toFixed(2);
  };

  const isValidMomoNumber = (num: string) => /^0\d{9}$/.test(num);

  const requestDeposit = () => {
    const payload = {
      amount: formatAmount(amount),
      user_momo_number: momoNumber.trim(),
      user_momo_network: network.trim(),
    };

    if (!payload.amount || !payload.user_momo_number || !payload.user_momo_network) {
      toast.error("Please enter amount, network, and your MoMo number.");
      return;
    }

    if (!isValidMomoNumber(payload.user_momo_number)) {
      toast.error("Enter a valid 10-digit MoMo number (e.g. 0241234567).");
      return;
    }

    depositMutation.mutate(payload, {
      onSuccess: (data) => {
        if (data.id) {
          setDepositId(data.id);
          setExpiresAt(Date.now() + 15 * 60 * 1000);
          setDetailsOpen(true);
        } else {
          toast.error("No deposit ID returned.");
        }
      },
      onError: (err: unknown) => {
        let msg = "Deposit request failed.";

        if (isAxiosError(err)) {
          const data = err.response?.data as { message?: string; detail?: string } | undefined;
          msg = data?.message || data?.detail || msg;
        }

        toast.error(msg);
      },
    });
  };

  const handleExpired = () => {
    setDetailsOpen(false);
    toast.info("Deposit request expired after 15 minutes.");
  };

  return (
    <ProtectedRoute>
      <HeaderBar title="Deposit" icon={<History size={24} />} />
      <div className="container mt-5 space-y-6">
        <AccountBalanceCard button={null} />

        <div className="bg-white shadow rounded-lg p-4 space-y-4">
          <p className="text-sm font-medium text-gray-700">
            Deposit Amount (GHC)
          </p>

          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />

          <div className="grid grid-cols-4 gap-3">
            {depositOptions.map((option) => (
              <button
                key={option}
                onClick={() => setAmount(option.toString())}
                className={`px-4 py-2 rounded-4xl text-sm font-semibold ${
                  Number(amount) === option
                    ? "bg-emerald-600 text-white"
                    : "bg-transparent border"
                }`}>
                {option}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Momo Network */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">MoMo Network</p>

              <Select value={network} onValueChange={setNetwork}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mtn">MTN</SelectItem>
                  <SelectItem value="vodafone">Vodafone</SelectItem>
                  <SelectItem value="airteltigo">AirtelTigo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* MoMo Number */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Your MoMo Number
              </p>
              <Input
                type="tel"
                value={momoNumber}
                onChange={(e) => setMomoNumber(e.target.value)}
                placeholder="e.g. 0241234567"
              />
            </div>
          </div>

          <Button
            onClick={requestDeposit}
            disabled={depositMutation.isPending}
            className="w-full bg-emerald-600 text-white">
            {depositMutation.isPending ? "Requesting..." : "Deposit"}
          </Button>
        </div>

        <div className="bg-gray-50 p-4 text-sm space-y-3">
          <p>You will receive a payment MoMo account after requesting.</p>
          <p>
            Deposit must be completed within <strong>15 minutes</strong>.
          </p>
          <p>Deposit will be credited within 2–5 minutes.</p>
          <p className="text-red-600">
            Always confirm the latest payment account before paying.
          </p>
        </div>
      </div>
      {/* Deposit Details Dialog */}
      <div className="px-5">
        {depositDetails && expiresAt && (
          <DepositDetailsDialog
            open={detailsOpen}
            onOpenChange={setDetailsOpen}
            details={{
              account_name:
                depositDetails.our_momo_account_details.account_name,
              account_number:
                depositDetails.our_momo_account_details.account_number,
              network: depositDetails.our_momo_account_details.network,
              reference: depositDetails.reference,
              amount: depositDetails.amount,
            }}
            expiresAt={expiresAt}
            onExpired={handleExpired}
          />
        )}
      </div>
      <BottomNav />
    </ProtectedRoute>
  );
}
