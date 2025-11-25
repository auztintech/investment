import { endpoints } from "@/config/endpoints";
import api from "../axiosInstance";


export type BalanceResponse = {
  available_balance: number;
  invested_balance: number;
  total_balance: number;
};

export type DepositRequestPayload = {
  amount: string; // e.g., "100.00"
  user_momo_number: string; // e.g., "0241234567"
  user_momo_network: string; // e.g., "mtn"
};

export type DepositRequestResponse = {
  id: number;
  amount: string;
  user_momo_number: string;
  user_momo_network: string;
  our_momo_account_details: {
    account_name: string;
    account_number: string;
    network: string;
  };
  reference: string;
  expires_in: string; // "15 minutes"
  status: string; // "pending"
};

export type SubmitPaymentPayload = {
  deposit_reference: string;
  transaction_reference: string;
};

export type SubmitPaymentResponse = {
  status: string;
  message: string;
  deposit_reference: string;
  amount: number;
  next_step: string;
};

export interface WithdrawalRequest {
  id: number; 
  user: number; 
  user_id: string; 
  amount: string; 
  investment_id: string; 
  account_details: Record<string, unknown>; 
  status: "pending" | "approved" | "processing" | "completed" | "rejected"; 
  is_weekend: boolean; 
  maturity_date: string; 
  reference: string; 
  created_at: string; 
  updated_at: string; 
}


export const getWalletBalance = async (): Promise<BalanceResponse> => {
  const res = await api.get(endpoints.Wallet.balance);
  return res.data;
};

export const createDepositRequest = async (
  payload: DepositRequestPayload
): Promise<DepositRequestResponse> => {
    console.log("➡️ Sending deposit request payload:", payload);
  const res = await api.post(endpoints.Wallet.createDepositRequest, payload);
  console.log("⬅️ Deposit request response:", res.data);
  return res.data;
};

export const submitPayment = async (
  payload: SubmitPaymentPayload
): Promise<SubmitPaymentResponse> => {
  const res = await api.post(endpoints.Wallet.submitPayment, payload);
  return res.data;
};

export const getDepositRequestDetails = async (id: number) => {
  const res = await api.get(`${endpoints.Wallet.createDepositRequest}${id}/`);
  console.log("⬅️ GET deposit request details:", res.data);
  return res.data;
};
