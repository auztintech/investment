import { endpoints } from "@/config/endpoints";
import authApi from "../authApi";

export interface LoginPayload {
  phone_number: string;
  password: string;
}

export const LoginUser = async (payload: LoginPayload) => {
  const response = await authApi.post(endpoints.User.login, payload, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
