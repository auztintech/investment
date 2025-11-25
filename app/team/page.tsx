"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import BottomNav from "@/components/ButtonNav";
import { Users, UserPlus, Copy, Send, Gift, Info } from "lucide-react";

export default function TeamPage() {
  const [activeTab, setActiveTab] = useState<"team" | "invite">("team");

  return (
    <ProtectedRoute>
      <div className="container py-6 space-y-6">
        {/* Dynamic Title */}
        <div className="bg-indigo-600 text-white text-center py-3 rounded-md text-lg font-semibold">
          {activeTab === "team" ? "Team" : "Invite"}
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setActiveTab("team")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              activeTab === "team"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}>
            <Users className="w-4 h-4" />
            Team
          </button>
          <button
            onClick={() => setActiveTab("invite")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${
              activeTab === "invite"
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}>
            <UserPlus className="w-4 h-4" />
            Invite
          </button>
        </div>

        {/* Content */}
        {activeTab === "team" ? (
          <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-500">Total Team Size</p>
                <p className="font-semibold">0</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-500">Team Income</p>
                <p className="font-semibold">GHC 0.00</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-500">New Team Size</p>
                <p className="font-semibold">0</p>
              </div>
            </div>

            {/* Team Breakdown */}
            {["A", "B", "C"].map((level) => (
              <div
                key={level}
                className="bg-white shadow rounded-lg p-4 space-y-2 text-sm">
                <div className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                  Team {level}
                </div>
                <p>
                  Registration / Members:{" "}
                  <span className="font-semibold">0 / 0</span>
                </p>
                <p>
                  Task Income (0%):{" "}
                  <span className="font-semibold">GHC 0.00</span>
                </p>
                <p>
                  Referral Income (0%):{" "}
                  <span className="font-semibold">GHC 0.00</span>
                </p>
              </div>
            ))}

            {/* Explanation */}
            <div className="bg-gray-50 p-4 text-sm space-y-2">
              <p>
                People who join through your invitation link are your{" "}
                <strong>A-level</strong> subordinates.
              </p>
              <p>
                People who join through the invitation link of your A-level
                subordinates are your <strong>B-level</strong> subordinates.
              </p>
              <p>
                People who join through the invitation link of your B-level
                subordinates are your <strong>C-level</strong> subordinates.
              </p>
              <p>
                Any regular employee has the right to recruit people who need
                jobs to join Mekanism. The more people you recruit, the more
                recruitment rewards you get.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 text-sm">
            {/* Invite Steps */}
            <div className="bg-white shadow rounded-lg p-4 space-y-4">
              {[
                {
                  icon: Copy,
                  title: "Share your link or invitation code:",
                  text: "Copy your exclusive recruitment link or invitation code screenshot.",
                },
                {
                  icon: Send,
                  title: "Send to friends:",
                  text: "Share the link to family or friends who need a job.",
                },
                {
                  icon: Gift,
                  title: "Get rewards:",
                  text: "When someone signs up using your link, they will become your A-level subordinate. When they upgrade to full-time employees, you will receive referral bonuses and valuable task management fees.",
                },
                {
                  icon: Info,
                  title: "Warm Tips:",
                  text: "Your level must be higher than or equal to your subordinates' level to receive rewards from their daily tasks.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-indigo-600 shrink-0" />
                  <p>
                    <strong>{title}</strong>
                    <br />
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <BottomNav />
    </ProtectedRoute>
  );
}
