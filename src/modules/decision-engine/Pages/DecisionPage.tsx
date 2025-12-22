import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MOCK_APPROVED, MOCK_REJECTED, MOCK_MANUAL } from "../Data/MockData";
import { DecisionCard } from "../components/DecisionCard";
import type { ScoringResult } from "../types/decision.types";
import { Play, RotateCcw } from "lucide-react";

export default function DecisionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScoringResult | null>(null);

  const handleRunScoring = () => {
    setLoading(true);
    setResult(null);

    // SIMULARE
    setTimeout(() => {
      const scenarios = [MOCK_APPROVED, MOCK_REJECTED, MOCK_MANUAL];
      const randomResult =
        scenarios[Math.floor(Math.random() * scenarios.length)];

      setResult(randomResult);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50/50 flex flex-col items-center space-y-8 dark:bg-slate-950">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-blue-700 tracking-tight dark:text-blue-400">
          Decision Engine
        </h1>
      </div>

      {/* Zona de Control */}
      {!result && (
        <Card className="p-8 w-full max-w-md flex flex-col items-center text-center space-y-4 shadow-sm dark:bg-slate-900 dark:border-slate-800">
          <div className="bg-blue-100 p-4 rounded-full text-blue-600 mb-2 dark:bg-blue-900/30 dark:text-blue-400">
            <Play size={32} />
          </div>
          <div>
            <h3 className="text-lg font-semibold dark:text-white">
              Pregătit pentru analiză
            </h3>
            <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
              Apăsați butonul de mai jos pentru a trimite datele{" "}
              <code>POST/scoring/run</code>
            </p>
          </div>

          <Button
            onClick={handleRunScoring}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg"
          >
            {loading ? "Se calculează..." : "Scor"}
          </Button>
        </Card>
      )}

      {/* Zona de Rezultat */}
      {result && (
        <div className="flex flex-col items-center w-full space-y-6">
          <DecisionCard data={result} />

          <Button
            variant="outline"
            onClick={() => setResult(null)}
            className="gap-2"
          >
            <RotateCcw size={16} />
            Resetare / Analiză Nouă
          </Button>
        </div>
      )}
    </div>
  );
}
