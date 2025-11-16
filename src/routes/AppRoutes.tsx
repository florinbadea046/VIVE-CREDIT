import { Routes, Route } from "react-router-dom";
import RiskDashboard from "@modules/operator-dashboard/risk/RiskDashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/risk" element={<RiskDashboard />} />
    </Routes>
  );
};
export default AppRoutes;
