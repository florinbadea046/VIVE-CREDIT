export type DecisionStatus = 'approved' | 'rejected' | 'pending';

export interface ScoringResult {
  applicationId: string;
  decision: DecisionStatus; 
  score: number;
  maxAmount?: number;
  currency: string;
  summary: string;
  reasonCodes: string[];
  createdAt: string;
}