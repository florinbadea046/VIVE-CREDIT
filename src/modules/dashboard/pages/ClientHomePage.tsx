import DashboardLayout from "../layout/DashboardLayout";
import WelcomeCard from "../components/home/WelcomeCard";
import ApplicationsCard from "../components/home/ApplicationsCard";
import CreditsCard from "../components/home/CreditsCard";
import QuickActions from "../components/home/QuickActions";

import {
  dashboardApplicationsMock,
  dashboardCreditsMock,
} from "../mock/dashboardMock";

export default function ClientHomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <WelcomeCard name="Ion" />

        <ApplicationsCard applications={dashboardApplicationsMock} />

        <CreditsCard credits={dashboardCreditsMock} />

        <QuickActions />
      </div>
    </DashboardLayout>
  );
}
