import { type ScoringResult } from "../types/decision.types";

export const decisionScenarios: ScoringResult[] = [
  {
    applicationId: "VIVE-8821",
    decision: "APPROVED",
    score: 85, 
    summary: "Istoric de plată pozitiv și venituri stabile.",
    reasonCodes: [],
    createdAt: new Date().toISOString(),
    currency: "RON",
    maxAmount: 25000
  },
  {
    applicationId: "VIVE-4432",
    decision: "MANUAL_REVIEW", 
    score: 55,
    summary: "Documente de venit ce necesită o scurtă clarificare.",
    reasonCodes: ["Verificare ANAF în curs"],
    createdAt: new Date().toISOString(),
    currency: "RON"
  },
  {
    applicationId: "VIVE-1109",
    decision: "REJECTED",
    score: 25,
    summary: "Gradul de îndatorare depășește limita admisă.",
    reasonCodes: ["R01 - Îndatorare ridicată"],
    createdAt: new Date().toISOString(),
    currency: "RON"
  }
];