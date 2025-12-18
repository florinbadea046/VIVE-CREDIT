export interface RiskApplication {
  id: string;
  client: string;
  score: number;
  status: string;
  reasonCodes: string[];

  creditAmount: number;

  kyc?: {
    idFront: string;
    idBack: string;
    selfie: string;
    status: string;
  };

  income?: {
    amount: number;
    employer: string;
    contractType: string;
    history: string[];
  };

  documents?: { name: string; url: string; uploadedAt: string }[];
  notes?: { text: string; time: string }[];
  requestedDocuments?: string[];
}
