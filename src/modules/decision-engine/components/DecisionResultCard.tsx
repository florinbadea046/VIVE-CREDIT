import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ClientDecisionCard } from "./ClientDecisionCard";
import { type ScoringResult } from "../types/decision.types";
import { Loader2 } from "lucide-react";

export const DecisionResultCard: React.FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [currentScenario, setCurrentScenario] = useState<ScoringResult | null>(
    null
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      // Preluam datele de la /Calculator
      const scoringResult =
        location.state?.scoringResult ||
        JSON.parse(localStorage.getItem("scoring-final") || "null");

      if (scoringResult) {
        let finalStatus: "approved" | "rejected" | "pending";

        // Logica de mapare a scorului
        if (scoringResult.score >= 70) {
          finalStatus = "approved";
        } else if (scoringResult.score === 55) {
          finalStatus = "pending";
        } else {
          // Scorurile de 40 și 25 ajung aici
          finalStatus = "rejected";
        }

        // Salvam rezultatul "curat" pentru Dashboard
        localStorage.setItem(
          "scoring-final",
          JSON.stringify({
            score: scoringResult.score,
            status: finalStatus,
          })
        );

        setCurrentScenario({
          applicationId: `VIVE-${Math.floor(Math.random() * 9000 + 1000)}`,
          decision: finalStatus,
          score: scoringResult.score,
          summary: scoringResult.explicatie,
          createdAt: new Date().toISOString(),
          currency: "RON",
          maxAmount: scoringResult.sumaMaximaCredit,
          reasonCodes: [],
        });
      }

      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [location.state]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 transition-colors">
      {loading ? (
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-lg font-medium text-foreground animate-pulse">
            Se procesează verdictul final...
          </p>
        </div>
      ) : (
        currentScenario && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full flex justify-center">
            <ClientDecisionCard data={currentScenario} />
          </div>
        )
      )}
    </div>
  );
};

export default DecisionResultCard;
