import { Router } from 'express';
import { uploadDocuments, getDocumentsByApplication } from '../controllers/documentsController';

const router = Router();

// POST /documents/upload
router.post('/upload', uploadDocuments);

// GET /documents/application/:applicationId
router.get('/application/:applicationId', getDocumentsByApplication);

export default router;