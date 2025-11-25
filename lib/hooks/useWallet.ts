import { useQuery, useMutation } from "@tanstack/react-query";
import { endpoints } from "@/config/endpoints";
import api from "../axiosInstance";
import { AxiosError } from "axios";


import {
  getWalletBalance,
  createDepositRequest,
  submitPayment,
  DepositRequestPayload,
  SubmitPaymentPayload,
  getDepositRequestDetails,
  DepositRequestResponse,
  WithdrawalRequest,
} from "../api/wallet";

export const useWalletBalance = () =>
  useQuery({
    queryKey: ["walletBalance"],
    queryFn: getWalletBalance,
  });

export const useDepositRequest = () =>
  useMutation({
    mutationFn: (payload: DepositRequestPayload) => createDepositRequest(payload),
  });

export const useSubmitPayment = () =>
  useMutation({
    mutationFn: (payload: SubmitPaymentPayload) => submitPayment(payload),
  });

export const useDepositHistory = () =>
  useQuery<DepositRequestResponse[]>({
    queryKey: ["depositHistory"],
    queryFn: async () => {
      const res = await api.get(endpoints.Wallet.createDepositRequest);
      return res.data;
    },
  });


export const useDepositRequestDetails = (id: number | null) =>
  useQuery({
    queryKey: ["depositRequestDetails", id],
    queryFn: () => getDepositRequestDetails(id!),
    enabled: !!id,
  });

// GET withdrawal requests (history)
export const useWithdrawalRequests = () =>
  useQuery<WithdrawalRequest[]>({
    queryKey: ["withdrawalRequests"],
    queryFn: async () => {
      const res = await api.get(endpoints.Wallet.withdrawalRequests);
      return res.data;
    },
  });

// POST new withdrawal request
export const useCreateWithdrawalRequest = () =>
  useMutation({
    mutationFn: async (data: {
      investment_id: string;
      amount: string;
      account_details: {
        provider: string;
        phone_number: string;
        account_name: string;
      };
    }) => {
      try {
        const res = await api.post(endpoints.Wallet.withdrawalRequests, data);
        return res.data;
      } catch (err: unknown) {
        const axiosErr = err as AxiosError;
        return Promise.reject(axiosErr.response?.data);
      }
    },
  });
