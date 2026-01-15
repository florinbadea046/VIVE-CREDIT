export interface ErrorState {
  value?: string;
  time?: string;
  annualInterest?: string;
  commission?: string;
  penalty?: string;
  daysLate?: string;
}

export interface ScadentarRow {
  luna: number;
  rata: number;
  principal: number;
  dobanda: number;
  sold: number;
  zileIntarziere: number;
  penalitate: number;
  totalDePlata: number;
}

export interface ClientReport {
  totalRate: number;
  totalDobanda: number;
  totalPenalitati: number;
  sumaTotala: number;
}
