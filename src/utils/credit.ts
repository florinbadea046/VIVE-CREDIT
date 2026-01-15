import type { ScadentarRow, ClientReport } from "@/types/credit";

export const calculatePenaltyOnSold = (
  sold: number,
  annualPenalty: number,
  daysLate: number
): number => {
  if (daysLate <= 0) return 0;
  return (sold * annualPenalty * daysLate) / 100 / 365;
};

export const generateScadentar = (
  principal: number,
  annualInterest: number,
  months: number,
  annualPenalty: number,
  daysLatePerMonth: number[]
): { rows: ScadentarRow[]; report: ClientReport } => {
  const monthlyRate = annualInterest / 100 / 12;

  const rata =
    (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

  let sold = principal;
  let totalRate = 0;
  let totalDobanda = 0;
  let totalPenalitati = 0;

  const rows: ScadentarRow[] = [];

  for (let luna = 1; luna <= months; luna++) {
    const dobanda = sold * monthlyRate;
    const principalPlatit = rata - dobanda;
    sold -= principalPlatit;

    const zileIntarziere = daysLatePerMonth[luna - 1] ?? 0;
    const penalitate = calculatePenaltyOnSold(
      Math.max(sold, 0),
      annualPenalty,
      zileIntarziere
    );

    totalRate += rata;
    totalDobanda += dobanda;
    totalPenalitati += penalitate;

    rows.push({
      luna,
      rata,
      principal: principalPlatit,
      dobanda,
      sold: Math.max(sold, 0),
      zileIntarziere,
      penalitate,
      totalDePlata: rata + penalitate,
    });
  }

  return {
    rows,
    report: {
      totalRate,
      totalDobanda,
      totalPenalitati,
      sumaTotala: totalRate + totalPenalitati,
    },
  };
};
