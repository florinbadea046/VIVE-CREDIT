import React, { useState } from "react";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";
import type { ScoringHistory } from "@modules/scoring/types/scoringCalculator.types";
import {
  getScoreIcon,
  getEligibilityIcon,
  getScoreRangeLabel,
  formatRON,
  getScoreBgClass,
} from "@modules/scoring/utils/scoringCalculator.utils";

interface ScoringHistoryCardProps {
  entry: ScoringHistory;
}

export const ScoringHistoryCard: React.FC<ScoringHistoryCardProps> = ({
  entry,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              entry.result.eligibil ? "bg-green-50" : "bg-red-50"
            }`}
          >
            {getScoreIcon(entry.result.scoreRange)}
          </div>
          <div className="text-left">
            {entry.clientName && (
              <p className="font-semibold text-gray-800">{entry.clientName}</p>
            )}
            {entry.clientId && (
              <p className="text-sm text-gray-500">{entry.clientId}</p>
            )}
            {!entry.clientName && !entry.clientId && (
              <p className="text-sm text-gray-500">Calcul anonim</p>
            )}
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
              <Calendar className="w-3 h-3" />
              <span>{entry.calculatedAt}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-800">
              {entry.result.score}
            </p>
            <p className="text-xs text-gray-500">
              {getScoreRangeLabel(entry.result.scoreRange)}
            </p>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-100">
          {/* Input Data */}
          <div className="p-5 bg-gray-50">
            <h4 className="font-semibold text-gray-800 mb-3 text-sm">
              Date introduse
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Salariu</p>
                <p className="font-semibold text-gray-800">
                  {formatRON(entry.input.salariu)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Cheltuieli</p>
                <p className="font-semibold text-gray-800">
                  {formatRON(entry.input.cheltuieli)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Datorii</p>
                <p className="font-semibold text-gray-800">
                  {formatRON(entry.input.datorii)}
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="p-5 space-y-3">
            {/* Score Bar */}
            <div
              className={`p-4 rounded-xl border ${getScoreBgClass(
                entry.result.scoreColor
              )}`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Scor Final
                </span>
                <span className="text-xl font-bold text-gray-800">
                  {entry.result.score}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-800 transition-all rounded-full"
                  style={{ width: `${entry.result.score}%` }}
                />
              </div>
            </div>

            {/* Eligibility */}
            <div
              className={`p-3 rounded-xl flex items-center gap-3 ${
                entry.result.eligibil
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              {getEligibilityIcon(entry.result.eligibil)}
              <div>
                <p
                  className={`font-medium text-sm ${
                    entry.result.eligibil ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {entry.result.eligibil ? "Eligibil" : "Neeligibil"}
                </p>
                {entry.result.sumaMaximaCredit && (
                  <p className="text-xs text-green-600">
                    Max: {formatRON(entry.result.sumaMaximaCredit)}
                  </p>
                )}
              </div>
            </div>

            {/* Explanation */}
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              {entry.result.explicatie}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
