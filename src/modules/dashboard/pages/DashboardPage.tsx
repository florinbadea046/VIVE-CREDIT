import DashboardLayout from "../layout/DashboardLayout";
import { dashboardMock } from "../mock/dashboardMock";
import { useEffect, useState } from "react";
import ScoringStatusCard from "../components/home/ScoringStatusCard";

import ApplicationStatusCard from "../components/dashboard/ApplicationStatusCard";
import LoanDetailsCard from "../components/loan/LoanDetailsCard";
import DocumentsCard from "../components/dashboard/DocumentsCard";
import PaymentHistoryCard from "../components/payments/PaymentHistoryCard";
import VerificationStatusCard from "../components/VerificationStatusCard";

export default function DashboardPage() {
  const data = dashboardMock;
  const [scoringData, setScoringData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("scoring-final");
    if (saved) {
      setScoringData(JSON.parse(saved));
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ApplicationStatusCard
          status={data.applicationStatus.status}
          applicationId={data.applicationStatus.applicationId}
        />

        <LoanDetailsCard data={data.loanDetails} />

        <DocumentsCard documents={data.documents} />
        <PaymentHistoryCard payments={data.payments} />

        {/* Card status verificare */}
        <VerificationStatusCard clientId={1} />

        {scoringData && (
          <ScoringStatusCard
            status={scoringData.status}
            score={scoringData.score}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
