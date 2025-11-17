import DashboardLayout from "../layout/DashboardLayout";
import { dashboardMock } from "../mock/dashboardMock";

import ApplicationStatusCard from "../components/ApplicationStatusCard";
import LoanDetailsCard from "../components/LoanDetailsCard";
import DocumentsCard from "../components/DocumentsCard";
import PaymentHistoryCard from "../components/PaymentHistoryCard";

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
      </div>
    </DashboardLayout>
  );
}
