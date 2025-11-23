import type { PaymentItem } from "../types/payments";

export const paymentsMock: PaymentItem[] = [
  {
    id: "PAY-2025-001",
    amount: 1250,
    date: "2025-01-15",
    method: "Card",
    status: "completed",
  },
  {
    id: "PAY-2024-012",
    amount: 1250,
    date: "2024-12-15",
    method: "Transfer",
    status: "completed",
  },
  {
    id: "PAY-2024-011",
    amount: 1250,
    date: "2024-11-15",
    method: "Card",
    status: "completed",
  },
  {
    id: "PAY-2024-010",
    amount: 1250,
    date: "2024-10-15",
    method: "Cash",
    status: "failed",
  },
  {
    id: "PAY-2024-009",
    amount: 1250,
    date: "2024-09-15",
    method: "Card",
    status: "pending",
  },
];
