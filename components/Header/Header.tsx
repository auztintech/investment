"use client";

import { User } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";

export default function Header() {
  const { user } = useAuthStore();

  return (
    <div className="container relative z-20 flex justify-between items-center">
      <div className="flex items-center gap-2">
        {/* User Icon */}
        <User className="w-6 h-6 text-white" />

        <p className="text-xs text-white">
          Hi,{" "}
          <Link
            href="/user-profile"
            className="uppercase text-white underline hover:text-gray-300">
            {user?.username ?? user?.phone_number}
          </Link>
        </p>
      </div>
    </div>
  );
}
