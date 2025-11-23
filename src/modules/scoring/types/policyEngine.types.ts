// src/modules/scoring/types/policyEngine.types.ts

export type PolicyRuleType = 
  | "RISK_SCORE"
  | "AML_CHECK"
  | "BLACKLIST_CHECK"
  | "MANDATORY_DOCUMENTS"
  | "INCOME_VERIFICATION";

export type PolicyRuleStatus = 
  | "PENDING"
  | "RUNNING"
  | "PASSED"
  | "FAILED"
  | "SKIPPED";

export interface PolicyRuleConfig {
  minScore?: number;
  maxDTI?: number;
  required?: string[];
  [key: string]: unknown;
}

export interface PolicyRule {
  id: string;
  type: PolicyRuleType;
  name: string;
  description: string;
  order: number;
  isActive: boolean;
  stopOnFail: boolean;
  config: PolicyRuleConfig;
}

export interface PolicyExecutionResult {
  ruleId: string;
  ruleName: string;
  status: PolicyRuleStatus;
  message: string;
  details?: Record<string, unknown>;
  executedAt?: string;
}

export interface PolicyExecutionHistory {
  id: string;
  applicationId: string;
  executedAt: string;
  status: "PASSED" | "FAILED";
  results: PolicyExecutionResult[];
}

export interface PolicyEngineState {
  rules: PolicyRule[];
  isLoading: boolean;
  isExecuting: boolean;
  currentRuleIndex: number;
  executionResults: PolicyExecutionResult[];
  history: PolicyExecutionHistory[];
  error: string | null;
}
