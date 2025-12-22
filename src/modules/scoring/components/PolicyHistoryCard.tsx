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
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden dark:bg-slate-900 dark:border-slate-800">
      {/* Header */}
      <div
        className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors dark:hover:bg-slate-800/50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          {entry.status === "PASSED" ? (
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center dark:bg-green-900/20">
              <CheckCircle2 className="w-5 h-5 text-green-500 dark:text-green-400" />
            </div>
          ) : (
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center dark:bg-red-900/20">
              <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
            </div>
          )}
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              {entry.applicationId}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {entry.executedAt}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              entry.status === "PASSED"
                ? "bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                : "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
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
        <div className="p-4 bg-gray-50 border-t border-gray-100 dark:bg-slate-950 dark:border-slate-800">
          <div className="space-y-2">
            {entry.results.map((result, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                {getStatusIcon(result.status)}
                <span className="font-medium text-gray-700 min-w-[140px] dark:text-gray-300">
                  {result.ruleName}
                </span>
                <span className="text-gray-400">—</span>
                <span className="text-gray-500 dark:text-gray-400">
                  {result.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyHistoryCard;
