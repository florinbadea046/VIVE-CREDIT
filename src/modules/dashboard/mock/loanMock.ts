import type { LoanData } from "../types/loan";

export const loanMock: LoanData = {
  loanId: "LN-2024-001",
  amount: 25000,
  interest: 12.5,
  termMonths: 24,
  monthlyRate: 1250,

  paidMonths: 10,
  remainingMonths: 14,

  nextPaymentDate: "2025-02-15",
  nextPaymentAmount: 1250,

  status: "active",
  contractUrl: "/documents/contract.pdf",

  lastPayment: {
    date: "2025-01-15",
    amount: 1250,
    method: "Card",
  },
};
