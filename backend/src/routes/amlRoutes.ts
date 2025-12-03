// src/routes/amlRoutes.ts

import { Router } from 'express';
import {
  manualScreeningHandler,
  getAmlStatusForClientHandler,
  getAmlAlertsHandler,
} from '../controllers/amlController';

const router = Router();

// 4.2 – screening manual
router.post('/screen', manualScreeningHandler);

// status AML pentru un client
router.get('/client/:clientId', getAmlStatusForClientHandler);

// 4.5 – dashboard AML: lista de alerte
router.get('/alerts', getAmlAlertsHandler);

export default router;
