"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../axiosInstance";
import { endpoints } from "@/config/endpoints";
import {
  TeamAnalyticsSchema,
  type TeamAnalytics,
  ReferralCommissionListSchema,
  type ReferralCommission,
  RecentCommissionListSchema,
  CommissionSummarySchema,
  type CommissionSummary,
  DownlineListSchema,
  type Downline,
  ReferralRelationshipListSchema,
  type ReferralRelationship,
  ReferralLinkSchema,
  ReferralLinkArraySchema,
  type ReferralLink,
  ReferralStatsSchema,
  ReferralStatsArraySchema,
  type ReferralStats,
  ReferralLevelListSchema,
  type ReferralLevel,
} from "../api/referrals";

// Analytics
export function useReferralAnalytics() {
  return useQuery<TeamAnalytics>({
    queryKey: ["referralAnalytics"],
    queryFn: async () => {
      const res = await api.get(endpoints.Referrals.analytics);
      console.log("Analytics response:", res.data);
      return TeamAnalyticsSchema.parse(res.data);
    },
    staleTime: 60_000,
  });
}

// Commissions (all)
export function useReferralCommissions() {
  return useQuery<ReferralCommission[]>({
    queryKey: ["referralCommissions"],
    queryFn: async () => {
      const res = await api.get(endpoints.Referrals.commissions);
      console.log("Commissions response:", res.data);
      return ReferralCommissionListSchema.parse(res.data);
    },
  });
}

// Commissions (recent)
export function useReferralCommissionsRecent() {
  return useQuery<ReferralCommission[]>({
    queryKey: ["referralCommissionsRecent"],
    queryFn: async () => {
      const res = await api.get(endpoints.Referrals.commissionsRecent);
      console.log("Recent commissions response:", res.data);
      return RecentCommissionListSchema.parse(res.data);
    },
  });
}

// Commission summary
export function useReferralCommissionsSummary() {
  return useQuery<CommissionSummary>({
    queryKey: ["referralCommissionsSummary"],
    queryFn: async () => {
      const res = await api.get(endpoints.Referrals.commissionsSummary);
      console.log("Commission summary response:", res.data);
      return CommissionSummarySchema.parse(res.data);
    },
    staleTime: 30_000,
  });
}

// Downline
export function useReferralDownline() {
  return useQuery<Downline[]>({
    queryKey: ["referralDownline"],
    queryFn: async () => {
      const res = await api.get(endpoints.Referrals.downline);
      console.log("Downline response:", res.data);
      return DownlineListSchema.parse(res.data);
    },
  });
}

// History
export function useReferralHistory() {
  return useQuery<ReferralRelationship[]>({
    queryKey: ["referralHistory"],
    queryFn: async () => {
      const res = await api.get(endpoints.Referrals.history);
      console.log("History response:", res.data);
      return ReferralRelationshipListSchema.parse(res.data);
    },
  });
}

// Levels
export function useReferralLevels() {
  return useQuery<ReferralLevel[]>({
    queryKey: ["referralLevels"],
    queryFn: async () => {
      const res = await api.get(endpoints.Referrals.levels);
      console.log("Levels response:", res.data);
      console.log("Levels response:", JSON.stringify(res.data, null, 2));
      return ReferralLevelListSchema.parse(res.data);
    },
  });
}


export function useReferralLink() {
  return useQuery<ReferralLink | null>({
    queryKey: ["referralLink"],
    queryFn: async () => {
      const res = await api.get(endpoints.Referrals.link);
      const data = res.data;
      if (Array.isArray(data)) {
        const parsed = ReferralLinkArraySchema.safeParse(data);
        if (parsed.success && parsed.data.length > 0) {
          return parsed.data[0];
        }
        return null;
      }
      const parsed = ReferralLinkSchema.safeParse(data);
      return parsed.success ? parsed.data : null;
    },
    staleTime: 60_000,
  });
}


export function useReferralStats() {
  return useQuery<ReferralStats | null>({
    queryKey: ["referralStats"],
    queryFn: async () => {
      const res = await api.get(endpoints.Referrals.stats);
      console.log("Stats response:", res.data);
      const data = res.data;
      if (Array.isArray(data)) {
        const parsed = ReferralStatsArraySchema.safeParse(data);
        if (parsed.success && parsed.data.length > 0) {
          return parsed.data[0];
        }
        return null;
      }
      const parsed = ReferralStatsSchema.safeParse(data);
      return parsed.success ? parsed.data : null;
    },
    staleTime: 60_000,
  });
}
