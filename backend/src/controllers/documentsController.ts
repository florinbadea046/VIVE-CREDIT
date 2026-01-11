import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../../public/documents");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx|xls|xlsx|txt/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Format de fișier neacceptat"));
    }
  },
});

// simulare baza de date intr-un array
interface DocumentRecord {
  id: string;
  applicationId: string;
  documentType: "idCard" | "passport" | "incomeProof" | "other";
  fileName: string;
  originalName: string;
  filePath: string;
  fileSize: number;
  uploadedAt: Date;
  malwareScan?: string;
  signedUrl: string;
}

const documentStore: DocumentRecord[] = [];
const allowedDocumentTypes = ["idCard", "passport", "incomeProof", "other"];

export const uploadDocuments = [
  upload.array("documents", 10),
  async (req: Request, res: Response) => {
    try {
      const { applicationId, documentType } = req.body;
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Nu au fost încărcate fișiere",
        });
      }

      if (!applicationId) {
        return res.status(400).json({
          success: false,
          message: "applicationId este obligatoriu",
        });
      }

      // Validare tip document
      if (!documentType || !allowedDocumentTypes.includes(documentType)) {
        return res.status(400).json({
          success: false,
          message:
            "Tipul de document nu este valid. Tipuri acceptate: idCard, passport, incomeProof.",
        });
      }

      const uploadedDocuments: DocumentRecord[] = [];

      for (const file of files) {
        const malwareScanResult = "clean"; // <<< Simulare scanare virusi
        const expires = Date.now() + 5 * 60 * 1000; // 5 minute expirare
        const token = Buffer.from(`${file.filename}:${expires}`).toString(
          "base64"
        );

        const signedUrl = `/documents/${file.filename}?token=${token}&expires=${expires}`;
        const documentRecord: DocumentRecord = {
          id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          applicationId,
          documentType,
          fileName: file.filename,
          originalName: file.originalname,
          filePath: file.path,
          fileSize: file.size,
          uploadedAt: new Date(),
          signedUrl,
        };

        documentStore.push(documentRecord);
        uploadedDocuments.push({
          ...documentRecord,
          malwareScan: malwareScanResult,
          signedUrl,
        });
      }

      res.status(200).json({
        success: true,
        message: "Documentele au fost încărcate cu succes",
        data: {
          documents: uploadedDocuments.map((doc) => ({
            id: doc.id,
            documentType: doc.documentType,
            originalName: doc.originalName,
            fileName: doc.fileName,
            fileSize: doc.fileSize,
            uploadedAt: doc.uploadedAt,
            malwareScan: doc.malwareScan,
            signedUrl: doc.signedUrl,
          })),
        },
      });
    } catch (error) {
      console.error("Eroare la încărcarea documentelor:", error);
      res.status(500).json({
        success: false,
        message: "Eroare internă a serverului",
      });
    }
  },
];

export const getDocumentsByApplication = async (
  req: Request,
  res: Response
) => {
  try {
    const { applicationId } = req.params;

    const documents = documentStore.filter(
      (doc) => doc.applicationId === applicationId
    );

    res.status(200).json({
      success: true,
      data: {
        documents: documents.map((doc) => ({
          id: doc.id,
          documentType: doc.documentType,
          originalName: doc.originalName,
          fileSize: doc.fileSize,
          fileName: doc.fileName,
          uploadedAt: doc.uploadedAt,
        })),
      },
    });
  } catch (error) {
    console.error("Eroare la preluarea documentelor:", error);
    res.status(500).json({
      success: false,
      message: "Eroare internă a serverului",
    });
  }
};
