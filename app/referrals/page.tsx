"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import {
  useReferralLink,
  useReferralStats,
  useReferralCommissionsSummary,
  useReferralCommissions,
  useReferralCommissionsRecent,
  useReferralDownline,
  useReferralHistory,
  useReferralAnalytics,
  useReferralLevels,
} from "@/lib/hooks/useReferrals";
import { ReferralLinkCard } from "@/components/referrals/ReferralLinkCard";
import { ReferralStatsCard } from "@/components/referrals/ReferralStatsCard";
import { CommissionSummaryCards } from "@/components/referrals/CommissionSummaryCards";
import { CommissionTable } from "@/components/referrals/CommissionTable";
import { RecentCommissionsWidget } from "@/components/referrals/RecentCommissionsWidget";
import { DownlineList } from "@/components/referrals/DownlineList";
import { HistoryTimeline } from "@/components/referrals/HistoryTimeline";
import { AnalyticsOverview } from "@/components/referrals/AnalyticsOverview";
import { LevelsInfo } from "@/components/referrals/LevelsInfo";

import { LoadingSkeleton, ErrorState } from "@/lib/utils/States";
import BottomNav from "@/components/ButtonNav";
import { HeaderBar } from "@/components/HeaderBar";

export default function ReferralsDashboardPage() {
  // Fetch all referral data
  const linkQ = useReferralLink();
  const statsQ = useReferralStats();
  const summaryQ = useReferralCommissionsSummary();
  const commissionsQ = useReferralCommissions();
  const recentQ = useReferralCommissionsRecent();
  const downlineQ = useReferralDownline();
  const historyQ = useReferralHistory();
  const analyticsQ = useReferralAnalytics();
  const levelsQ = useReferralLevels();

  const isLoading =
    linkQ.isLoading ||
    statsQ.isLoading ||
    summaryQ.isLoading ||
    commissionsQ.isLoading ||
    recentQ.isLoading ||
    downlineQ.isLoading ||
    historyQ.isLoading ||
    analyticsQ.isLoading ||
    levelsQ.isLoading;

  const isError =
    linkQ.isError ||
    statsQ.isError ||
    summaryQ.isError ||
    commissionsQ.isError ||
    recentQ.isError ||
    downlineQ.isError ||
    historyQ.isError ||
    analyticsQ.isError ||
    levelsQ.isError;

  if (isLoading) return <LoadingSkeleton lines={12} />;
  if (isError)
    return <ErrorState message="Error loading referrals dashboard" />;

  return (
    <ProtectedRoute>
      <HeaderBar title="Referrals" />
      <div className="container mt-5 space-y-6">
        {/* Referral link */}
        {linkQ.data ? (
          <ReferralLinkCard
            referralCode={linkQ.data.referral_code}
            referralLink={linkQ.data.referral_link}
            shareMessage={linkQ.data.share_message}
          />
        ) : (
          <ErrorState message="Referral link not available" />
        )}

        {/* Stats */}
        {statsQ.data ? (
          <ReferralStatsCard
            totalReferrals={statsQ.data.total_referrals}
            totalCommissions={statsQ.data.total_commissions}
            level1Count={statsQ.data.level_1_count}
            level2Count={statsQ.data.level_2_count}
            level3Count={statsQ.data.level_3_count}
            level4Count={statsQ.data.level_4_count}
          />
        ) : (
          <ErrorState message="Referral stats not available" />
        )}

        {/* Commission summary */}
        {summaryQ.data ? (
          <CommissionSummaryCards
            today={summaryQ.data.today}
            thisWeek={summaryQ.data.this_week}
            thisMonth={summaryQ.data.this_month}
            total={summaryQ.data.total}
          />
        ) : (
          <ErrorState message="Commission summary not available" />
        )}

        {/* Commissions table + recent widget */}
        <div className="">
          {commissionsQ.data ? (
            <CommissionTable data={commissionsQ.data} />
          ) : (
            <ErrorState message="No commissions found" />
          )}
          <div className="mt-4">
            {recentQ.data ? (
              <RecentCommissionsWidget data={recentQ.data} />
            ) : (
              <ErrorState message="No recent commissions" />
            )}
          </div>
        </div>

        {/* Downline */}
        {downlineQ.data ? (
          <DownlineList data={downlineQ.data} />
        ) : (
          <ErrorState message="No downline data" />
        )}

        {/* History */}
        {historyQ.data ? (
          <HistoryTimeline data={historyQ.data} />
        ) : (
          <ErrorState message="No referral history" />
        )}

        {/* Analytics */}
        {analyticsQ.data ? (
          <AnalyticsOverview data={analyticsQ.data} />
        ) : (
          <ErrorState message="Analytics not available" />
        )}

        {/* Levels */}
        {levelsQ.data ? (
          <LevelsInfo data={levelsQ.data} />
        ) : (
          <ErrorState message="Levels info not available" />
        )}
      </div>
      <BottomNav />
    </ProtectedRoute>
  );
}
