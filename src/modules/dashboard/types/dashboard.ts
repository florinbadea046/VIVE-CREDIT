export interface ApplicationStatus {
  status: "approved" | "pending" | "rejected";
  applicationId: string;
  submittedAt: string;
}

export interface LoanDetails {
  amount: number;
  interest: number;
  monthlyRate: number;
  remainingMonths: number;
  nextDueDate: string;
}

export interface PaymentItem {
  id: string;
  amount: number;
  date: string;
  method: string;
  status: "pending" | "completed";
}

export interface DashboardDocument {
  id: string;
  name: string;
  url: string;
}

export interface DashboardData {
  applicationStatus: ApplicationStatus;
  loanDetails: LoanDetails;
  payments: PaymentItem[];
  documents: DashboardDocument[];
}
