"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon, Lock } from "lucide-react";
import InvestmentModal from "./InvestmentModal";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import {
  InvestmentPlan,
  useActiveInvestments,
} from "@/lib/hooks/useInvestment";
import BouncingBubbles from "../BouncingBubbles";

export default function InvestmentCard({ plan }: { plan: InvestmentPlan }) {
  const [open, setOpen] = useState(false);
  const { data: activeData } = useActiveInvestments();

  const isCurrent = activeData?.active_investments?.some(
    (inv) => inv.plan_name === plan.name
  );

  const locked = !plan.is_active;

  return (
    <div className="relative overflow-hidden rounded-2xl mb-5 p-4 shadow-sm flex flex-col gap-2 bg-white">
      <BouncingBubbles
        count={2}
        colors={[
          "rgba(79, 70, 229, 0.2)",
          "rgba(59, 130, 246, 0.2)",
          "rgba(96, 165, 250, 0.2)",
        ]}
      />

      <div className="flex items-start justify-between">
        <div>
          <Badge
            variant={isCurrent ? "destructive" : "secondary"}
            className={`mb-4 uppercase ${
              isCurrent
                ? "bg-linear-to-r from-blue-600 to-blue-400 text-white"
                : ""
            }`}>
            {plan.name} (Level {plan.level})
          </Badge>

          {/* ADDED FIELDS */}
          <p className="text-sm text-gray-500">
            Daily Tasks: {plan.daily_video_limit}
          </p>
          <p className="text-sm text-gray-500">
            Deposit Amount: {formatCurrency(plan.investment_amount)}
          </p>
          <p className="text-sm text-gray-500">
            Duration: {plan.lock_period_days} days
          </p>
        </div>

        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isCurrent ? "bg-blue-500" : "bg-black"
          }`}>
          <span className="text-sm font-bold text-white">
            {plan.name.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-2">
        {isCurrent ? (
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600">
            <BadgeCheckIcon className="mr-1 h-4 w-4" />
            Current Level
          </Badge>
        ) : locked ? (
          <Button
            disabled
            variant="outline"
            className="w-full flex items-center gap-2">
            <Lock className="w-4 h-4" /> Locked
          </Button>
        ) : (
          <Button className="w-full" onClick={() => setOpen(true)}>
            Join Now
          </Button>
        )}
      </div>

      <InvestmentModal open={open} onClose={() => setOpen(false)} plan={plan} />
    </div>
  );
}
