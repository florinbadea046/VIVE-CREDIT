import { useState, useCallback } from "react";
import type {
  ScoringInput,
  ScoringResult,
  ScoringHistory,
  ScoringStatistics,
} from "../types/scoringCalculator.types";
import { scoringCalculatorMockService } from "../services/scoringCalculatorService";
import { validateScoringInput } from "../utils/scoringCalculator.utils";

interface UseScoringCalculatorReturn {
  // State
  isCalculating: boolean;
  result: ScoringResult | null;
  history: ScoringHistory[];
  statistics: ScoringStatistics | null;
  isLoadingHistory: boolean;
  isLoadingStatistics: boolean;
  error: string | null;

  // Actions
  calculateScore: (input: ScoringInput) => Promise<ScoringResult | null>;
  saveCalculation: (
    input: ScoringInput,
    result: ScoringResult,
    clientId?: string
  ) => Promise<void>;
  fetchHistory: (clientId?: string) => Promise<void>;
  fetchStatistics: () => Promise<void>;
  resetResult: () => void;
  clearError: () => void;
}

export const useScoringCalculator = (): UseScoringCalculatorReturn => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<ScoringResult | null>(null);
  const [history, setHistory] = useState<ScoringHistory[]>([]);
  const [statistics, setStatistics] = useState<ScoringStatistics | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isLoadingStatistics, setIsLoadingStatistics] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateScore = useCallback(
    async (input: ScoringInput): Promise<ScoringResult | null> => {
      setError(null);

      // Validează input
      const validation = validateScoringInput(
        input.salariu,
        input.cheltuieli,
        input.datorii
      );
      if (!validation.valid) {
        setError(validation.error || "Date invalide");
        return null;
      }

      setIsCalculating(true);

      try {
        const scoringResult =
          await scoringCalculatorMockService.calculateScoring(input);
        setResult(scoringResult);
        return scoringResult;
      } catch (err) {
        setError("Eroare la calcularea scorului");
        console.error(err);
        return null;
      } finally {
        setIsCalculating(false);
      }
    },
    []
  );

  const saveCalculation = useCallback(
    async (input: ScoringInput, result: ScoringResult, clientId?: string) => {
      setError(null);

      try {
        const saved = await scoringCalculatorMockService.saveCalculation(
          input,
          result,
          clientId
        );
        // Adaugă în istoric local
        setHistory((prev) => [saved, ...prev]);
      } catch (err) {
        setError("Eroare la salvarea calculului");
        console.error(err);
      }
    },
    []
  );

  const fetchHistory = useCallback(async () => {
    setIsLoadingHistory(true);
    setError(null);

    try {
      const { data } = await scoringCalculatorMockService.getHistory();
      setHistory(data);
    } catch (err) {
      setError("Eroare la încărcarea istoricului");
      console.error(err);
    } finally {
      setIsLoadingHistory(false);
    }
  }, []);

  const fetchStatistics = useCallback(async () => {
    setIsLoadingStatistics(true);
    setError(null);

    try {
      const data = await scoringCalculatorMockService.getStatistics();
      setStatistics(data);
    } catch (err) {
      setError("Eroare la încărcarea statisticilor");
      console.error(err);
    } finally {
      setIsLoadingStatistics(false);
    }
  }, []);

  const resetResult = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isCalculating,
    result,
    history,
    statistics,
    isLoadingHistory,
    isLoadingStatistics,
    error,
    calculateScore,
    saveCalculation,
    fetchHistory,
    fetchStatistics,
    resetResult,
    clearError,
  };
};
