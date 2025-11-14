import { useLocation } from "react-router-dom";
import AppRoutes from "@/routes/AppRoutes";

function App() {
  const location = useLocation();

  const showHeader = location.pathname === "/";

  return (
    <div>
      {showHeader && (
        <h1 className="text-4xl font-bold text-blue-600 text-center mt-5">
          Vive Credit
        </h1>
      )}

      <AppRoutes />
    </div>
  );
}

export default App;
