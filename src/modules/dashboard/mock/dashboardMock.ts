import type { DashboardData } from "@/modules/dashboard/types/dashboard";

export const dashboardMock: DashboardData = {
  applicationStatus: {
    status: "approved",
    applicationId: "VC-2025-10322",
    submittedAt: "2025-11-14T10:23:00Z",
  },

  loanDetails: {
    amount: 70000,
    interest: 12.5,
    monthlyRate: 1750,
    remainingMonths: 18,
    nextDueDate: "2025-12-15",
  },

  payments: [
    {
      id: "P-001",
      amount: 1750,
      date: "2025-10-15",
      method: "Card",
      status: "completed",
    },
    {
      id: "P-002",
      amount: 1750,
      date: "2025-11-15",
      method: "Card",
      status: "completed",
    },
  ],

  documents: [
    {
      id: "D-001",
      name: "Contract de credit",
      url: "/documents/contract.pdf",
    },
    {
      id: "D-002",
      name: "Grafic de rambursare",
      url: "/documents/schedule.pdf",
    },
  ],
};
