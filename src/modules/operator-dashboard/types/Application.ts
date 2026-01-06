export type ApplicationStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "manual_review"
  | "documents_requested"
  | "aml_review";

export interface Application {
  id: string;
  client: string;
  score?: number;
  status: ApplicationStatus;
  creditAmount: number;

  modules: {
    risk?: boolean;
    sales?: boolean;
    collections?: boolean;
  };

  reasonCodes?: string[];

  kyc?: {
    idFront: string;
    idBack: string;
    selfie: string;
    status: "verified" | "unclear" | "rejected";
  };

  income?: {
    amount: number;
    employer?: string;
    contractType?: string;
    history?: string[];
  };

  documents?: {
    name: string;
    url: string;
    uploadedAt: string;
  }[];

  notes?: {
    text: string;
    time: string;
  }[];

  requestedDocuments?: string[];
}
