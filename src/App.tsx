import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Rambursare from "@/components/ui/rambursare";
import * as React from "react";

function App() {
  const showHeader = location.pathname === "/";

  return (
    <div>
      <AppRoutes />
      <Rambursare />
    </div>
  );
}
export default App;
