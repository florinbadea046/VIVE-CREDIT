export enum AMLCheckType {
  SANCTIONS_LIST = "SANCTIONS_LIST", // Liste sanctiuni internationale
  PEP_CHECK = "PEP_CHECK", // Politically Exposed Person
  ADVERSE_MEDIA = "ADVERSE_MEDIA", // Media negativa
  WATCHLIST = "WATCHLIST", // Liste de monitorizare
  INTERNAL_BLACKLIST = "INTERNAL_BLACKLIST", // Blacklist intern
}

export enum AMLRiskLevel {
  LOW = "LOW", // Risc scazut
  MEDIUM = "MEDIUM", // Risc mediu
  HIGH = "HIGH", // Risc ridicat
  CRITICAL = "CRITICAL", // Risc critic (stop immediate)
}

export enum AMLScreeningStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  CLEARED = "CLEARED",
  FLAGGED = "FLAGGED",
  REJECTED = "REJECTED",
  MANUAL_REVIEW = "MANUAL_REVIEW",
}

export interface AMLMatch {
  id: string;
  type: AMLCheckType;
  matchScore: number; // 0-100
  listName: string;
  entityName: string;
  matchedFields: string[];
  details: string;
  source: string;
  dateAdded?: string;
}

export interface PEPDetails {
  isPEP: boolean;
  position?: string;
  organization?: string;
  country?: string;
  relationship?: "DIRECT" | "FAMILY" | "CLOSE_ASSOCIATE";
  since?: string;
}

export interface AMLScreeningRequest {
  clientId: string;
  firstName: string;
  lastName: string;
  cnp?: string;
  dateOfBirth: string;
  nationality?: string;
  address?: string;
  businessActivity?: string;
}

export interface AMLScreeningResult {
  id: string;
  requestId: string;
  status: AMLScreeningStatus;
  riskLevel: AMLRiskLevel;
  matches: AMLMatch[];
  pepDetails: PEPDetails | null;
  performedAt: string;
  performedBy: "SYSTEM" | "MANUAL";
  notes?: string;
  needsManualReview: boolean;
  autoDecision: "APPROVE" | "REJECT" | "REVIEW";
}

export interface AMLScreeningHistory {
  id: string;
  clientId: string;
  clientName: string;
  cnp: string;
  applicationId?: string;
  status: AMLScreeningStatus;
  riskLevel: AMLRiskLevel;
  matches: AMLMatch[];
  pepDetails: PEPDetails | null;
  screenedAt: string;
  screenedBy: string;
  reviewedAt?: string;
  reviewedBy?: string;
  decision?: "APPROVED" | "REJECTED";
  decisionNotes?: string;
}

export interface AMLAlert {
  id: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  type: AMLCheckType;
  clientId: string;
  clientName: string;
  message: string;
  createdAt: string;
  status: "NEW" | "IN_REVIEW" | "RESOLVED";
  assignedTo?: string;
}

export interface AMLOperatorDashboard {
  pendingReviews: number;
  flaggedToday: number;
  criticalAlerts: number;
  averageReviewTime: number;
  recentAlerts: AMLAlert[];
}
