import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Rambursare from "@/components/ui/rambursare";

function App() {
  const location = useLocation();

  const showHeader = location.pathname === "/";

  return (
    <div>
      <AppRoutes />
      <Rambursare />
    </div>
  );
}
export default App;
