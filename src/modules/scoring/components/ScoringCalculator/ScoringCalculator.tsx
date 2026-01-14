import React, { useState, useEffect } from 'react';
import {
  Calculator,
  DollarSign,
  CreditCard,
  TrendingDown,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import type {
  ScoringInput,
  ScoringResult,
} from '@modules/scoring/types/scoringCalculator.types';
import {
  getScoreColorClass,
  getScoreBgClass,
  getScoreIcon,
  getEligibilityIcon,
  getScoreRangeLabel,
  formatRON,
} from '@modules/scoring/utils/scoringCalculator.utils';

interface ScoringCalculatorProps {
  onCalculate: (input: ScoringInput) => Promise<ScoringResult | null>;
  isCalculating: boolean;
  result: ScoringResult | null;
  error: string | null;
  onReset: () => void;
  initialData?: {
    salariu: number;
    cheltuieli: number;
    datorii: number;
  };
}

export const ScoringCalculator: React.FC<ScoringCalculatorProps> = ({
  onCalculate,
  isCalculating,
  result,
  error,
  onReset,
  initialData,
}) => {
  const [input, setInput] = useState<ScoringInput>({
    salariu: initialData?.salariu || 5000,
    cheltuieli: initialData?.cheltuieli || 1500,
    datorii: initialData?.datorii || 800,
  });

  // Calculează automat dacă există date inițiale
  useEffect(() => {
    if (initialData) {
      const data = {
        salariu: initialData.salariu,
        cheltuieli: initialData.cheltuieli,
        datorii: initialData.datorii,
      };
      setInput(data);
      // Calculează automat
      onCalculate(data);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onCalculate(input);
  };

  const handleReset = () => {
    setInput({
      salariu: 5000,
      cheltuieli: 1500,
      datorii: 800,
    });
    onReset();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-[#2e57e1] rounded-xl flex items-center justify-center">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Calculator Scoring
          </h2>
          <p className="text-sm text-gray-500">
            Calculează scorul în timp real
          </p>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
            <div>
              <p className="font-medium text-red-800">Eroare</p>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      {!result && (
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Salariu */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="w-4 h-4" />
              Salariu net lunar (RON) *
            </label>
            <input
              type="number"
              required
              min="1"
              step="1"
              value={input.salariu}
              onChange={(e) =>
                setInput({ ...input, salariu: Number(e.target.value) })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2e57e1] focus:border-transparent text-lg"
              placeholder="5000"
            />
          </div>

          {/* Cheltuieli */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <CreditCard className="w-4 h-4" />
              Cheltuieli lunare (RON) *
            </label>
            <input
              type="number"
              required
              min="0"
              step="1"
              value={input.cheltuieli}
              onChange={(e) =>
                setInput({ ...input, cheltuieli: Number(e.target.value) })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2e57e1] focus:border-transparent text-lg"
              placeholder="1500"
            />
          </div>

          {/* Datorii */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <TrendingDown className="w-4 h-4" />
              Datorii existente (RON) *
            </label>
            <input
              type="number"
              required
              min="0"
              step="1"
              value={input.datorii}
              onChange={(e) =>
                setInput({ ...input, datorii: Number(e.target.value) })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2e57e1] focus:border-transparent text-lg"
              placeholder="800"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isCalculating}
            className="w-full bg-[#2e57e1] text-white px-6 py-4 rounded-xl font-medium hover:bg-[#2549c4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
          >
            {isCalculating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Se calculează...
              </>
            ) : (
              <>
                <Calculator className="w-5 h-5" />
                Calculează Scor
              </>
            )}
          </button>
        </form>
      )}

      {/* Result */}
      {result && !isCalculating && (
        <div className="space-y-6">
          {/* Score Display */}
          <div
            className={`p-6 rounded-2xl border ${getScoreBgClass(
              result.scoreColor
            )}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {getScoreIcon(result.scoreRange)}
                <div>
                  <p className="text-sm text-gray-600">Scor Final</p>
                  <p className="text-4xl font-bold text-gray-800">
                    {result.score}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Categorie</p>
                <p className="text-lg font-semibold text-gray-800">
                  {getScoreRangeLabel(result.scoreRange)}
                </p>
              </div>
            </div>

            {/* Score Bar */}
            <div className="relative">
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getScoreColorClass(
                    result.scoreColor
                  )} transition-all duration-1000 rounded-full`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0</span>
                <span>40</span>
                <span>70</span>
                <span>100</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4">
            {/* Rata Indatorare */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rată îndatorare</span>
                <span className="font-semibold text-gray-800">
                  {(result.rataIndatorare * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Eligibilitate */}
            <div
              className={`rounded-xl p-4 border ${
                result.eligibil
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {getEligibilityIcon(result.eligibil)}
                <div>
                  <p
                    className={`font-semibold ${
                      result.eligibil ? 'text-green-800' : 'text-red-800'
                    }`}
                  >
                    {result.eligibil ? 'Client Eligibil' : 'Client Neeligibil'}
                  </p>
                  {result.sumaMaximaCredit && (
                    <p className="text-sm text-green-700">
                      Sumă maximă: {formatRON(result.sumaMaximaCredit)}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Explicatie */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm font-medium text-blue-900 mb-1">
                Explicație
              </p>
              <p className="text-sm text-blue-700">{result.explicatie}</p>
            </div>

            {/* Recomandare */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <p className="text-sm font-medium text-purple-900 mb-1">
                Recomandare
              </p>
              <p className="text-sm text-purple-700">{result.recomandare}</p>
            </div>
          </div>

          {/* Actions */}
          <button
            onClick={handleReset}
            className="w-full px-6 py-3 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors"
          >
            Calcul Nou
          </button>
        </div>
      )}
    </div>
  );
};
