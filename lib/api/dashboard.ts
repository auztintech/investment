// src/lib/api/dashboard.ts
import { endpoints } from "@/config/endpoints";
import api from "../axiosInstance";

// Profile info
export interface DashboardProfile {
  full_name: string;
  mobile_money_number: string;
  mobile_money_provider: "MTN" | "Vodafone" | "AirtelTigo";
  profile_picture?: string | null;
}

// Dashboard data returned from API
export interface DashboardData {
  username: string;
  phone_number: string;
  available_balance: string;
  invested_balance: string;
  total_balance: string;
  total_earned: string;
  referral_code: string;
  profile: DashboardProfile;
  referral_stats: string;
}

// Fetch user dashboard details using GET
export const getUserDetails = async (): Promise<DashboardData> => {
  const response = await api.get<DashboardData>(endpoints.User.dashboard);
  return response.data;
};

export const updateUserProfile = async (data: {
  full_name: string;
  mobile_money_number: string;
  mobile_money_provider: "MTN" | "Vodafone" | "AirtelTigo";
}) => {
  const response = await api.put(endpoints.User.updateProfile, data);
  return response.data;
};

