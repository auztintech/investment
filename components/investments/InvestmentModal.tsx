"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCreateInvestment, InvestmentPlan } from "@/lib/hooks/useInvestment";
import { FC } from "react";

interface InvestmentModalProps {
  open: boolean;
  onClose: () => void;
  plan: InvestmentPlan;
}

const InvestmentModal: FC<InvestmentModalProps> = ({ open, onClose, plan }) => {
  const { mutate, isPending } = useCreateInvestment();

  const handleInvest = () => {
    mutate(plan.id);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Investment</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Confirmation text */}
          <p className="text-sm text-muted-foreground">
            Kindly confirm your investment to proceed.
          </p>

          <Button onClick={handleInvest} disabled={isPending}>
            {isPending ? "Processing..." : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentModal;
