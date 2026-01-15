export interface CollectionCase {
  id: string;
  client: string;
  amount: number;
  daysLate: number;
  status: "In intarziere" | "PTP activ" | "PTP rupt" | "Inchis";
  agent: string;
}
