export type PaymentStatus = "completed" | "processing" | "failed" | "pending";
export type PaymentMethod = "Card" | "Transfer" | "Cash";

export interface PaymentItem {
  id: string;
  amount: number;
  date: string;
  method: "Card" | "Cash" | "Transfer";
  status: "completed" | "processing" | "failed" | "pending";
}
