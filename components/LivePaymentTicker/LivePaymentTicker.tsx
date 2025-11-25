"use client";

import { Megaphone } from "lucide-react";
import Marquee from "react-fast-marquee";

export default function LivePaymentTicker() {
  const messages = [
    "💸 John just received a payment of GHC 120!",
    "🎉 Mary joined the platform!",
    "🔥 Alex just withdrew GHC 50!",
    "💰 Grace earned a referral bonus!",
    "📈 Daniel upgraded his investment plan!",
    "🏆 Sophia completed her daily tasks and earned rewards!",
    "💳 Michael topped up his wallet with GHC 200!",
    "✨ Anita referred a friend and got a bonus!",
    "⚡ Kwame just hit his daily earning limit!",
  ];


  return (
    <div className="relative bg-linear-to-r from-emerald-700 to-emerald-500 rounded-2xl text-white py-3 px-4 flex items-center overflow-hidden shadow-sm">
      {/* Left Icon */}
      <div className="flex items-center justify-center w-10">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-white/20">
          <Megaphone className="h-5 w-5 text-white" />
        </div>
      </div>

      {/* Marquee Scrolling Text */}
      <Marquee speed={50} gradient={false} pauseOnHover className="flex-1 ml-2">
        {messages.map((msg, i) => (
          <span key={i} className="mx-8 text-sm font-medium whitespace-nowrap">
            {msg}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
