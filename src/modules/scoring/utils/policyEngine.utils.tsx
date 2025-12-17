import React from "react";
import {
  Shield,
  AlertTriangle,
  User,
  FileText,
  CreditCard,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertCircle,
  Clock,
} from "lucide-react";
import type {
  PolicyRuleType,
  PolicyRuleStatus,
} from "../types/policyEngine.types";

/**
 * Returnează iconița corespunzătoare tipului de regulă
 */
export const getRuleIcon = (type: PolicyRuleType): React.ReactNode => {
  const iconClass = "w-5 h-5";

  switch (type) {
    case "RISK_SCORE":
      return <Shield className={iconClass} />;
    case "AML_CHECK":
      return <AlertTriangle className={iconClass} />;
    case "BLACKLIST_CHECK":
      return <User className={iconClass} />;
    case "MANDATORY_DOCUMENTS":
      return <FileText className={iconClass} />;
    case "INCOME_VERIFICATION":
      return <CreditCard className={iconClass} />;
    default:
      return <Shield className={iconClass} />;
  }
};

/**
 * Returnează iconița corespunzătoare statusului
 */
export const getStatusIcon = (status: PolicyRuleStatus): React.ReactNode => {
  switch (status) {
    case "PASSED":
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case "FAILED":
      return <XCircle className="w-5 h-5 text-red-500" />;
    case "RUNNING":
      return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
    case "SKIPPED":
      return <AlertCircle className="w-5 h-5 text-gray-400" />;
    case "PENDING":
    default:
      return <Clock className="w-5 h-5 text-gray-300" />;
  }
};

/**
 * Returnează clasele CSS pentru background-ul statusului
 */
export const getStatusBgClass = (status: PolicyRuleStatus): string => {
  switch (status) {
    case "PASSED":
      return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900/50";
    case "FAILED":
      return "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900/50";
    case "RUNNING":
      return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-900/50";
    case "SKIPPED":
      return "bg-gray-50 border-gray-200 dark:bg-slate-800 dark:border-slate-700";
    case "PENDING":
    default:
      return "bg-white border-gray-200 dark:bg-slate-900 dark:border-slate-800";
  }
};

/**
 * Returnează label-ul în română pentru tip de regulă
 */
export const getRuleTypeLabel = (type: PolicyRuleType): string => {
  const labels: Record<PolicyRuleType, string> = {
    RISK_SCORE: "Scor de risc",
    AML_CHECK: "Verificare AML",
    BLACKLIST_CHECK: "Blacklist intern",
    MANDATORY_DOCUMENTS: "Documente obligatorii",
    INCOME_VERIFICATION: "Verificare venit",
  };
  return labels[type] || type;
};

/**
 * Returnează label-ul în română pentru status
 */
export const getStatusLabel = (status: PolicyRuleStatus): string => {
  const labels: Record<PolicyRuleStatus, string> = {
    PENDING: "În așteptare",
    RUNNING: "În execuție",
    PASSED: "Trecut",
    FAILED: "Eșuat",
    SKIPPED: "Sărit",
  };
  return labels[status] || status;
};

export default {
  getRuleIcon,
  getStatusIcon,
  getStatusBgClass,
  getRuleTypeLabel,
  getStatusLabel,
};
