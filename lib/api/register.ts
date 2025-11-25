import { endpoints } from "@/config/endpoints";
import authApi from "../authApi";

export interface RegisterPayload {
  username: string;
  phone_number: string;
  password: string;
  password_confirm: string;
  referral_code?: string;
}

export const registerUser = async (payload: RegisterPayload) => {
  const response = await authApi.post(endpoints.User.register, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
