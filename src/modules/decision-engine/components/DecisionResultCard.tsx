import React, { useState, useEffect } from "react";
import { ClientDecisionCard } from "./ClientDecisionCard";
import { decisionScenarios } from "../mock/DecisionScenarios.mock";
import { type ScoringResult } from "../types/decision.types";
import { Loader2 } from "lucide-react";

export const DecisionResultCard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentScenario, setCurrentScenario] = useState<ScoringResult | null>(
    null
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * decisionScenarios.length);
      setCurrentScenario(decisionScenarios[randomIndex]);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800 transition-colors">
      {loading ? (
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-10 h-10 text-primary animate-spin" />
          <p className="text-lg font-medium text-foreground animate-pulse">
            Se procesează datele financiare...
          </p>
        </div>
      ) : (
        currentScenario && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ClientDecisionCard data={currentScenario} />
          </div>
        )
      )}
    </div>
  );
};

export default DecisionResultCard;
