"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CheckSquare, PiggyBank, Users, User } from "lucide-react";
import clsx from "clsx";

const navItems = [
  { name: "Home", icon: Home, href: "/dashboard" },
  { name: "Investments", icon: PiggyBank, href: "/investments" },
  { name: "Tasks", icon: CheckSquare, href: "/tasks" },
  { name: "Referrals", icon: Users, href: "/referrals" },
  { name: "Mine", icon: User, href: "/user-profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white  z-50">
      <div className="flex justify-around items-center h-16 border-t border-gray-200 shadow-sm max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center text-xs relative">
              <div
                className={clsx(
                  "flex items-center justify-center h-10 w-10 rounded-full transition-all duration-200",
                  isActive
                    ? "bg-emerald-100 text-emerald-600"
                    : "text-gray-500 hover:text-emerald-500 hover:bg-emerald-50"
                )}>
                <Icon
                  className={clsx(
                    "w-5 h-5 transition-transform duration-200",
                    isActive && "scale-110"
                  )}
                />
              </div>
              <span
                className={clsx(
                  "mt-1 text-[11px]",
                  isActive ? "text-emerald-600 font-medium" : "text-gray-500"
                )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
