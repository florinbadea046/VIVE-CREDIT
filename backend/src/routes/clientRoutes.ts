import { Router } from 'express';
import {
  createClientHandler,
  getClientHandler,
  updateClientHandler
} from '../controllers/clientController';

const router = Router();

router.post('/', createClientHandler);     // POST /client
router.get('/:id', getClientHandler);      // GET /client/1
router.put('/:id', updateClientHandler);   // PUT /client/1

export default router;
