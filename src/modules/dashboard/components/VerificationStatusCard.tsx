import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, UserCheck, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getVerificationStatus } from "@/services/verificationService";

interface VerificationSummary {
  kyc: "În așteptare" | "Aprobat" | "Respins" | "În verificare";
  aml: "În așteptare" | "Aprobat" | "Respins" | "În verificare";
  progress: number;
  lastStep: string;
}

interface VerificationStatusCardProps {
  clientId: number;
}

export default function VerificationStatusCard({
  clientId,
}: VerificationStatusCardProps) {
  const [summary, setSummary] = useState<VerificationSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return; // Nu face fetch dacă id-ul nu e valid

    const fetchStatus = async () => {
      try {
        const response = await getVerificationStatus(clientId);
        const { steps } = response;

        if (!steps.length) {
          setSummary(null);
          setLoading(false);
          return;
        }

        // KYC: pași 1-2
        const kycSteps = steps.filter((s) => s.id <= 2);
        const kycCompleted = kycSteps.filter(
          (s) => s.status === "completed"
        ).length;
        const kycRejected = kycSteps.some((s) => s.status === "rejected");

        let kycStatus: VerificationSummary["kyc"] = "În așteptare";
        if (kycRejected) {
          kycStatus = "Respins";
        } else if (kycCompleted === 2) {
          kycStatus = "Aprobat";
        } else if (
          kycCompleted > 0 ||
          kycSteps.some((s) => s.status === "current")
        ) {
          kycStatus = "În verificare";
        }

        // AML: pași 3-4
        const amlSteps = steps.filter((s) => s.id >= 3);
        const amlCompleted = amlSteps.filter(
          (s) => s.status === "completed"
        ).length;
        const amlRejected = amlSteps.some((s) => s.status === "rejected");

        let amlStatus: VerificationSummary["aml"] = "În așteptare";
        if (amlRejected) {
          amlStatus = "Respins";
        } else if (amlCompleted === 2) {
          amlStatus = "Aprobat";
        } else if (
          amlCompleted > 0 ||
          amlSteps.some((s) => s.status === "current")
        ) {
          amlStatus = "În verificare";
        }

        // Progress și last step
        const totalCompleted = steps.filter(
          (s) => s.status === "completed"
        ).length;
        // Doar pașii "completed" contează la progres (fiecare pas = 25%)
        const progress = (totalCompleted / steps.length) * 100;

        // Ultimul pas finalizat (completed) SAU pasul curent dacă nu există pași completați
        const completedSteps = steps.filter((s) => s.status === "completed");
        const lastCompletedStep =
          completedSteps.length > 0
            ? completedSteps[completedSteps.length - 1]
            : null;

        const currentStep = steps.find((s) => s.status === "current");

        let lastStep: string;
        if (lastCompletedStep) {
          lastStep = `${lastCompletedStep.title} (${lastCompletedStep.badge})`;
        } else if (currentStep) {
          lastStep = `În verificare: ${currentStep.title} (${currentStep.badge})`;
        } else {
          lastStep = "Niciun pas început";
        }

        setSummary({
          kyc: kycStatus,
          aml: amlStatus,
          progress,
          lastStep,
        });
      } catch (error) {
        console.error("Error fetching verification status:", error);
        setSummary(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprobat":
        return "text-green-600 dark:text-green-400";
      case "Respins":
        return "text-red-600 dark:text-red-400";
      case "În verificare":
        return "text-orange-600 dark:text-orange-400";
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-blue-700 dark:text-white tracking-tight">
            Status Verificare
          </h2>
        </div>

        <Link
          to="/dashboard/verification"
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition"
        >
          Vezi detalii
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-slate-500">
          <Clock className="w-4 h-4 animate-spin" />
          <span className="text-sm">Se încarcă...</span>
        </div>
      ) : !summary ? (
        <div className="text-sm text-slate-500 dark:text-slate-400">
          Nu există verificări încă
        </div>
      ) : (
        <div className="space-y-3">
          {/* Rânduri status */}
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
              <UserCheck className="w-4 h-4 text-gray-500" /> KYC:
            </span>
            {summary.kyc === "În verificare" ? (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-600">
                În verificare
              </span>
            ) : summary.kyc === "În așteptare" ? (
              <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                În așteptare
              </span>
            ) : (
              <span className={`font-semibold ${getStatusColor(summary.kyc)}`}>
                {summary.kyc}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
              <Search className="w-4 h-4 text-gray-500" /> AML:
            </span>
            {summary.aml === "În verificare" ? (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-600">
                În verificare
              </span>
            ) : summary.aml === "În așteptare" ? (
              <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                În așteptare
              </span>
            ) : (
              <span className={`font-semibold ${getStatusColor(summary.aml)}`}>
                {summary.aml}
              </span>
            )}
          </div>

          {/* Progress bar */}
          <div className="pt-2 bg-blue-50 border border-blue-100 rounded-lg p-3 dark:bg-[#2A3B55A6] dark:border-white/10">
            <div className="flex items-center justify-between text-xs text-blue-700 dark:text-gray-300 mb-2">
              <span>Ultimul pas finalizat: {summary.lastStep}</span>
              <span className="font-semibold">
                {Math.round(summary.progress)}%
              </span>
            </div>
            <div className="w-full bg-blue-100 dark:bg-gray-700 rounded-full h-2.5 border border-blue-200 dark:border-white/20">
              <div
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${summary.progress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
