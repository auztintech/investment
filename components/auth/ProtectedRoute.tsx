"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import LoadingLogo from "@/components/LoadingLogo";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  delay?: number;
}

export default function ProtectedRoute({
  children,
  redirectTo = "/signin",
  delay = 1000,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, hydrated } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (hydrated) {
      if (!user) {
        router.replace(redirectTo);
      } else {
        // ⏳ optional delay (e.g., for logo animation)
        timer = setTimeout(() => setLoading(false), delay);
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [hydrated, user, router, redirectTo, delay]);

  if (!hydrated || loading) return <LoadingLogo />;
  if (!user) return null; // while redirecting

  return <>{children}</>;
}
