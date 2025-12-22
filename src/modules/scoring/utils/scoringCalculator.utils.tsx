import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  ScoreRange,
  ScoreColor,
  type ScoringResult,
} from "../types/scoringCalculator.types";

export const calculateScore = (
  salariu: number,
  cheltuieli: number,
  datorii: number
): number => {
  const rataIndatorare = (cheltuieli + datorii) / salariu;

  // Scor bazat pe rata de îndatorare
  // < 30% = scor mare, > 60% = scor mic
  if (rataIndatorare < 0.3) return 85;
  if (rataIndatorare < 0.4) return 70;
  if (rataIndatorare < 0.5) return 55;
  if (rataIndatorare < 0.6) return 40;
  return 25;
};

export const getScoreRange = (score: number): ScoreRange => {
  if (score >= 85) return ScoreRange.VERY_HIGH;
  if (score >= 71) return ScoreRange.HIGH;
  if (score >= 55) return ScoreRange.MEDIUM;
  if (score >= 41) return ScoreRange.LOW;
  return ScoreRange.VERY_LOW;
};

/**
 * Determină culoarea pentru bara colorată
 * Conform Task 2.2: roșu (0-40), galben (41-70), verde (71-100)
 */
export const getScoreColor = (score: number): ScoreColor => {
  if (score >= 71) return ScoreColor.GREEN; // Verde (71-100)
  if (score >= 41) return ScoreColor.YELLOW; // Galben (41-70)
  return ScoreColor.RED; // Roșu (0-40)
};

/**
 * Generează explicație text pentru scor
 * Conform Task 2.2: "Explicație text ce înseamnă scorul"
 */
export const getScoreExplanation = (
  score: number,
  rataIndatorare: number
): string => {
  const percent = (rataIndatorare * 100).toFixed(1);

  if (score >= 85) {
    return `Scor excelent! Rata de îndatorare este ${percent}% (sub 30%). Risc foarte scăzut - client ideal pentru creditare.`;
  }
  if (score >= 71) {
    return `Scor bun. Rata de îndatorare este ${percent}% (30-40%). Risc scăzut - client eligibil pentru credit.`;
  }
  if (score >= 55) {
    return `Scor mediu. Rata de îndatorare este ${percent}% (40-50%). Risc moderat - necesită analiză suplimentară.`;
  }
  if (score >= 41) {
    return `Scor scăzut. Rata de îndatorare este ${percent}% (50-60%). Risc ridicat - client marginal neeligibil.`;
  }
  return `Scor foarte scăzut. Rata de îndatorare este ${percent}% (peste 60%). Risc foarte ridicat - client neeligibil.`;
};

/**
 * Generează recomandare pentru client
 */
export const getRecommendation = (score: number, salariu: number): string => {
  if (score >= 85) {
    const sumaMax = Math.round(salariu * 3.5);
    return `Client excelent! Eligibil pentru credit. Sumă maximă recomandată: ${sumaMax.toLocaleString(
      "ro-RO"
    )} RON (3.5x salariu).`;
  }
  if (score >= 71) {
    const sumaMax = Math.round(salariu * 3);
    return `Client eligibil pentru credit. Sumă maximă recomandată: ${sumaMax.toLocaleString(
      "ro-RO"
    )} RON (3x salariu).`;
  }
  if (score >= 55) {
    const sumaMax = Math.round(salariu * 2);
    return `Client marginal eligibil. Sumă maximă prudentă: ${sumaMax.toLocaleString(
      "ro-RO"
    )} RON (2x salariu). Necesită garanții suplimentare.`;
  }
  return "Client neeligibil pentru credit. Recomandăm reducerea datoriilor existente înainte de a aplica pentru un nou credit.";
};

export const getScoreColorClass = (color: ScoreColor): string => {
  const classes: Record<ScoreColor, string> = {
    [ScoreColor.GREEN]: "bg-green-500",
    [ScoreColor.YELLOW]: "bg-yellow-500",
    [ScoreColor.RED]: "bg-red-500",
  };
  return classes[color];
};

export const getScoreBgClass = (color: ScoreColor): string => {
  const classes: Record<ScoreColor, string> = {
    [ScoreColor.GREEN]: "bg-green-50 border-green-200",
    [ScoreColor.YELLOW]: "bg-yellow-50 border-yellow-200",
    [ScoreColor.RED]: "bg-red-50 border-red-200",
  };
  return classes[color];
};

export const getScoreIcon = (scoreRange: ScoreRange): React.ReactNode => {
  switch (scoreRange) {
    case ScoreRange.VERY_HIGH:
    case ScoreRange.HIGH:
      return <TrendingUp className="w-6 h-6 text-green-500" />;
    case ScoreRange.MEDIUM:
      return <Minus className="w-6 h-6 text-yellow-500" />;
    case ScoreRange.LOW:
    case ScoreRange.VERY_LOW:
      return <TrendingDown className="w-6 h-6 text-red-500" />;
    default:
      return <AlertCircle className="w-6 h-6 text-gray-400" />;
  }
};

