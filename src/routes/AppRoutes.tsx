import { Routes, Route, Navigate } from "react-router-dom";

import OnboardingPage from "@/modules/onboarding/pages/OnboardingPage";
import SuccessPage from "@/modules/onboarding/pages/SuccessPage";
import DashboardPage from "@/modules/dashboard/DashboardPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<div />} />

      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/onboarding/success" element={<SuccessPage />} />

      <Route path="/dashboard" element={<DashboardPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
