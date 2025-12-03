// src/data/aml.ts

export type AmlRiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface AmlResult {
  id: number;
  clientId: number;
  fullName: string;
  cnp: string;
  isPep: boolean;
  hasSanctions: boolean;
  riskScore: number;        // 0–100
  riskLevel: AmlRiskLevel;
  matchedLists: string[];   // ex: ["PEP_LIST", "SANCTIONS_LIST"]
  createdAt: string;
}

export interface AmlAlert {
  id: number;
  resultId: number;         // referință la AmlResult
  clientId: number;
  riskLevel: AmlRiskLevel;
  reason: string;
  createdAt: string;
}

const amlResults: AmlResult[] = [];
const amlAlerts: AmlAlert[] = [];

let nextResultId = 1;
let nextAlertId = 1;

// salvează un rezultat de screening
export function saveAmlResult(
  data: Omit<AmlResult, 'id' | 'createdAt'>
): AmlResult {
  const result: AmlResult = {
    id: nextResultId++,
    createdAt: new Date().toISOString(),
    ...data,
  };
  amlResults.push(result);
  return result;
}

export function saveAmlAlert(params: {
  resultId: number;
  clientId: number;
  riskLevel: AmlRiskLevel;
  reason: string;
}): AmlAlert {
  const alert: AmlAlert = {
    id: nextAlertId++,
    createdAt: new Date().toISOString(),
    ...params,
  };
  amlAlerts.push(alert);
  return alert;
}

export function getLatestAmlForClient(
  clientId: number
): AmlResult | undefined {
  const all = amlResults.filter(r => r.clientId === clientId);
  return all[all.length - 1];
}

export function getAmlResultById(id: number): AmlResult | undefined {
  return amlResults.find(r => r.id === id);
}

// pentru dashboard AML
export function getAllAlerts(): AmlAlert[] {
  return amlAlerts;
}
