export interface LoanData {
  loanId: string;
  amount: number;
  interest: number;
  termMonths: number;
  monthlyRate: number;

  paidMonths: number;
  remainingMonths: number;

  nextPaymentDate: string;
  nextPaymentAmount: number;

  status: string;
  contractUrl: string;

  lastPayment: {
    date: string;
    amount: number;
    method: string;
  };
}
