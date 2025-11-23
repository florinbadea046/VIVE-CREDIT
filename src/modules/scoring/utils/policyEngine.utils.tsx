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
import { PolicyRuleType, PolicyRuleStatus } from "../types/policyEngine.types";

/**
 * Returnează iconița corespunzătoare tipului de regulă
 */
export const getRuleIcon = (type: PolicyRuleType): React.ReactNode => {
  const iconClass = "w-5 h-5";

  switch (type) {
    case PolicyRuleType.RISK_SCORE:
      return <Shield className={iconClass} />;
    case PolicyRuleType.AML_CHECK:
      return <AlertTriangle className={iconClass} />;
    case PolicyRuleType.BLACKLIST_CHECK:
      return <User className={iconClass} />;
    case PolicyRuleType.MANDATORY_DOCUMENTS:
      return <FileText className={iconClass} />;
    case PolicyRuleType.INCOME_VERIFICATION:
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
    case PolicyRuleStatus.PASSED:
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case PolicyRuleStatus.FAILED:
      return <XCircle className="w-5 h-5 text-red-500" />;
    case PolicyRuleStatus.RUNNING:
      return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
    case PolicyRuleStatus.SKIPPED:
      return <AlertCircle className="w-5 h-5 text-gray-400" />;
    case PolicyRuleStatus.PENDING:
    default:
      return <Clock className="w-5 h-5 text-gray-300" />;
  }
};

/**
 * Returnează clasele CSS pentru background-ul statusului
 */
export const getStatusBgClass = (status: PolicyRuleStatus): string => {
  switch (status) {
    case PolicyRuleStatus.PASSED:
      return "bg-green-50 border-green-200";
    case PolicyRuleStatus.FAILED:
      return "bg-red-50 border-red-200";
    case PolicyRuleStatus.RUNNING:
      return "bg-blue-50 border-blue-200";
    case PolicyRuleStatus.SKIPPED:
      return "bg-gray-50 border-gray-200";
    case PolicyRuleStatus.PENDING:
    default:
      return "bg-white border-gray-200";
  }
};

/**
 * Returnează label-ul în română pentru tip de regulă
 */
export const getRuleTypeLabel = (type: PolicyRuleType): string => {
  const labels: Record<PolicyRuleType, string> = {
    [PolicyRuleType.RISK_SCORE]: "Scor de risc",
    [PolicyRuleType.AML_CHECK]: "Verificare AML",
    [PolicyRuleType.BLACKLIST_CHECK]: "Blacklist intern",
    [PolicyRuleType.MANDATORY_DOCUMENTS]: "Documente obligatorii",
    [PolicyRuleType.INCOME_VERIFICATION]: "Verificare venit",
  };
  return labels[type] || type;
};

/**
 * Returnează label-ul în română pentru status
 */
export const getStatusLabel = (status: PolicyRuleStatus): string => {
  const labels: Record<PolicyRuleStatus, string> = {
    [PolicyRuleStatus.PENDING]: "În așteptare",
    [PolicyRuleStatus.RUNNING]: "În execuție",
    [PolicyRuleStatus.PASSED]: "Trecut",
    [PolicyRuleStatus.FAILED]: "Eșuat",
    [PolicyRuleStatus.SKIPPED]: "Sărit",
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
