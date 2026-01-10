import { Router } from "express";
import {
  uploadDocuments,
  getDocumentsByApplication,
} from "../controllers/documentsController";
import path from "path";
import fs from "fs";

const router = Router();

// POST /documents/upload
router.post("/upload", uploadDocuments);

// GET /documents/application/:applicationId
router.get("/application/:applicationId", getDocumentsByApplication);

// 2.5 – DOWNLOAD CU URL SEMNAT
// GET /documents/:fileName?token=...&expires=...
router.get("/:fileName", (req, res) => {
  const { fileName } = req.params;
  const { token, expires } = req.query;

  const tokenStr = Array.isArray(token) ? token[0] : token;
  const expiresStr = Array.isArray(expires) ? expires[0] : expires;

  if (!tokenStr || !expiresStr) {
    return res.status(401).json({ error: "Missing token or expires" });
  }

  const exp = Number(expiresStr);
  if (Number.isNaN(exp) || Date.now() > exp) {
    return res.status(401).json({ error: "Signed URL expired" });
  }

  const expectedToken = Buffer.from(`${fileName}:${exp}`).toString("base64");

  if (tokenStr !== expectedToken) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const filePath = path.join(__dirname, "../../../public/documents", fileName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  return res.sendFile(filePath);
});

export default router;
