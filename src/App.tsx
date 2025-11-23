import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AdminLayout } from './core/layouts/AdminLayout';
import { ClientLayout } from './core/layouts/ClientLayout';
import { OperatorLayout } from './core/layouts/OperatorLayout';
import { UserRolePermissionTabs } from './modules/admin/components/UserRolePermissionTabs';
import { RiskConfigPage } from './modules/admin/pages/Riskconfig';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<div className="p-6"></div>} />
          <Route path="admin/users" element={<UserRolePermissionTabs />} />
          <Route path="admin/risk-config" element={<RiskConfigPage />} />
        </Route>
        <Route path="/client/*" element={<ClientLayout />} />
        <Route path="/operator/*" element={<OperatorLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
