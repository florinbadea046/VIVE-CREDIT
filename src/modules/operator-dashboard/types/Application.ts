export type ApplicationStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "manual_review"
  | "documents_requested"
  | "aml_review";

export type CollectionsStatus = "none" | "current" | "overdue" | "defaulted";

export interface Application {
  id: string;
  client: string;

  contact: { email: string; phone: string };

  address?: {
    street: string;
    city: string;
    country?: string;
    postalCode?: string;
  };

  score?: number;
  status: ApplicationStatus;
  creditAmount: number;

  modules: {
    risk?: boolean;
    sales?: boolean;
    collections?: boolean;
  };

  collectionsStatus?: CollectionsStatus;

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
