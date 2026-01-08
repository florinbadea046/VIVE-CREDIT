import { Request, Response } from "express";
import { findClientById } from "../data/clients";
import { getLatestKycForClient } from "../data/kycResults";
import { getLatestAmlForClient } from "../data/aml";

export interface VerificationStep {
  id: number;
  title: string;
  status: "completed" | "current" | "pending" | "rejected";
  date?: string;
  badge: "KYC" | "AML";
}

export interface VerificationStatusResponse {
  clientId: number;
  steps: VerificationStep[];
}

// GET /verification/:clientId
export const getVerificationStatusHandler = (req: Request, res: Response) => {
  const clientId = Number(req.params.clientId);

  if (isNaN(clientId)) {
    return res.status(400).json({ error: "Invalid clientId" });
  }

  const client = findClientById(clientId);
  if (!client) {
    return res.status(404).json({ error: "Client not found" });
  }

  const kycResult = getLatestKycForClient(clientId);
  const amlResult = getLatestAmlForClient(clientId);

  const steps: VerificationStep[] = [];

  // Step 1: KYC Trimis
  steps.push({
    id: 1,
    title: "Trimis",
    status: kycResult ? "completed" : "current",
    date: kycResult?.createdAt,
    badge: "KYC",
  });

  // Step 2: KYC În verificare / Verificat
  if (kycResult) {
    if (kycResult.status === "APPROVED") {
      steps.push({
        id: 2,
        title: "Verificat",
        status: "completed",
        date: kycResult.createdAt,
        badge: "KYC",
      });
    } else {
      steps.push({
        id: 2,
        title: "Respins",
        status: "rejected",
        date: kycResult.createdAt,
        badge: "KYC",
      });
      // Dacă KYC e respins, nu mai continuăm cu AML
      return res.json({ clientId, steps });
    }
  } else {
    steps.push({
      id: 2,
      title: "În verificare",
      status: "pending",
      badge: "KYC",
    });
  }

  // Step 3: AML Trimis
  if (kycResult?.status === "APPROVED") {
    steps.push({
      id: 3,
      title: "Trimis AML",
      status: amlResult ? "completed" : "current",
      date: amlResult?.createdAt,
      badge: "AML",
    });

    // Step 4: AML Verificat / Respins
    if (amlResult) {
      const isApproved =
        amlResult.riskLevel === "LOW" || amlResult.riskLevel === "MEDIUM";
      steps.push({
        id: 4,
        title: isApproved ? "Verificat" : "Respins",
        status: isApproved ? "completed" : "rejected",
        date: amlResult.createdAt,
        badge: "AML",
      });
    } else {
      steps.push({
        id: 4,
        title: "În verificare AML",
        status: "pending",
        badge: "AML",
      });
    }
  } else {
    // Dacă KYC nu e APPROVED, AML steps sunt pending
    steps.push({
      id: 3,
      title: "Trimis AML",
      status: "pending",
      badge: "AML",
    });
    steps.push({
      id: 4,
      title: "Verificat AML",
      status: "pending",
      badge: "AML",
    });
  }

  return res.json({ clientId, steps });
};
