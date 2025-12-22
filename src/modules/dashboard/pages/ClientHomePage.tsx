import { useEffect, useState } from "react";
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
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const shouldShow =
      localStorage.getItem("showRegistrationSuccess") === "true";

    if (!shouldShow) return;

    setShowSuccess(true);

    localStorage.removeItem("showRegistrationSuccess");

    const timer = setTimeout(() => {
      setShowSuccess(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <WelcomeCard name="Ion" />

        {showSuccess && (
          <div
            className="flex items-center gap-2
                       rounded-lg border border-green-200 dark:border-green-800
                       bg-green-50 dark:bg-[#133015]
                       px-4 py-3"
          >
            <span className="text-green-700 dark:text-green-400 font-medium">
              Înregistrare finalizată
            </span>
            <span className="text-sm text-green-600 dark:text-green-300">
              • Contul tău a fost creat cu succes
            </span>
          </div>
        )}

        <ApplicationsCard applications={dashboardApplicationsMock} />
        <CreditsCard credits={dashboardCreditsMock} />
        <QuickActions />
      </div>
    </DashboardLayout>
  );
}