export const getEligibilityIcon = (eligibil: boolean): React.ReactNode => {
  return eligibil ? (
    <CheckCircle className="w-5 h-5 text-green-500" />
  ) : (
    <XCircle className="w-5 h-5 text-red-500" />
  );
};

export const getScoreRangeLabel = (range: ScoreRange): string => {
  const labels: Record<ScoreRange, string> = {
    [ScoreRange.VERY_HIGH]: "Foarte Bun",
    [ScoreRange.HIGH]: "Bun",
    [ScoreRange.MEDIUM]: "Mediu",
    [ScoreRange.LOW]: "Scăzut",
    [ScoreRange.VERY_LOW]: "Foarte Scăzut",
  };
  return labels[range];
};

export const getScoreRangeDescription = (range: ScoreRange): string => {
  const descriptions: Record<ScoreRange, string> = {
    [ScoreRange.VERY_HIGH]:
      "Client cu risc foarte scăzut - ideal pentru creditare",
    [ScoreRange.HIGH]: "Client cu risc scăzut - eligibil pentru credit",
    [ScoreRange.MEDIUM]:
      "Client cu risc moderat - necesită evaluare suplimentară",
    [ScoreRange.LOW]: "Client cu risc ridicat - eligibilitate scăzută",
    [ScoreRange.VERY_LOW]: "Client cu risc foarte ridicat - neeligibil",
  };
  return descriptions[range];
};

export const formatRON = (amount: number): string => {
  return `${amount.toLocaleString("ro-RO")} RON`;
};

export const formatPercent = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};

export const validateScoringInput = (
  salariu: number,
  cheltuieli: number,
  datorii: number
): { valid: boolean; error?: string } => {
  // Verificări de bază
  if (salariu <= 0) {
    return { valid: false, error: "Salariul trebuie să fie mai mare ca 0 RON" };
  }

  if (salariu < 1000) {
    return { valid: false, error: "Salariul minim acceptat este 1,000 RON" };
  }

  if (cheltuieli < 0) {
    return { valid: false, error: "Cheltuielile nu pot fi negative" };
  }

  if (datorii < 0) {
    return { valid: false, error: "Datoriile nu pot fi negative" };
  }

  // Verificări logice
  if (cheltuieli > salariu * 2) {
    return {
      valid: false,
      error: "Cheltuielile sunt prea mari față de salariu (max 2x)",
    };
  }

  if (datorii > salariu * 3) {
    return {
      valid: false,
      error: "Datoriile sunt prea mari față de salariu (max 3x)",
    };
  }

  const total = cheltuieli + datorii;
  if (total > salariu * 3) {
    return {
      valid: false,
      error: `Total cheltuieli + datorii (${formatRON(
        total
      )}) depășește limita de ${formatRON(salariu * 3)}`,
    };
  }

  return { valid: true };
};

export const calculateMaxCreditAmount = (
  salariu: number,
  score: number
): number | undefined => {
  // Changed from 'number | null' to 'number | undefined'
  if (score >= 85) return salariu * 3.5;
  if (score >= 71) return salariu * 3;
  if (score >= 55) return salariu * 2;
  return undefined; // Changed from 'null' to 'undefined'
};

export const isEligible = (score: number): boolean => {
  return score >= 55; // Pragul minim de eligibilitate
};

export const getRiskMessage = (score: number): string => {
  if (score >= 85) {
    return "✅ Risc foarte scăzut - aprobare recomandată fără condiții suplimentare.";
  }
  if (score >= 71) {
    return "✅ Risc scăzut - aprobare recomandată cu condiții standard.";
  }
  if (score >= 55) {
    return "⚠️ Risc moderat - aprobare cu condiții stricte sau garanții suplimentare.";
  }
  if (score >= 41) {
    return "❌ Risc ridicat - respingere recomandată sau doar cu garanții substanțiale.";
  }
  return "❌ Risc foarte ridicat - respingere obligatorie.";
};

export const getFullScoringDetails = (
  salariu: number,
  cheltuieli: number,
  datorii: number
): ScoringResult => {
  // Calculează rata și scorul
  const rataIndatorare = salariu > 0 ? (cheltuieli + datorii) / salariu : 0;
  const score = calculateScore(salariu, cheltuieli, datorii);

  // Determină categoria și culoarea
  const scoreRange = getScoreRange(score);
  const scoreColor = getScoreColor(score);

  // Generează texte
  const explicatie = getScoreExplanation(score, rataIndatorare);
  const recomandare = getRecommendation(score, salariu);

  // Determină eligibilitatea
  const eligibil = isEligible(score);

  // Calculează suma maximă
  const sumaMaximaCredit = eligibil
    ? calculateMaxCreditAmount(salariu, score)
    : undefined;

  return {
    score,
    rataIndatorare,
    scoreRange,
    scoreColor,
    explicatie,
    recomandare,
    eligibil,
    sumaMaximaCredit,
  };
};
