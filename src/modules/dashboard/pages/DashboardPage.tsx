import DashboardLayout from "../layout/DashboardLayout";
import { dashboardMock } from "../mock/dashboardMock";

import ApplicationStatusCard from "../components/dashboard/ApplicationStatusCard";
import LoanDetailsCard from "../components/loan/LoanDetailsCard";
import DocumentsCard from "../components/dashboard/DocumentsCard";
import PaymentHistoryCard from "../components/payments/PaymentHistoryCard";
import VerificationStatusCard from "../components/VerificationStatusCard";

export default function DashboardPage() {
  const data = dashboardMock;

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
      </div>
    </DashboardLayout>
  );
}
