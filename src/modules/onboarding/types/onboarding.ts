export interface OnboardingData {
  fullName: string;
  cnp: string;
  email: string;
  address: string;
  city: string;
  county: string;
  phone: string;
  company: string;
  position: string;
  income: string;
  experience: string;

  documents: {
    idCard: File | null;
    incomeProof: File | null;
    otherDocs: File[];
  };
}
