"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users2, PiggyBank, CreditCard } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

const content = [
  {
    id: 1,
    icon: Users2,
    title: "Refer & Earn",
    class: "bg-gradient-to-r from-emerald-600 to-emerald-400",
    action: "Invite Now",
    href: "/referral",
  },
  {
    id: 2,
    icon: PiggyBank,
    title: "Boost Your Portfolio",
    class: "bg-gradient-to-r from-indigo-600 to-purple-500",
    action: "Explore Plans",
    href: "/investment",
  },
  {
    id: 3,
    icon: CreditCard,
    title: "Quick Deposit",
    class: "bg-gradient-to-r from-pink-500 to-rose-400",
    action: "Deposit Now",
    href: "/deposit",
  },
];

export default function Slider() {
  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop
        className="w-full h-full">
        {content.map((item) => {
          const Icon = item.icon;

          return (
            <SwiperSlide key={item.id}>
              <Card
                className={`w-full py-4 rounded-2xl ${item.class} text-white shadow-md`}>
                <CardContent className="flex items-center justify-between gap-4 p-5">
                  {/* Left Icon */}
                  <div className="flex items-center justify-center h-12 w-12 bg-white/20 rounded-full">
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <h3 className="text-base font-semibold">{item.title}</h3>
                  </div>

                  {/* Button */}
                  <Button
                    size="sm"
                    className="w-fit rounded-full bg-white text-black hover:bg-gray-100 text-xs"
                    onClick={() => (window.location.href = item.href)}>
                    {item.action}
                  </Button>
                </CardContent>
              </Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
