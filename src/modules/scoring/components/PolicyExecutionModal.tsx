import React, { useEffect } from "react";
import { X, Play, CheckCircle2, XCircle } from "lucide-react";
import {
  type PolicyRule,
  type PolicyExecutionResult,
} from "../types/policyEngine.types";
import {
  getRuleIcon,
  getStatusIcon,
  getStatusBgClass,
} from "../utils/policyEngine.utils";

interface PolicyExecutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  rules: PolicyRule[];
  isExecuting: boolean;
  currentRuleIndex: number;
  executionResults: PolicyExecutionResult[];
  overallStatus: "PASSED" | "FAILED" | null;
  onStartExecution: () => void;
  onReset: () => void;
}

export const PolicyExecutionModal: React.FC<PolicyExecutionModalProps> = ({
  isOpen,
  onClose,
  rules,
  isExecuting,
  currentRuleIndex,
  executionResults,
  overallStatus,
  onStartExecution,
  onReset,
}) => {
  // Reset la deschidere
  useEffect(() => {
    if (isOpen) {
      onReset();
    }
  }, [isOpen, onReset]);

  if (!isOpen) return null;

  const activeRules = rules
    .filter((r) => r.isActive)
    .sort((a, b) => a.order - b.order);

  const progress =
    activeRules.length > 0
      ? (executionResults.length / activeRules.length) * 100
      : 0;

  const hasStarted = isExecuting || executionResults.length > 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-[#2e57e1] px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-semibold text-lg">
            Verificare Policy Engine
          </h2>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            PolicyRuleStatus
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Initial state - before execution */}
          {!hasStarted && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-[#2e57e1]" />
              </div>
              <p className="text-gray-600 mb-6">
                Se vor executa {activeRules.length} reguli în ordine
              </p>
              <button
                onClick={onStartExecution}
                className="bg-[#2e57e1] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#2549c4] transition-colors"
              >
                Începe verificarea
              </button>
            </div>
          )}

          {/* Execution in progress or completed */}
          {hasStarted && (
            <>
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Progres verificare</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2e57e1] transition-all duration-500 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Rules list */}
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {activeRules.map((rule, index) => {
                  const result = executionResults.find(
                    (r) => r.ruleId === rule.id
                  );
                  const isCurrentRule = currentRuleIndex === index;
                  const status = isCurrentRule
                    ? "RUNNING" // Replace with the actual value for the running status
                    : result?.status || "PENDING"; // Replace "PENDING" with the actual string or value if different

                  return (
                    <div
                      key={rule.id}
                      className={`p-4 rounded-xl border transition-all ${getStatusBgClass(
                        status
                      )}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            status === "PENDING" // Replace with the actual string value for PENDING
                              ? "bg-gray-100"
                              : "bg-white"
                          }`}
                        >
                          {getRuleIcon(rule.type)}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">
                            {rule.name}
                          </p>
                          {result && (
                            <p className="text-sm text-gray-500 mt-0.5">
                              {result.message}
                            </p>
                          )}
                        </div>
                        {getStatusIcon(status)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Overall result */}
              {overallStatus && (
                <div
                  className={`mt-6 p-4 rounded-xl ${
                    overallStatus === "PASSED" ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {overallStatus === "PASSED" ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-500" />
                    )}
                    <span
                      className={`font-medium ${
                        overallStatus === "PASSED"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {overallStatus === "PASSED"
                        ? "Toate verificările au trecut!"
                        : "Verificare eșuată"}
                    </span>
                  </div>
                </div>
              )}

              {/* Action buttons after completion */}
              {overallStatus && (
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={onReset}
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Resetează
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 bg-[#2e57e1] text-white rounded-xl font-medium hover:bg-[#2549c4] transition-colors"
                  >
                    Închide
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PolicyExecutionModal;
