import { RiskDashboard } from "@modules/operator-dashboard/risk";
import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/risk" element={<RiskDashboard />} />
    </Routes>
  );
};
export default AppRoutes;
