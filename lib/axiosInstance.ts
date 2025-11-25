import axios, { AxiosError, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { useAuthStore } from "@/lib/store/authStore";

// Create axios instance for authenticated requests
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

// --- REQUEST INTERCEPTOR ---
api.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- TOKEN REFRESH LOGIC ---
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

// --- RESPONSE INTERCEPTOR ---
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only handle 401 (Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (typeof token === "string") {
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${token}`,
              };
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post<{ access: string }>(
          `${process.env.NEXT_PUBLIC_API_URL}/token/refresh/`,
          { refresh: refreshToken }
        );

        // ✅ Update Zustand + cookies
        useAuthStore.getState().setAuth({
          user: useAuthStore.getState().user!,
          accessToken: data.access,
          refreshToken,
        });
        Cookies.set("accessToken", data.access);

        processQueue(null, data.access);

        // Retry the original request
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${data.access}`,
        };
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        useAuthStore.getState().logout();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
