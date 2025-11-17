import { CheckCircle, Clock, Loader2, AlertTriangle } from "lucide-react";
import CardWrapper from "./CardWrapper";

interface ApplicationStatusCardProps {
  status: "pending" | "in_review" | "approved" | "rejected";
  applicationId: string;
}

export default function ApplicationStatusCard({
  status,
  applicationId,
}: ApplicationStatusCardProps) {
  const renderStatus = () => {
    switch (status) {
      case "pending":
        return (
          <div className="flex items-center gap-3 text-blue-600">
            <Clock size={22} />
            <span className="font-medium">
              Cerere înregistrată – în așteptare
            </span>
          </div>
        );

      case "in_review":
        return (
          <div className="flex items-center gap-3 text-yellow-600">
            <Loader2 size={22} className="animate-spin" />
            <span className="font-medium">
              Cererea este analizată de un consultant
            </span>
          </div>
        );

      case "approved":
        return (
          <div className="flex items-center gap-3 text-green-600">
            <CheckCircle size={22} />
            <span className="font-medium">
              Aprobata ✔ Fondurile sunt pregătite
            </span>
          </div>
        );

      case "rejected":
        return (
          <div className="flex items-center gap-3 text-red-600">
            <AlertTriangle size={22} />
            <span className="font-medium">Cererea a fost respinsă</span>
          </div>
        );
    }
  };

  return (
    <CardWrapper title="Status aplicație" icon={<Clock size={22} />}>
      <div className="space-y-4">
        {renderStatus()}

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
          <p className="text-sm text-blue-700">Număr cerere:</p>
          <p className="text-lg font-semibold text-blue-900">{applicationId}</p>
        </div>

        <p className="text-gray-600 text-sm">
          Vei primi notificare imediat ce cererea ta avansează către următorul
          stadiu.
        </p>
      </div>
    </CardWrapper>
  );
}
