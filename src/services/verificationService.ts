import type { TimelineStep } from "../modules/dashboard/components/VerificationTimeline";

export interface VerificationStatusResponse {
  clientId: number;
  steps: TimelineStep[];
}

export const getVerificationStatus = async (
  clientId: number
): Promise<VerificationStatusResponse> => {
  try {
    // Încearcă endpoint-ul central de verificare
    const response = await fetch(
      `http://localhost:3000/verification/${clientId}`
    );

    if (response.ok) {
      return await response.json();
    }

    // Fallback: construiește din endpoint-uri separate KYC și AML
    const [kycResponse, amlResponse] = await Promise.allSettled([
      fetch(`http://localhost:3000/kyc/${clientId}`),
      fetch(`http://localhost:3000/aml/client/${clientId}`),
    ]);

    const steps: TimelineStep[] = [];
    let kycData = null;
    let amlData = null;
    let kycStatus = null;
    let amlStatus = null;

    if (kycResponse.status === "fulfilled" && kycResponse.value.ok) {
      kycData = await kycResponse.value.json();
      kycStatus = kycData.status;
    }
    if (amlResponse.status === "fulfilled" && amlResponse.value.ok) {
      amlData = await amlResponse.value.json();
      amlStatus =
        amlData.riskLevel === "LOW" || amlData.riskLevel === "MEDIUM"
          ? "APPROVED"
          : "REJECTED";
    }

    // Step 1: Trimis KYC
    let step1Status: TimelineStep["status"] = "pending";
    let step2Status: TimelineStep["status"] = "pending";
    const step2Title =
      kycStatus === "REJECTED" ? "Respins KYC" : "Verificat KYC";
    if (kycData) {
      if (clientId === 1 && kycStatus === "PENDING") {
        // Pentru client 1: Trimis KYC = completed, Verificat KYC = current
        step1Status = "completed";
        step2Status = "current";
      } else if (kycStatus === "PENDING") {
        step1Status = "current";
        step2Status = "pending";
      } else if (kycStatus === "APPROVED") {
        step1Status = "completed";
        step2Status = "completed";
      } else if (kycStatus === "REJECTED") {
        step1Status = "completed";
        step2Status = "rejected";
      }
    }
    steps.push({
      id: 1,
      title: "Trimis KYC",
      status: step1Status,
      date: kycData ? kycData.createdAt : undefined,
      badge: "KYC",
    });

    // Step 2: Verificat KYC
    steps.push({
      id: 2,
      title: step2Title,
      status: step2Status,
      date: kycStatus ? kycData.createdAt : undefined,
      badge: "KYC",
    });

    // Step 3: Trimis AML
    steps.push({
      id: 3,
      title: "Trimis AML",
      status: amlData ? "completed" : "pending",
      date: amlData ? amlData.createdAt : undefined,
      badge: "AML",
    });

    // Step 4: Verificat AML
    steps.push({
      id: 4,
      title: amlStatus === "REJECTED" ? "Respins AML" : "Verificat AML",
      status:
        amlStatus === "APPROVED"
          ? "completed"
          : amlStatus === "REJECTED"
          ? "rejected"
          : "pending",
      date: amlStatus ? amlData.createdAt : undefined,
      badge: "AML",
    });

    return { clientId, steps };
  } catch (error) {
    console.error("Error fetching verification status:", error);
    throw error;
  }
};
