"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import BottomNav from "@/components/ButtonNav";
import AccountBalanceCard from "@/components/DashboardActions/AccountBalanceCard";
import DashboardActions from "@/components/DashboardActions/DashboardActions";
import Header from "@/components/Header/Header";
import BouncingBubbles  from "@/components/BouncingBubbles";
import LivePaymentTicker from "@/components/LivePaymentTicker/LivePaymentTicker";
import Slider from "@/components/Slider/Slider";
// import { useAuthStore } from "@/lib/store/authStore";
import { useInvestmentPlans } from "@/lib/hooks/useInvestment";
import InvestmentCard from "@/components/investments/InvestmentCard";

export interface Level {
  title: string;
  rebate: string;
  dailyTasks: number;
  deposit: string;
  isCurrent?: boolean;
  locked?: boolean;
}

export default function Dashboard() {
  const { data: plans } = useInvestmentPlans();

  return (
    <ProtectedRoute>
      <div className="relative bg-[url('/bg.gif')] h-30 bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.8)]"></div>
        <BouncingBubbles
          count={7}
          colors={[
            "rgba(79, 70, 229, 0.5)",
            "rgba(59, 130, 246, 0.5)",
            "rgba(96, 165, 250, 0.5)",
          ]}
        />
        <div className="container relative w-full h-full flex flex-col gap-5 pt-5">
          <Header />
          <AccountBalanceCard />
        </div>
      </div>
      <div className="container mt-20">
        <Slider />
        <DashboardActions />
        <div className="mt-5">
          <LivePaymentTicker />
        </div>
      </div>
      <div className="container mt-6">
        <div className="relative w-full h-[200px] md:h-[300px] lg:h-[400px]">
          <video
            src="/vid.mp4"
            autoPlay
            loop
            muted
            controls
            playsInline
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
      <div className="container mt-12">
        <p className="font-bold text-[1.2rem] mb-5">Employee Elevation</p>
        {plans?.map((plan) => (
          <InvestmentCard key={plan.id} plan={plan} />
        ))}
      </div>
      <BottomNav />
    </ProtectedRoute>
  );
}
