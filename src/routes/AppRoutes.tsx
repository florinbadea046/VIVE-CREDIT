import { Route, Routes, Navigate } from "react-router-dom";

/* Public pages */
import LandingPage from "@/modules/landing/pages/LandingPage";
import ProductsPage from "@/modules/static/pages/ProductsPage";
import AboutPage from "@/modules/static/pages/AboutPage";
import ContactPage from "@/modules/static/pages/ContactPage";
import TermsPage from "@/modules/static/pages/TermsPage";
import PrivacyPage from "@/modules/static/pages/PrivacyPage";
import AnpcPage from "@/modules/static/pages/AnpcPage";
import CookiePolicyPage from "@/modules/static/pages/CookiePolicyPage";

/* Layout Public */
import PublicLayout from "@/modules/landing/layout/PublicLayout";

/* Auth */
import LoginPage from "@/modules/auth/pages/LoginPage";
import RegisterPage from "@/modules/auth/pages/RegisterPage";

import ClientLoginPage from "@/modules/auth/pages/ClientLoginPage";
import ClientRegisterPage from "@/modules/auth/pages/ClientRegisterPage";

import OperatorLoginPage from "@/modules/auth/pages/OperatorLoginPage";

/* Onboarding CLIENT */
import OnboardingPage from "@/modules/onboarding/pages/OnboardingPage";
import SuccessPage from "@/modules/onboarding/pages/SuccessPage";
import OnboardingWizardPage from "@/modules/auth/pages/OnboardingWizardPage";
import ProfileSuccessPage from "@/modules/auth/pages/ProfileSuccessPage";
import OnboardingGuard from "@/components/OnboardingGuard";

/* Dashboard Client */
import ClientHomePage from "@/modules/dashboard/pages/ClientHomePage";
import DashboardPage from "@/modules/dashboard/pages/DashboardPage";
import HelpPage from "@/modules/dashboard/pages/HelpPage";
import UploadDocumentPage from "@/modules/dashboard/pages/UploadDocumentPage";
import DocumentsPage from "@/modules/dashboard/pages/DocumentsPage";
import LoanPage from "@/modules/dashboard/pages/LoanPage";
import PaymentsPage from "@/modules/dashboard/pages/PaymentsPage";
import LoanForm from "@/pages/loan/LoanForm";

/* Operator Dashboard */
import OperatorDashboardLayout from "@/modules/operator-dashboard/layout/OperatorDashboardLayout";
import OperatorDashboardPage from "@/modules/operator-dashboard/pages/OperatorDasboardPage";
import ApplicationsPage from "@/modules/operator-dashboard/pages/ApplicationsPage";
import RiskPage from "@/modules/operator-dashboard/pages/RiskPage";
import SalesDashboard from "@/modules/operator-dashboard/submodules/sales/SalesDashboard";
import ApplicationDetail from "@/modules/operator-dashboard/submodules/sales/ApplicationDetail";
import ProductSettingsPage from "@/modules/admin-products/pages/ProductSettingsPage";

/* Engines */
import { PolicyEnginePage } from "@/modules/scoring";
import DecisionPage from "@/modules/decision-engine/Pages/DecisionPage";
import { ScorecardEngine } from "@/modules/scoring/pages/ScorecardEngine";
import { AuditDashboard } from "@/modules/admin-audit/AuditDashboard";

/* Protected route */
import ProtectedRoute from "@/components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/anpc" element={<AnpcPage />} />
        <Route path="/cookies" element={<CookiePolicyPage />} />
      </Route>

      {/* AUTH ENTRY */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* CLIENT AUTH */}
      <Route path="/login/client" element={<ClientLoginPage />} />
      <Route path="/register/client" element={<ClientRegisterPage />} />

      {/* OPERATOR AUTH */}
      <Route path="/login/operator" element={<OperatorLoginPage />} />

      {/* CLIENT ONBOARDING */}
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/onboarding/success" element={<SuccessPage />} />

      <Route
        path="/onboarding/profile"
        element={
          <OnboardingGuard>
            <OnboardingWizardPage />
          </OnboardingGuard>
        }
      />

      <Route
        path="/onboarding/profile/success"
        element={
          <OnboardingGuard>
            <ProfileSuccessPage />
          </OnboardingGuard>
        }
      />

      {/* CLIENT DASHBOARD */}
      <Route
        path="/dashboard/home"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <ClientHomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/help"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <HelpPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/loan"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <LoanPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/payments"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <PaymentsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/documents"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <DocumentsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/documents/upload"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <UploadDocumentPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/loan-form"
        element={
          <ProtectedRoute allowedRoles={["client"]}>
            <LoanForm />
          </ProtectedRoute>
        }
      />

      {/* OPERATOR DASHBOARD */}
      <Route
        path="/operator"
        element={
          <ProtectedRoute allowedRoles={["operator"]}>
            <OperatorDashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<OperatorDashboardPage />} />
        <Route path="risk" element={<RiskPage />} />
        <Route path="sales" element={<SalesDashboard />} />
        <Route path="sales/:id" element={<ApplicationDetail />} />
        <Route path="applications" element={<ApplicationsPage />} />
        <Route path="products-settings" element={<ProductSettingsPage />} />
        <Route path="policy-engine" element={<PolicyEnginePage />} />
        <Route path="decision-engine" element={<DecisionPage />} />
        <Route path="scorecard" element={<ScorecardEngine />} />
      </Route>

      {/* ENGINES */}
      <Route path="/policy-engine" element={<PolicyEnginePage />} />
      <Route path="/decision-engine" element={<DecisionPage />} />
      <Route path="/scorecard" element={<ScorecardEngine />} />

      <Route
        path="/audit"
        element={
          <ProtectedRoute allowedRoles={["operator"]}>
            <AuditDashboard />
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
