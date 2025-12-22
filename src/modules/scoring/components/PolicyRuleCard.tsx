import React from "react";
import type { PolicyRule } from "../types/policyEngine.types";
import { getRuleIcon } from "../utils/policyEngine.utils";

interface PolicyRuleCardProps {
  rule: PolicyRule;
  onToggleActive: (ruleId: string) => void;
  onToggleStopOnFail: (ruleId: string) => void;
}

export const PolicyRuleCard: React.FC<PolicyRuleCardProps> = ({
  rule,
  onToggleActive,
  onToggleStopOnFail,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow dark:bg-slate-900 dark:border-slate-800">
      <div className="flex items-start gap-4">
        {/* Order & Icon */}
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 bg-blue-50 text-[#2e57e1] rounded-lg flex items-center justify-center font-semibold text-sm dark:bg-blue-900/30 dark:text-blue-400">
            {rule.order}
          </span>
          <div
            className={`p-2.5 rounded-xl ${
              rule.isActive
                ? "bg-[#2e57e1] text-white"
                : "bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-gray-500"
            }`}
          >
            {getRuleIcon(rule.type)}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-semibold text-gray-800 dark:text-white">
              {rule.name}
            </h3>
            {rule.stopOnFail && (
              <span className="text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium dark:bg-red-900/20 dark:text-red-400">
                Stop on fail
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {rule.description}
          </p>

          {/* Config badges */}
          {rule.config && Object.keys(rule.config).length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {rule.config.minScore && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg dark:bg-slate-800 dark:text-gray-300">
                  Min score: {rule.config.minScore}
                </span>
              )}
              {rule.config.maxDTI && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg dark:bg-slate-800 dark:text-gray-300">
                  Max DTI: {rule.config.maxDTI}%
                </span>
              )}
              {rule.config.required && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg dark:bg-slate-800 dark:text-gray-300">
                  {rule.config.required.length} documente necesare
                </span>
              )}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Stop on fail toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs text-gray-500">Stop on fail</span>
            <button
              onClick={() => onToggleStopOnFail(rule.id)}
              className={`w-10 h-6 rounded-full transition-colors ${
                rule.stopOnFail ? "bg-red-400" : "bg-gray-200 dark:bg-slate-700"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-1 ${
                  rule.stopOnFail ? "translate-x-4" : ""
                }`}
              />
            </button>
          </label>

          {/* Active toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs text-gray-500">Activ</span>
            <button
              onClick={() => onToggleActive(rule.id)}
              className={`w-10 h-6 rounded-full transition-colors ${
                rule.isActive ? "bg-[#2e57e1]" : "bg-gray-200"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow transition-transform mx-1 ${
                  rule.isActive ? "translate-x-4" : ""
                }`}
              />
            </button>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PolicyRuleCard;
