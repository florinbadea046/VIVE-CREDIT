import KycStatusPage from '@/pages/loan/VerificationStatusPage';
import { Navigate, Route, Routes } from 'react-router-dom';

/* Public pages */
import LandingPage from '@/modules/landing/pages/LandingPage';
import AboutPage from '@/modules/static/pages/AboutPage';
import AnpcPage from '@/modules/static/pages/AnpcPage';
import ContactPage from '@/modules/static/pages/ContactPage';
import CookiePolicyPage from '@/modules/static/pages/CookiePolicyPage';
import PrivacyPage from '@/modules/static/pages/PrivacyPage';
import ProductsPage from '@/modules/static/pages/ProductsPage';
import TermsPage from '@/modules/static/pages/TermsPage';

/* Layout Public */
import PublicLayout from '@/modules/landing/layout/PublicLayout';

/* Auth */
import LoginPage from '@/modules/auth/pages/LoginPage';
import RegisterPage from '@/modules/auth/pages/RegisterPage';

import ClientLoginPage from '@/modules/auth/pages/ClientLoginPage';
import ClientRegisterPage from '@/modules/auth/pages/ClientRegisterPage';
import ForgotPasswordPage from '@/modules/auth/pages/ForgotPasswordPage';

import OperatorLoginPage from '@/modules/auth/pages/OperatorLoginPage';

/* Onboarding CLIENT */
import OnboardingPage from '@/modules/onboarding/pages/OnboardingPage';
import SuccessPage from '@/modules/onboarding/pages/SuccessPage';

/* Dashboard Client */
import ClientHomePage from '@/modules/dashboard/pages/ClientHomePage';
import DashboardPage from '@/modules/dashboard/pages/DashboardPage';
import DocumentsPage from '@/modules/dashboard/pages/DocumentsPage';
import HelpPage from '@/modules/dashboard/pages/HelpPage';
import LoanPage from '@/modules/dashboard/pages/LoanPage';
import PaymentsPage from '@/modules/dashboard/pages/PaymentsPage';
import UploadDocumentPage from '@/modules/dashboard/pages/UploadDocumentPage';
import DecisionResultCard from '@/modules/decision-engine/components/DecisionResultCard';
import LoanForm from '@/pages/loan/LoanForm';

/* Operator Dashboard */
import ProductSettingsPage from '@/modules/admin-products/pages/ProductSettingsPage';
import OperatorDashboardLayout from '@/modules/operator-dashboard/layout/OperatorDashboardLayout';
import ApplicationsPage from '@/modules/operator-dashboard/pages/ApplicationsPage';
import ClientManagementPage from '@/modules/operator-dashboard/pages/ClientManagement';
import OperatorDashboardPage from '@/modules/operator-dashboard/pages/OperatorDashboardPage';
import RiskPage from '@/modules/operator-dashboard/pages/RiskPage';
import ApplicationDetail from '@/modules/operator-dashboard/submodules/sales/ApplicationDetail';
import SalesDashboard from '@/modules/operator-dashboard/submodules/sales/SalesDashboard';
import AuditLog from '@/modules/admin/pages/AuditLog';
import ReportsPage from '@/modules/operator-dashboard/submodules/reports/ReportsPage';
import CollectionsDashboard from '@/modules/operator-dashboard/submodules/collections/components/CollectionsDashboard';

/* Engines */
import { AuditDashboard } from '@/modules/admin-audit/AuditDashboard';
import DecisionPage from '@/modules/decision-engine/Pages/DecisionPage';
import { PolicyEnginePage, ScoringCalculatorPage } from '@/modules/scoring';
import { ScorecardEngine } from '@/modules/scoring/pages/ScorecardEngine';

/* Protected route */
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';
import ProtectedRoute from '@/components/ProtectedRoute';
import AdminHomePage from '@/modules/admin/pages/AdminHomePage';
import UsersPage from '@/modules/admin/pages/UsersPage';
import RequestLoanPage from '@/modules/applications/pages/RequestLoanPage';
import AdminLoginPage from '@/modules/auth/pages/AdminLoginPage';
import { ApplicationsContextProvider } from '@/modules/operator-dashboard/hooks/ApplicationsContext';
import FormScorecardClient from '@/modules/scoring/pages/FormScorecardClient';

