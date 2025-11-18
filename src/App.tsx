import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const location = useLocation();

  const showHeader = location.pathname === "/";

  return (
    <div>
      <AppRoutes />
    </div>
  );
}
export default App;
