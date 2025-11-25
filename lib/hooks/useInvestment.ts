import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../axiosInstance";
import { endpoints } from "@/config/endpoints";
import { AxiosError } from "axios";
import { toast } from "sonner";

// -----------------------------
// Types based on your API docs
// -----------------------------

export interface InvestmentPlan {
  id: number; 
  level: number; 
  name: string; 
  investment_amount: string; 
  duration_days: number; 
  lock_period_days: number; 
  daily_video_limit: number; 
  is_active: boolean; 
}

export interface CreatedInvestment {
  id: number;
  investment_id: string;
  plan_name: string;
  amount_invested: string;
  expected_return: string;
  daily_earnings: string;
  start_date: string;
  end_date: string;
  status: string;
  days_remaining: number;
}

export interface CreateInvestmentResponse {
  status: string;
  message: string;
  investment: CreatedInvestment;
  wallet_balance: {
    available_balance: number;
    invested_balance: number;
    total_balance: number;
  };
  active_investments_count: number;
}

export interface InvestmentDetails {
  id: number;
  investment_id: string;
  plan: number;
  plan_name: string;
  plan_level: number;
  amount_invested: string; 
  start_date: string; 
  end_date: string; 
  earnings_unlock_date: string;
  status: string; 
  total_earnings: string;
  video_earnings: string;
  referral_earnings: string;
  withdrawn_earnings: string;
  available_earnings: string;
  can_withdraw_earnings: boolean;
  can_withdraw_capital: boolean;
  days_until_capital_unlock: number;
  days_until_earnings_unlock: number;
  daily_video_limit: number;
  created_at: string; 
}

export interface ActiveInvestmentsResponse {
  active_investments: InvestmentDetails[];
  total_investments: number;
  total_invested_amount: string;
}


export interface InvestmentStats {
  total_invested: string;
  total_earnings: string;
  available_earnings: string;
  withdrawn_earnings: string;
  active_investments: number;
  completed_investments: number;
  current_plans: string[];
  daily_video_limit: number;
  total_active_investments_value: string;
}


// -----------------------------
// React Query Hooks
// -----------------------------

// 4.1 Get Investment Plans
export const useInvestmentPlans = () =>
  useQuery<InvestmentPlan[]>({
    queryKey: ["investmentPlans"],
    queryFn: async () => {
      const res = await api.get(endpoints.Investments.plans);
      return res.data;
    },
  });

// 4.2 Get Active Investments
export const useHistoryInvestments = () =>
  useQuery<InvestmentDetails[]>({
    queryKey: ["historyInvestments"],
    queryFn: async () => {
      const res = await api.get(endpoints.Investments.history);

      console.log("Investments History", res);
      return res.data;
    },
  });

// 4.3 Get Active Investments
export const useActiveInvestments = () =>
  useQuery<ActiveInvestmentsResponse>({
    queryKey: ["activeInvestments"],
    queryFn: async () => {
      const res = await api.get(endpoints.Investments.active);
      return res.data;
    },
  });

// 4.4 Get Investment Statistics
export const useInvestmentStats = () =>
  useQuery<InvestmentStats>({
    queryKey: ["investmentStats"],
    queryFn: async () => {
      const res = await api.get(endpoints.Investments.stats);
      return res.data;
    },
  });

// 4.2 Create Investment
export const useCreateInvestment = () => {
  const queryClient = useQueryClient();

  return useMutation<CreateInvestmentResponse, AxiosError<unknown>, number>({
    mutationFn: async (planId: number) => {
      const res = await api.post(
        endpoints.Investments.create,
        { plan_id: planId },
        {
          validateStatus: (status) => status >= 200 && status < 300,
        }
      );

      return res.data as CreateInvestmentResponse;
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["activeInvestments"] });
      queryClient.invalidateQueries({ queryKey: ["investmentStats"] });

      toast.success("Investment created successfully!", {
        description: data?.message ?? "Your investment is now active.",
      });
    },

    onError: (error) => {
      const fallback = "Something went wrong. Please try again.";
      let message = fallback;
      
      if (error.response?.data && typeof error.response.data === "object") {
        const errObj = error.response.data as Record<string, unknown>;

        if (
          Array.isArray(errObj.non_field_errors) &&
          errObj.non_field_errors[0]
        ) {
          message = String(errObj.non_field_errors[0]);
        } else if (typeof errObj.message === "string") {
          message = errObj.message;
        }
      }

      toast.error("Investment failed", { description: message });
    },
  });
};