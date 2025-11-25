import {
  ArrowUpCircle,
  ArrowDownCircle,
  PiggyBank,
  Users2,
  BadgeDollarSign,
  Newspaper,
  Building2,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";

const actions = [
  { name: "Deposit", icon: ArrowDownCircle, href: "/deposit" }, 
  { name: "Withdrawal", icon: ArrowUpCircle, href: "/investments#activePlan" }, 
  { name: "Investment", icon: PiggyBank, href: "/investments" }, 
  { name: "Referrals", icon: Users2, href: "/referrals" }, 
  { name: "Rewards", icon: BadgeDollarSign, href: "/rewards" }, 
  { name: "Company News", icon: Newspaper, href: "/news" }, 
  { name: "About Us", icon: Building2, href: "/about" }, 
  { name: "FAQs", icon: HelpCircle, href: "/faqs" }, 
];

export default function DashboardActions() {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.name}
            href={action.href}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition hover:bg-emerald-50 active:scale-95">
            <div className="h-10 w-10 flex items-center justify-center bg-emerald-50 rounded-full text-emerald-600 mb-1">
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-xs text-center font-medium text-gray-700">
              {action.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
