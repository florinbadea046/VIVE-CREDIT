import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import OnboardingPage from "@/modules/onboarding/pages/OnboardingPage";
import SuccessPage from "@/modules/onboarding/pages/SuccessPage";
import DashboardPage from "@/modules/dashboard/pages/DashboardPage";
import LoanPage from "@/modules/dashboard/pages/LoanPage";
import PaymentsPage from "@/modules/dashboard/pages/PaymentsPage";
import DocumentsPage from "@/modules/dashboard/pages/DocumentsPage";
import { AuditDashboard } from "@/modules/admin-audit/AuditDashboard";
import OperatorDashboardLayout from "@/modules/operator/OperatorDashboardLayout";
import OperatorDashboardPage from "@/modules/operator/pages/OperatorDashboardPage";
import RiskPage from "@/modules/operator/pages/RiskPage";
import PolicyEnginePage from "@/modules/policy-engine/PolicyEnginePage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Root */}
      <Route path="/" element={<div />} />

      {/* Onboarding */}
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/onboarding/success" element={<SuccessPage />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/loan" element={<LoanPage />} />
      <Route path="/dashboard/payments" element={<PaymentsPage />} />
      <Route path="/dashboard/documents" element={<DocumentsPage />} />

      {/* OPERATOR DASHBOARD SALES/RISK/COLLECTIONS */}
      <Route path="/operator" element={<OperatorDashboardLayout />}>
        <Route index element={<OperatorDashboardPage />} />
        <Route path="risk" element={<RiskPage />} />
        {/* <Route path="sales" element={<SalesPage />} /> */}
        {/* <Route path="collection" element={<CollectionPage />} /> */}
      </Route>

      {/* Policy Engine */}
      <Route path="/policy-engine" element={<PolicyEnginePage />} />

      {/* Audit Dashboard */}
      <Route path="/audit" element={<AuditDashboard />} />
    </Routes>
  );
};

export default AppRoutes;
