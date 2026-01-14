import UiCard from "../../../components/ui/UiCard";
import { AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react";

import { PENDING_STATUSES } from "@/modules/operator-dashboard/constants/applicationStatus";
import type { Application } from "@/modules/operator-dashboard/types/Application";

interface Props {
  applications: Application[];
}

export default function RiskKpiCards({ applications }: Props) {
  const total = applications.length;
  const approved = applications.filter((a) => a.status === "approved").length;
  const rejected = applications.filter((a) => a.status === "rejected").length;
  const pending = applications.filter((a) =>
    PENDING_STATUSES.includes(a.status)
  ).length;

  const cards = [
    { label: "Total aplicații", value: total, icon: <AlertTriangle /> },
    { label: "Aprobate", value: approved, icon: <CheckCircle /> },
    { label: "Respinse", value: rejected, icon: <XCircle /> },
    { label: "În așteptare", value: pending, icon: <Clock /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((c, idx) => (
        <UiCard key={idx} icon={c.icon} label={c.label} value={c.value} />
      ))}
    </div>
  );
}
