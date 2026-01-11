export type KycStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface KycResult {
  id: number;
  clientId: number;
  documentType: string;
  score: number;                   // 0–100
  livenessResult: 'PASSED' | 'FAILED';
  status: KycStatus;
  createdAt: string;
}

// mock DB în memorie
const kycResults: KycResult[] = [];
let nextId = 1;

export function saveKycResult(
  data: Omit<KycResult, 'id' | 'createdAt'>
): KycResult {
  const result: KycResult = {
    id: nextId++,
    createdAt: new Date().toISOString(),
    ...data,
  };
  kycResults.push(result);
  return result;
}

export function getLatestKycForClient(clientId: number): KycResult | undefined {
  const all = kycResults.filter(k => k.clientId === clientId);
  return all[all.length - 1]; // ultimul pentru clientul ăsta
}
