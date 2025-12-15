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

export const dashboardApplicationsMock = [
  { id: 1, amount: 5000, status: "pending", date: "2025-01-10" },
  { id: 2, amount: 10000, status: "approved", date: "2025-01-05" },
];

export const dashboardCreditsMock = [
  { id: 1, totalAmount: 70000, remainingAmount: 35000, monthlyPayment: 1750 },
  { id: 2, totalAmount: 15000, remainingAmount: 9000, monthlyPayment: 650 },
  { id: 3, totalAmount: 5000, remainingAmount: 1200, monthlyPayment: 250 },
];
