// src/data/referrals-schemas.ts
import { z } from "zod";

// Team analytics (GET /referrals/analytics/)
export const TeamAnalyticsSchema = z.object({
  id: z.number(),
  user_phone: z.string().min(1),
  total_team_members: z.number(),
  level_1_count: z.number(),
  level_2_count: z.number(),
  level_3_count: z.number(),
  level_4_count: z.number(),
  total_commissions: z.string(), // decimal string
  level_1_commissions: z.string(),
  level_2_commissions: z.string(),
  level_3_commissions: z.string(),
  level_4_commissions: z.string(),
  active_team_members: z.number(),
  total_team_investment: z.string(), // decimal string
  updated_at: z.string(), // ISO date-time
});
export type TeamAnalytics = z.infer<typeof TeamAnalyticsSchema>;

// Referral commissions (GET /referrals/commissions/)
export const ReferralCommissionSchema = z.object({
  id: z.number(),
  commission_id: z.string(), // uuid
  referrer_phone: z.string().min(1),
  referred_phone: z.string().min(1),
  level: z.number().int().min(1).max(4),
  level_display: z.string().min(1),
  commission_percentage: z.string(), // decimal string
  investment_amount: z.string(), // decimal string
  commission_amount: z.string(), // decimal string
  is_paid: z.boolean(),
  paid_date: z.string().nullable().optional(),
  created_at: z.string(), // ISO
});
export const ReferralCommissionListSchema = z.array(ReferralCommissionSchema);
export type ReferralCommission = z.infer<typeof ReferralCommissionSchema>;

// Recent commissions (GET /referrals/commissions/recent/)
export const RecentCommissionListSchema = ReferralCommissionListSchema; // same shape
export type RecentCommission = ReferralCommission;

// Commission summary (GET /referrals/commissions/summary/)
export const CommissionSummarySchema = z.object({
  today: z.string(),
  this_week: z.string(),
  this_month: z.string(),
  total: z.string(),
});
export type CommissionSummary = z.infer<typeof CommissionSummarySchema>;

// Downline (GET /referrals/downline/)
export const DownlineSchema = z.object({
  id: z.number(),
  downline_phone: z.string().min(1),
  downline_username: z.string().min(1),
  level: z.number().int().min(1).max(4),
  level_display: z.string().min(1),
  created_at: z.string(),
});
export const DownlineListSchema = z.array(DownlineSchema);
export type Downline = z.infer<typeof DownlineSchema>;

// Referral history (GET /referrals/history/)
export const ReferralRelationshipSchema = z.object({
  id: z.number(),
  referrer_phone: z.string().min(1),
  referred_phone: z.string().min(1),
  referred_username: z.string().min(1),
  referral_code_used: z.string().min(1).max(10),
  created_at: z.string(),
});
export const ReferralRelationshipListSchema = z.array(
  ReferralRelationshipSchema
);
export type ReferralRelationship = z.infer<typeof ReferralRelationshipSchema>;

// Referral link (GET /referrals/link/) — Swagger shows array; handle both
export const ReferralLinkSchema = z.object({
  referral_code: z.string().min(1),
  referral_link: z.string().min(1),
  share_message: z.string().min(1),
});
export const ReferralLinkArraySchema = z.array(ReferralLinkSchema);
export type ReferralLink = z.infer<typeof ReferralLinkSchema>;

// Referral stats (GET /referrals/stats/) — Swagger shows array; handle both
export const ReferralStatsSchema = z.object({
  total_referrals: z.number(),
  total_commissions: z.string(),
  level_1_count: z.number(),
  level_2_count: z.number(),
  level_3_count: z.number(),
  level_4_count: z.number(),
  referral_code: z.string().min(1),
  referral_link: z.string().min(1),
});
export const ReferralStatsArraySchema = z.array(ReferralStatsSchema);
export type ReferralStats = z.infer<typeof ReferralStatsSchema>;

// Referral levels (GET /referrals/levels/) — placeholder; update when you share exact shape
export const ReferralLevelSchema = z.object({
  level: z.number().int().min(1).max(4),
  member_count: z.number(),
  total_commissions: z.string(),
});
export const ReferralLevelListSchema = z.array(ReferralLevelSchema);
export type ReferralLevel = z.infer<typeof ReferralLevelSchema>;
