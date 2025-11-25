"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";
import Link from "next/link";

type HeaderBarProps = {
  title: string;
  icon?: ReactNode; // optional icon prop
};

export function HeaderBar({ title, icon }: HeaderBarProps) {
  const router = useRouter();

  return (
    <div className="flex items-center bg-emerald-600 text-white py-3 px-4">
      {/* Back button on the left */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1 text-white hover:text-gray-200">
        <ChevronLeft size={30} />
        <span className="sr-only">Go back</span>
      </button>

      {/* Title centered */}
      <div className="flex-1 text-center text-lg font-semibold">{title}</div>

      {/* Optional icon on the right */}
      <div className="flex items-center">
        <Link className="text-white" href="/deposit/history">
          {icon ? icon : null}
        </Link>
      </div>
    </div>
  );
}
