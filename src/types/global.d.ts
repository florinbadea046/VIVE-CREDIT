export interface Permission {
  id: string;
  resource: string;
  action: string;
  description?: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}

export interface ScoreRule {
  id: string;
  name: string;
  description: string;
  condition: string;
  scoreImpact: number;
  weight: number;
  category: 'income' | 'credit_history' | 'debt' | 'employment' | 'other';
  isActive: boolean;
}

export interface IncomeThreshold {
  id: string;
  minIncome: number;
  maxIncome: number;
  riskLevel: 'low' | 'medium' | 'high';
  approvalRequired: boolean;
  maxLoanAmount?: number;
  description?: string;
}

export interface DebtThreshold {
  id: string;
  maxDebtToIncomeRatio: number;
  riskLevel: 'low' | 'medium' | 'high';
  approvalRequired: boolean;
  description?: string;
}

export interface RiskConfiguration {
  id: string;
  name: string;
  description: string;
  scoreRules: ScoreRule[];
  incomeThresholds: IncomeThreshold[];
  debtThresholds: DebtThreshold[];
  isActive: boolean;
  created: string;
  updated: string;
}
