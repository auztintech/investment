"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoginUser, LoginPayload } from "@/lib/api/login";
import LoginForm from "@/components/auth_form/LoginForm";
import { AxiosError } from "axios";
import { useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { useAuthStore } from "@/lib/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const formRef = useRef<UseFormReturn<LoginPayload> | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginPayload) => LoginUser(data),
    onSuccess: (data) => {
      // ✅ Save auth data
      setAuth({
        user: data.user,
        accessToken: data.access,
        refreshToken: data.refresh,
      });

      toast.success("Login successful!");
      router.push("/dashboard");
    },
    onError: (error: AxiosError<Record<string, string[]>>) => {
      const backendErrors = error.response?.data;
      if (backendErrors && formRef.current) {
        Object.entries(backendErrors).forEach(([field, messages]) => {
          formRef.current?.setError(field as keyof LoginPayload, {
            type: "server",
            message: messages[0],
          });
        });

        // Show a toast with the first error message
        const firstErrorMessage = Object.values(backendErrors)[0][0];
        toast.error(firstErrorMessage);
      } else {
        toast.error("Login failed");
      }
    },
  });

  const handleSubmit = (
    values: LoginPayload,
    form: UseFormReturn<LoginPayload>
  ) => {
    formRef.current = form;
    mutate(values);
    console.log(values)
  };

  return <LoginForm onSubmit={handleSubmit} isLoading={isPending} />;
}
