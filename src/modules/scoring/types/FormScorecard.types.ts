export type ScoringFormData = {
  income: {
    salaryNet: number | '';
    otherIncome: number | '';
  };
  expenses: {
    rent: number | '';
    utilities: number | '';
    existingRates: number | '';
  };
  housingStatus: 'owner' | 'tenant' | 'cohabitant' | 'without housing' | '';
};
