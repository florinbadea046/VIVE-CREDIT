import { Routes, Route, Navigate } from "react-router-dom";

import OnboardingPage from "@modules/onboarding/pages/OnboardingPage";
import SuccessPage from "@modules/onboarding/pages/SuccessPage";
import DashboardPage from "@modules/dashboard/DashboardPage";

import { RiskDashboard } from "@modules/operator-dashboard/risk";
import { SalesDashboard, ApplicationDetail } from "@modules/operator-dashboard/sales";

export default function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<div />} />

      {/* ONBOARDING */}
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/onboarding/success" element={<SuccessPage />} />

      {/* DASHBOARD */}
      <Route path="/dashboard" element={<DashboardPage />} />

      {/* SALES */}
      <Route path="/sales" element={<SalesDashboard />} />
      <Route path="/sales/:id" element={<ApplicationDetail />} />

      {/* RISK */}
      <Route path="/risk" element={<RiskDashboard />} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}
