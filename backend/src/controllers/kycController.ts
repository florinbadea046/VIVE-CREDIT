import { Request, Response } from 'express';
import { findClientById } from '../data/clients';
import { saveKycResult, getLatestKycForClient } from '../data/kycResults';

// 3.2 – mock provider KYC pentru dev/test
function callMockKycProvider(input: {
  clientId: number;
  documentType: string;
}): { score: number; liveness_result: 'PASSED' | 'FAILED' } {
  // logic simplă: clienții cu id par au scor mai bun
  const baseScore = input.clientId % 2 === 0 ? 85 : 55;
  const score = baseScore;
  const liveness_result: 'PASSED' | 'FAILED' =
    score >= 60 ? 'PASSED' : 'FAILED';

  return { score, liveness_result };
}

// 3.1 – Endpoint pentru trimitere la provider KYC
// POST /kyc/verify
export const startKycVerificationHandler = (req: Request, res: Response) => {
  const { clientId, documentType } = req.body;

  if (!clientId || !documentType) {
    return res
      .status(400)
      .json({ error: 'Missing clientId or documentType' });
  }

  const id = Number(clientId);
  const client = findClientById(id);
  if (!client) {
    return res.status(404).json({ error: 'Client not found' });
  }

  // apelăm providerul mock (3.2)
  const providerResponse = callMockKycProvider({ clientId: id, documentType });

  // 3.3 – interpretăm răspunsul (score + liveness)
  const { score, liveness_result } = providerResponse;
  const passedScore = score >= 70;
  const passedLiveness = liveness_result === 'PASSED';
  const status = passedScore && passedLiveness ? 'APPROVED' : 'REJECTED';

  // 3.4 – salvăm în “DB”
  const saved = saveKycResult({
    clientId: id,
    documentType,
    score,
    livenessResult: liveness_result,
    status,
  });

  // 3.5 – Log + audit
  console.log('[AUDIT] KYC_VERIFICATION', {
    kycId: saved.id,
    clientId: saved.clientId,
    documentType: saved.documentType,
    score: saved.score,
    livenessResult: saved.livenessResult,
    status: saved.status,
    createdAt: saved.createdAt,
  });

  return res.status(201).json(saved);
};

// (opțional) – GET /kyc/:clientId ca să vezi ultimul rezultat
export const getKycStatusForClientHandler = (req: Request, res: Response) => {
  const clientId = Number(req.params.clientId);
  if (isNaN(clientId)) {
    return res.status(400).json({ error: 'Invalid clientId' });
  }

  const result = getLatestKycForClient(clientId);
  if (!result) {
    return res.status(404).json({ error: 'No KYC found for this client' });
  }

  return res.json(result);
};
