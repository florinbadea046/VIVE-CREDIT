import { useAppSelector } from "@/hooks/reduxHooks";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedAdminRouteProps {
  children: ReactNode;
}

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to='/login/admin' replace />;

  if (role !== "admin") return <Navigate to='/' replace />;

  return <>{children}</>;
};

export default ProtectedAdminRoute;
