import { useState, useCallback } from "react";
import {
  type PolicyRule,
  type PolicyExecutionResult,
} from "../types/policyEngine.types";
import { policyEngineMockService } from "../services/policyEngineService";

interface UsePolicyEngineReturn {
  // State
  rules: PolicyRule[];
  isLoading: boolean;
  isExecuting: boolean;
  currentRuleIndex: number;
  executionResults: PolicyExecutionResult[];
  overallStatus: "PASSED" | "FAILED" | null;
  error: string | null;

  // Actions
  fetchRules: () => Promise<void>;
  toggleRule: (ruleId: string) => void;
  toggleStopOnFail: (ruleId: string) => void;
  updateRuleConfig: (ruleId: string, config: Record<string, unknown>) => void;
  executeRules: () => Promise<void>;
  resetExecution: () => void;
}

export const usePolicyEngine = (): UsePolicyEngineReturn => {
  const [rules, setRules] = useState<PolicyRule[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentRuleIndex, setCurrentRuleIndex] = useState(-1);
  const [executionResults, setExecutionResults] = useState<
    PolicyExecutionResult[]
  >([]);
  const [overallStatus, setOverallStatus] = useState<
    "PASSED" | "FAILED" | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Încarcă regulile de la backend
   */
  const fetchRules = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await policyEngineMockService.getRules();
      setRules(data);
    } catch (err) {
      setError("Nu s-au putut încărca regulile");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Activează/dezactivează o regulă
   */
  const toggleRule = useCallback((ruleId: string) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
      )
    );
  }, []);

  /**
   * Activează/dezactivează stop-on-fail pentru o regulă
   */
  const toggleStopOnFail = useCallback((ruleId: string) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId ? { ...rule, stopOnFail: !rule.stopOnFail } : rule
      )
    );
  }, []);

  /**
   * Actualizează configurația unei reguli
   */
  const updateRuleConfig = useCallback(
    (ruleId: string, config: Record<string, unknown>) => {
      setRules((prev) =>
        prev.map((rule) =>
          rule.id === ruleId
            ? { ...rule, config: { ...rule.config, ...config } }
            : rule
        )
      );
    },
    []
  );

  /**
   * Execută toate regulile active în ordine
   */
  const executeRules = useCallback(async () => {
    setIsExecuting(true);
    setExecutionResults([]);
    setOverallStatus(null);
    setError(null);

    const activeRules = rules
      .filter((r) => r.isActive)
      .sort((a, b) => a.order - b.order);

    let failed = false;

    for (let i = 0; i < activeRules.length; i++) {
      const rule = activeRules[i];

      // Dacă o regulă anterioară a eșuat și aceasta are stopOnFail, o sărim
      if (failed) {
        setExecutionResults((prev) => [
          ...prev,
          {
            ruleId: rule.id,
            ruleName: rule.name,
            status: "SKIPPED",
            message: "Sărit - regulă anterioară eșuată",
          },
        ]);
        continue;
      }

      // Setăm regula curentă
      setCurrentRuleIndex(i);

      try {
        // Executăm regula
        const result = await policyEngineMockService.executeRule(rule);
        setExecutionResults((prev) => [...prev, result]);

        // Verificăm dacă a eșuat și are stopOnFail
        if (result.status === "FAILED" && rule.stopOnFail) {
          failed = true;
        }
      } catch {
        // Eroare la execuție
        setExecutionResults((prev) => [
          ...prev,
          {
            ruleId: rule.id,
            ruleName: rule.name,
            status: "FAILED",
            message: "Eroare la execuție",
          },
        ]);
        if (rule.stopOnFail) {
          failed = true;
        }
      }
    }

    setCurrentRuleIndex(-1);
    setIsExecuting(false);
    setOverallStatus(failed ? "FAILED" : "PASSED");
  }, [rules]);

  /**
   * Resetează starea execuției
   */
  const resetExecution = useCallback(() => {
    setExecutionResults([]);
    setOverallStatus(null);
    setCurrentRuleIndex(-1);
    setError(null);
  }, []);

  return {
    rules,
    isLoading,
    isExecuting,
    currentRuleIndex,
    executionResults,
    overallStatus,
    error,
    fetchRules,
    toggleRule,
    toggleStopOnFail,
    updateRuleConfig,
    executeRules,
    resetExecution,
  };
};

export default usePolicyEngine;
