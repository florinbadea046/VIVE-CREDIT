import {
  AlertTriangle,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Shield,
} from "lucide-react";
import type {
  AMLCheckType,
  AMLRiskLevel,
  AMLScreeningStatus,
} from "../types/amlScreening.types";

export function getRiskLevelIcon(riskLevel: AMLRiskLevel) {
  switch (riskLevel) {
    case "LOW":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "MEDIUM":
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    case "HIGH":
      return <AlertTriangle className="w-5 h-5 text-orange-500" />;
    case "CRITICAL":
      return <XCircle className="w-5 h-5 text-red-500" />;
    default:
      return null;
  }
}

export function getRiskLevelLabel(riskLevel: AMLRiskLevel): string {
  switch (riskLevel) {
    case "LOW":
      return "Low Risk";
    case "MEDIUM":
      return "Medium Risk";
    case "HIGH":
      return "High Risk";
    case "CRITICAL":
      return "Critical Risk";
    default:
      return "Unknown";
  }
}

export function getRiskLevelColor(riskLevel: AMLRiskLevel): string {
  switch (riskLevel) {
    case "LOW":
      return "bg-green-50 border-green-200";
    case "MEDIUM":
      return "bg-yellow-50 border-yellow-200";
    case "HIGH":
      return "bg-orange-50 border-orange-200";
    case "CRITICAL":
      return "bg-red-50 border-red-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
}

export function getScreeningStatusIcon(status: AMLScreeningStatus) {
  switch (status) {
    case "PENDING":
      return <Clock className="w-5 h-5 text-gray-500" />;
    case "IN_PROGRESS":
      return <Clock className="w-5 h-5 text-blue-500" />;
    case "CLEARED":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "FLAGGED":
      return <AlertTriangle className="w-5 h-5 text-orange-500" />;
    case "REJECTED":
      return <XCircle className="w-5 h-5 text-red-500" />;
    case "MANUAL_REVIEW":
      return <Shield className="w-5 h-5 text-purple-500" />;
    default:
      return null;
  }
}

export function getScreeningStatusLabel(status: AMLScreeningStatus): string {
  switch (status) {
    case "PENDING":
      return "Pending";
    case "IN_PROGRESS":
      return "In Progress";
    case "CLEARED":
      return "Cleared";
    case "FLAGGED":
      return "Flagged";
    case "REJECTED":
      return "Rejected";
    case "MANUAL_REVIEW":
      return "Manual Review";
    default:
      return "Unknown";
  }
}

export function getAMLCheckTypeLabel(type: AMLCheckType): string {
  switch (type) {
    case "SANCTIONS_LIST":
      return "Sanctions List";
    case "PEP_CHECK":
      return "PEP Check";
    case "ADVERSE_MEDIA":
      return "Adverse Media";
    case "WATCHLIST":
      return "Watchlist";
    case "INTERNAL_BLACKLIST":
      return "Internal Blacklist";
    default:
      return "Unknown";
  }
}

export interface MatchScoreIndicator {
  label: string;
  color: string;
}

export function getMatchScoreIndicator(score: number): MatchScoreIndicator {
  if (score >= 95)
    return { label: "Critical Match", color: "bg-red-100 text-red-800" };
  if (score >= 85)
    return { label: "High Match", color: "bg-orange-100 text-orange-800" };
  if (score >= 70)
    return { label: "Medium Match", color: "bg-yellow-100 text-yellow-800" };
  if (score >= 50)
    return { label: "Possible Match", color: "bg-blue-100 text-blue-800" };
  return { label: "Low Match", color: "bg-green-100 text-green-800" };
}
