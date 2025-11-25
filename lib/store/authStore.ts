import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface UserProfile {
  full_name?: string;
  mobile_money_number?: string;
  mobile_money_provider?: string;
  profile_picture?: string;
}


interface User {
  id: number;
  username: string;
  phone_number: string;
  referral_code: string;
  available_balance?: string;
  invested_balance?: string;
  total_earned?: string;
  date_joined?: string;
  referral_stats?: string;
  profile?: UserProfile;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  hydrated: boolean;
  setAuth: (data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  }) => void;
  logout: () => void;
  setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: Cookies.get("accessToken") ?? null,
      refreshToken: Cookies.get("refreshToken") ?? null,
      hydrated: false,
      setAuth: ({ user, accessToken, refreshToken }) => {
        set({ user, accessToken, refreshToken });
        Cookies.set("accessToken", accessToken, { secure: true });
        Cookies.set("refreshToken", refreshToken, { secure: true });
      },
      logout: () => {
        set({ user: null, accessToken: null, refreshToken: null });
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
      },
      setHydrated: (value) => set({ hydrated: value }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        if (state) state.setHydrated(true);
      },
    }
  )
);
