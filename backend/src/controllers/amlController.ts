// src/controllers/amlController.ts

import { Request, Response } from 'express';
import { findClientById } from '../data/clients';
import {
  saveAmlResult,
  saveAmlAlert,
  getLatestAmlForClient,
  getAllAlerts,
  AmlRiskLevel,
  getAmlResultById,
} from '../data/aml';

// 4.1 – Integrare API AML (mock)
// primește nume + CNP și "caută" în niște liste negre mock
function callMockAmlProvider(input: {
  fullName: string;
  cnp: string;
}): {
  isPep: boolean;
  hasSanctions: boolean;
  riskScore: number;
  matchedLists: string[];
} {
  const { fullName, cnp } = input;
  const lowerName = fullName.toLowerCase();

  // liste mock – pentru test pui client cu aceste nume/CNP
  const pepCnps = ['1111111111111', '2222222222222'];
  const sanctionsCnps = ['9999999999999'];

  const isPep =
    pepCnps.includes(cnp) || lowerName.includes('presedinte') || lowerName.includes('senator');

  const hasSanctions =
    sanctionsCnps.includes(cnp) || lowerName.includes('sanctionat');

  let riskScore = 10;
  if (isPep) riskScore += 40;
  if (hasSanctions) riskScore += 70;
  if (riskScore > 100) riskScore = 100;

  const matchedLists: string[] = [];
  if (isPep) matchedLists.push('PEP_LIST');
  if (hasSanctions) matchedLists.push('SANCTIONS_LIST');

  return {
    isPep,
    hasSanctions,
    riskScore,
    matchedLists,
  };
}

function mapRiskLevel(score: number): AmlRiskLevel {
  if (score >= 90) return 'CRITICAL';
  if (score >= 75) return 'HIGH';
  if (score >= 50) return 'MEDIUM';
  return 'LOW';
}

// 4.2 – Endpoint screening manual
// POST /aml/screen
export const manualScreeningHandler = (req: Request, res: Response) => {
  const { clientId, reason } = req.body;

  if (!clientId) {
    return res.status(400).json({ error: 'Missing clientId' });
  }

  const id = Number(clientId);
  const client = findClientById(id);

  if (!client) {
    return res.status(404).json({ error: 'Client not found' });
  }

  const fullName = `${client.firstName} ${client.lastName}`;
  const cnp = client.cnp;

  // 4.1 – apel mock API AML
  const providerResponse = callMockAmlProvider({ fullName, cnp });

  const riskLevel = mapRiskLevel(providerResponse.riskScore);

  // salvăm rezultatul screening-ului
  const result = saveAmlResult({
    clientId: id,
    fullName,
    cnp,
    isPep: providerResponse.isPep,
    hasSanctions: providerResponse.hasSanctions,
    riskScore: providerResponse.riskScore,
    riskLevel,
    matchedLists: providerResponse.matchedLists,
  });

  // 4.4 – Generare alertă pentru risc (în caz de match)
  let alert = null;
  if (
    providerResponse.isPep ||
    providerResponse.hasSanctions ||
    riskLevel === 'HIGH' ||
    riskLevel === 'CRITICAL'
  ) {
    alert = saveAmlAlert({
      resultId: result.id,
      clientId: id,
      riskLevel,
      reason: reason || 'Automatic alert from AML screening',
    });

    console.log('[AUDIT] AML_ALERT_CREATED', alert);
  }

  // audit general pentru screening
  console.log('[AUDIT] AML_SCREENING', {
    amlResultId: result.id,
    clientId: result.clientId,
    riskScore: result.riskScore,
    riskLevel: result.riskLevel,
    isPep: result.isPep,
    hasSanctions: result.hasSanctions,
  });

  return res.status(201).json({
    result,
    alert,
  });
};

// status AML pentru un client – ultimul screening
// GET /aml/client/:clientId
export const getAmlStatusForClientHandler = (req: Request, res: Response) => {
  const clientId = Number(req.params.clientId);

  if (isNaN(clientId)) {
    return res.status(400).json({ error: 'Invalid clientId' });
  }

  const result = getLatestAmlForClient(clientId);
  if (!result) {
    return res
      .status(404)
      .json({ error: 'No AML screening found for this client' });
  }

  return res.json(result);
};

// 4.5 – Dashboard operator AML – listă de alerte
// GET /aml/alerts
export const getAmlAlertsHandler = (req: Request, res: Response) => {
  const alerts = getAllAlerts();

  // atașăm și rezultatul AML la fiecare alertă (ca să aibă frontend-ul info)
  const enriched = alerts.map(alert => ({
    ...alert,
    result: getAmlResultById(alert.resultId),
  }));

  return res.json({
    count: enriched.length,
    items: enriched,
  });
};
