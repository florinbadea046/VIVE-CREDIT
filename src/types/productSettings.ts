export type InterestType = "fixed" | "variable";

export interface ProductSetting {
  id: string;
  productCode: string;
  name: string;
  interestType: InterestType;
  interestRate: number;
  commission: number;
  minAmount: number;
  maxAmount: number;
  active: boolean;
  updatedAt: string;
}
