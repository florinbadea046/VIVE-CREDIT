// src/modules/scoring/components/PolicyHistoryCard.tsx

import React, { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle2, XCircle } from "lucide-react";
import type { PolicyExecutionHistory } from "../types/policyEngine.types";
import { getStatusIcon } from "../utils/policyEngine.utils";

interface PolicyHistoryCardProps {
  entry: PolicyExecutionHistory;
  
}

export const PolicyHistoryCard: React.FC<PolicyHistoryCardProps> = ({
  entry,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div
        className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          {entry.status === "PASSED" ? (
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
          ) : (
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
              <XCircle className="w-5 h-5 text-red-500" />
            </div>
          )}
          <div>
            <p className="font-semibold text-gray-800">{entry.applicationId}</p>
            <p className="text-sm text-gray-500">{entry.executedAt}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              entry.status === "PASSED"
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {entry.status === "PASSED" ? "Aprobat" : "Respins"}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <div className="space-y-2">
            {entry.results.map((result, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                {getStatusIcon(result.status)}
                <span className="font-medium text-gray-700 min-w-[140px]">
                  {result.ruleName}
                </span>
                <span className="text-gray-400">—</span>
                <span className="text-gray-500">{result.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyHistoryCard;
