import { useState, useCallback } from "react";
import type {
  AMLScreeningRequest,
  AMLScreeningResult,
  AMLScreeningHistory,
  AMLOperatorDashboard,
} from "../types/amlScreening.types";
import { amlScreeningMockService } from "../services/amlScreeningService";

interface UseAMLScreeningReturn {
  // State
  isScreening: boolean;
  screeningResult: AMLScreeningResult | null;
  manualReviewQueue: AMLScreeningHistory[];
  dashboard: AMLOperatorDashboard | null;
  isLoadingQueue: boolean;
  isLoadingDashboard: boolean;
  error: string | null;

  // Actions
  screenClient: (
    request: AMLScreeningRequest
  ) => Promise<AMLScreeningResult | null>;
  fetchManualReviewQueue: () => Promise<void>;
  fetchDashboard: () => Promise<void>;
  reviewScreening: (
    screeningId: string,
    decision: "APPROVED" | "REJECTED",
    notes: string
  ) => Promise<void>;
  resetScreening: () => void;
}

export const useAMLScreening = (): UseAMLScreeningReturn => {
  const [isScreening, setIsScreening] = useState(false);
  const [screeningResult, setScreeningResult] =
    useState<AMLScreeningResult | null>(null);
  const [manualReviewQueue, setManualReviewQueue] = useState<
    AMLScreeningHistory[]
  >([]);
  const [dashboard, setDashboard] = useState<AMLOperatorDashboard | null>(null);
  const [isLoadingQueue, setIsLoadingQueue] = useState(false);
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* 4.1. Integrare API AML - Verificare client */
  const screenClient = useCallback(
    async (
      request: AMLScreeningRequest
    ): Promise<AMLScreeningResult | null> => {
      setIsScreening(true);
      setError(null);
      setScreeningResult(null);

      try {
        const result = await amlScreeningMockService.screenClient(request);
        setScreeningResult(result);

        // 4.4. Generare alertă automat dacă risc ridicat
        if (result.needsManualReview) {
          console.log("🚨 Alert generat automat pentru risc ridicat:", result);
        }

        return result;
      } catch (err) {
        setError("Eroare la screening AML");
        console.error(err);
        return null;
      } finally {
        setIsScreening(false);
      }
    },
    []
  );

  /* 4.2. Endpoint screening manual - Obține coadă de review */
  const fetchManualReviewQueue = useCallback(async () => {
    setIsLoadingQueue(true);
    setError(null);

    try {
      const queue = await amlScreeningMockService.getManualReviewQueue();
      setManualReviewQueue(queue);
    } catch (err) {
      setError("Eroare la încărcarea cozii de review");
      console.error(err);
    } finally {
      setIsLoadingQueue(false);
    }
  }, []);

  /* 4.5. Dashboard operator AML */
  const fetchDashboard = useCallback(async () => {
    setIsLoadingDashboard(true);
    setError(null);

    try {
      const dashboardData =
        await amlScreeningMockService.getOperatorDashboard();
      setDashboard(dashboardData);
    } catch (err) {
      setError("Eroare la încărcarea dashboard-ului");
      console.error(err);
    } finally {
      setIsLoadingDashboard(false);
    }
  }, []);

  /* 4.2. Review manual - Aprobare/Respingere */
  const reviewScreening = useCallback(
    async (
      screeningId: string,
      decision: "APPROVED" | "REJECTED",
      notes: string
    ) => {
      setError(null);

      try {
        // În producție va face API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Update local queue
        setManualReviewQueue((prev) =>
          prev.filter((item) => item.id !== screeningId)
        );

        console.log(
          `✅ Screening ${screeningId} ${decision} cu notă: ${notes}`
        );
      } catch (err) {
        setError("Eroare la salvarea deciziei");
        console.error(err);
      }
    },
    []
  );

  /* Reset screening result */
  const resetScreening = useCallback(() => {
    setScreeningResult(null);
    setError(null);
  }, []);

  return {
    isScreening,
    screeningResult,
    manualReviewQueue,
    dashboard,
    isLoadingQueue,
    isLoadingDashboard,
    error,
    screenClient,
    fetchManualReviewQueue,
    fetchDashboard,
    reviewScreening,
    resetScreening,
  };
};
