const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const endpoints = {
  User: {
    register: `${baseUrl}/auth/register/`,
    login: `${baseUrl}/auth/token/`,
    refreshToken: `${baseUrl}/auth/token/refresh/`,
    dashboard: `${baseUrl}/auth/dashboard/`,
    updateProfile: `${baseUrl}/auth/profile/`,
  },

  Wallet: {
    balance: `${baseUrl}/wallet/wallet/balance/`,
    createDepositRequest: `${baseUrl}/wallet/deposit/`,
    submitPayment: `${baseUrl}/wallet/submit-payment/`,
    withdraw: `${baseUrl}/wallet/withdraw/`,
    transactions: `${baseUrl}/wallet/transactions/`,
    withdrawalRequests: `${baseUrl}/wallet/withdrawals/`,
  },

  Investments: {
    plans: `${baseUrl}/investment/plans/`,
    create: `${baseUrl}/investment/create/`,
    active: `${baseUrl}/investment/active/`,
    stats: `${baseUrl}/investment/stats/`,
    history: `${baseUrl}/investment/history/`,
  },

  Referrals: {
    analytics: `${baseUrl}/referrals/analytics/`,
    commissions: `${baseUrl}/referrals/commissions/`,
    commissionsRecent: `${baseUrl}/referrals/commissions/recent/`,
    commissionsSummary: `${baseUrl}/referrals/commissions/summary/`,
    downline: `${baseUrl}/referrals/downline/`,
    history: `${baseUrl}/referrals/history/`,
    levels: `${baseUrl}/referrals/levels/`,
    link: `${baseUrl}/referrals/link/`,
    stats: `${baseUrl}/referrals/stats/`,
  },

  Videos: {
    available: `${baseUrl}/videos/available/`,
    todayBatch: `${baseUrl}/videos/batch/today/`,
    categories: `${baseUrl}/videos/categories/`,
    history: `${baseUrl}/videos/history/`,
    statsDaily: `${baseUrl}/videos/stats/daily/`,
    watch: `${baseUrl}/videos/watch/`,
  },
};
