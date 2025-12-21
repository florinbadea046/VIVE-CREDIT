// import type { ScadentarRaw } from "./types";
// import { calculatePenalty } from "./penalties";

// export const calculateScadentar = (
//   principal: number,
//   time: number,
//   anualInterest: number,
//   penaltyRate: number,
//   daysLate: number
// ): ScadentarRaw[] => {
//   const monthlyInterestRate = anualInterest / 100 / 12;
//   const principalPerMonth = principal / time;

//   let sold = principal;
//   const rows: ScadentarRaw[] = [];

//   for (let i = 1; i <= time; i++) {
//     const interest = sold * monthlyInterestRate;
//     const penalty = calculatePenalty(sold, penaltyRate, daysLate);

//     const rata = principalPerMonth + interest + penalty;

//     sold -= principalPerMonth;

//     rows.push({
//       index: i,
//       principal: principalPerMonth,
//       interest,
//       penalty,
//       rata,
//       sold: Math.max(sold, 0),
//     });
//   }

//   return rows;
// };
import type { ScadentarRaw } from "./types";
import { calculatePenalty } from "./penalties";

export const calculateScadentar = (
  principal: number,
  time: number,
  anualInterest: number,
  penaltyRate: number,
  daysLate: number
): ScadentarRaw[] => {
  const monthlyInterestRate = anualInterest / 100 / 12;
  const principalPerMonth = principal / time;

  let sold = principal;
  const rows: ScadentarRaw[] = [];

  for (let i = 1; i <= time; i++) {
    const interest = sold * monthlyInterestRate;
    const penalty = calculatePenalty(sold, penaltyRate, daysLate);

    const rata = principalPerMonth + interest + penalty;

    sold -= principalPerMonth;

    rows.push({
      index: i,
      principal: principalPerMonth,
      interest,
      penalty,
      rata,
      sold: Math.max(sold, 0),
    });
  }

  return rows;
};
