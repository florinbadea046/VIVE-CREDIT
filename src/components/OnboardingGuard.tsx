import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/reduxHooks";

interface Props {
  children: ReactNode;
}

export default function OnboardingGuard({ children }: Props) {
  const { isAuthenticated, role } = useAppSelector((state) => state.auth);
  const onboardingCompleted =
    localStorage.getItem("onboardingCompleted") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "client") {
    return <Navigate to="/" replace />;
  }

  if (onboardingCompleted) {
    return <Navigate to="/dashboard/home" replace />;
  }

  return <>{children}</>;
}
