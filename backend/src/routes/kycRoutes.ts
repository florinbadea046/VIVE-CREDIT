import { Router } from 'express';
import {
  startKycVerificationHandler,
  getKycStatusForClientHandler,
} from '../controllers/kycController';

const router = Router();

// 3.1 – start KYC
router.post('/verify', startKycVerificationHandler);

// (opțional) – status KYC pentru un client
router.get('/:clientId', getKycStatusForClientHandler);

export default router;
