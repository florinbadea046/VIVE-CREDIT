import { useEffect, useState } from "react";
import VerificationTimeline from "@/modules/dashboard/components/VerificationTimeline";
import type { TimelineStep } from "@/modules/dashboard/components/VerificationTimeline";
import DashboardLayout from "@/modules/dashboard/layout/DashboardLayout";
import { getVerificationStatus } from "@/services/verificationService";

export default function VerificationStatusPage() {
  const [clientId, setClientId] = useState(1);
  const [steps, setSteps] = useState<TimelineStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getVerificationStatus(clientId)
      .then((data) => {
        setSteps(data.steps);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Nu s-au putut încărca datele de verificare");
        setLoading(false);
      });
  }, [clientId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-xl mx-auto p-6">
          <h2 className="text-xl font-semibold mb-4">Tracker Status KYC/AML</h2>
          <p className="text-gray-500">Se încarcă...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="max-w-xl mx-auto p-6">
          <h2 className="text-xl font-semibold mb-4">Tracker Status KYC/AML</h2>
          <p className="text-red-500">{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4">Tracker Status KYC/AML</h2>

        {/* Selector pentru diferite scenarii */}
        <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <label className="block text-sm font-medium mb-2">
            Schimbă scenariul de test:
          </label>
          <select
            value={clientId}
            onChange={(e) => setClientId(Number(e.target.value))}
            className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700"
          >
            <option value={1}>
              Client 1 - Doar trimis KYC, asteapta verificare KYC
            </option>
            <option value={2}>Client 2 - KYC APPROVED, așteaptă AML</option>
            <option value={3}>Client 3 - KYC + AML completat</option>
            <option value={4}>Client 4 - KYC REJECTED</option>
            <option value={5}>
              Client 5 - KYC APPROVED, AML REJECTED (HIGH risk)
            </option>
          </select>
        </div>

        <VerificationTimeline steps={steps} />
      </div>
    </DashboardLayout>
  );
}
