export const ScoreRange = {
  VERY_HIGH: "VERY_HIGH",
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW",
  VERY_LOW: "VERY_LOW",
} as const;

export type ScoreRange = (typeof ScoreRange)[keyof typeof ScoreRange];

export const ScoreColor = {
  RED: "RED", // 0-40
  YELLOW: "YELLOW", // 41-70
  GREEN: "GREEN", // 71-100
} as const;

export type ScoreColor = (typeof ScoreColor)[keyof typeof ScoreColor];

export interface ScoringInput {
  salariu: number; // Salariu net lunar (RON)
  cheltuieli: number; // Cheltuieli lunare totale (RON)
  datorii: number; // Datorii existente (RON)
}

export interface ScoringResult {
  score: number; // Scor final 0-100
  rataIndatorare: number; // (cheltuieli + datorii) / salariu
  scoreRange: ScoreRange; // Categoria de scor
  scoreColor: ScoreColor; // Culoarea pentru bara
  explicatie: string; // Text explicativ
  recomandare: string; // Recomandare pentru client
  eligibil: boolean; // Eligibil pentru credit?
  sumaMaximaCredit?: number; // Suma maxima recomandată
}

export interface ScoringHistory {
  id: string;
  clientId?: string;
  clientName?: string;
  input: ScoringInput;
  result: ScoringResult;
  calculatedAt: string;
  calculatedBy: string;
}

export interface ScoringStatistics {
  totalCalculations: number;
  averageScore: number;
  distributionByRange: Record<ScoreRange, number>;
  eligibilityRate: number; // % eligibili
  averageDebtRatio: number; // Rata medie indatorare
}