const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path='/' element={<LandingPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/terms' element={<TermsPage />} />
        <Route path='/privacy' element={<PrivacyPage />} />
        <Route path='/anpc' element={<AnpcPage />} />
        <Route path='/cookies' element={<CookiePolicyPage />} />
      </Route>

      {/* AUTH ENTRY */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />

      {/* CLIENT AUTH */}
      <Route path='/login/client' element={<ClientLoginPage />} />
      <Route path='/register/client' element={<ClientRegisterPage />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />} />

      {/* OPERATOR AUTH */}
      <Route path='/login/operator' element={<OperatorLoginPage />} />

      {/* ADMIN */}
      <Route path='/login/admin' element={<AdminLoginPage />} />
      <Route
        path='/admin'
        element={
          <ProtectedAdminRoute>
            <AdminHomePage />
          </ProtectedAdminRoute>
        }
      />

      <Route
        path='/admin/users'
        element={
          <ProtectedAdminRoute>
            <UsersPage />
          </ProtectedAdminRoute>
        }
      />

      <Route path='/admin/audit-log' element={<AuditLog />} />

      {/* CLIENT ONBOARDING */}
      <Route
        path='/onboarding'
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <OnboardingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/onboarding/success'
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <SuccessPage />
          </ProtectedRoute>
        }
      />

      {/* CLIENT DASHBOARD */}
      <Route
        path='/dashboard/home'
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <ClientHomePage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/dashboard'
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/dashboard/help'
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <HelpPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/dashboard/loan'
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <LoanPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/dashboard/loan-form'
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <RequestLoanPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/dashboard/payments'
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <PaymentsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/dashboard/documents'
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <DocumentsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/dashboard/documents/upload'
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <UploadDocumentPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/dashboard/verification'
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <KycStatusPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/dashboard/verification-timeline'
        element={
          <ProtectedRoute allowedRoles={['client']}>
            <KycStatusPage />
          </ProtectedRoute>
        }
      />

      <Route
        path='/dashboard/decision-result'
        element={<DecisionResultCard />}
      />

      {/* Scoring */}
      <Route path='/calculator' element={<ScoringCalculatorPage />} />
      <Route path='/form' element={<FormScorecardClient />} />

      {/* OPERATOR DASHBOARD */}
      <Route
        path='/operator'
        element={
          <ProtectedRoute allowedRoles={['operator']}>
            <ApplicationsContextProvider>
              <OperatorDashboardLayout />
            </ApplicationsContextProvider>
          </ProtectedRoute>
        }>
        <Route index element={<OperatorDashboardPage />} />
        <Route path='clients' element={<ClientManagementPage />} />
        <Route path='risk' element={<RiskPage />} />
        <Route path='sales' element={<SalesDashboard />} />
        <Route path='sales/:id' element={<ApplicationDetail />} />
        <Route path='applications' element={<ApplicationsPage />} />
        <Route path='products-settings' element={<ProductSettingsPage />} />
        <Route path='policy-engine' element={<PolicyEnginePage />} />
        <Route path='decision-engine' element={<DecisionPage />} />
        <Route path='scorecard' element={<ScorecardEngine />} />
        <Route path='collections' element={<CollectionsDashboard />} />
        <Route path='audit-log' element={<AuditLog />} />
        <Route path='reports' element={<ReportsPage />} />
      </Route>

      {/* ENGINES */}
      <Route path='/policy-engine' element={<PolicyEnginePage />} />
      <Route path='/decision-engine' element={<DecisionPage />} />
      <Route path='/scorecard' element={<ScorecardEngine />} />

      <Route
        path='/audit'
        element={
          <ProtectedRoute allowedRoles={['operator']}>
            <AuditDashboard />
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};

export default AppRoutes;