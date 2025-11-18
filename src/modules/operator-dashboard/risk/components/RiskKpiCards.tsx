import { mockRiskApp } from "../mock-data";
import {
  CheckCircle,
  XCircle,
  Hourglass,
  AlertTriangle,
  Clock,
} from "lucide-react";

export default function RiskKpiCards() {
  const total = mockRiskApp.length;
  const approved = mockRiskApp.filter(
    (app) => app.status === "approved"
  ).length;
  const rejected = mockRiskApp.filter(
    (app) => app.status === "rejected"
  ).length;
  const pending = mockRiskApp.filter((app) => app.status === "pending").length;
  const manual = mockRiskApp.filter(
    (app) => app.status === "manual_review"
  ).length;
  const cards = [
    { label: "Total aplicatii", value: total, icon: AlertTriangle },
    { label: "Aprobate", value: approved, icon: CheckCircle },
    { label: "Respinse ", value: rejected, icon: XCircle },
    { label: "In asteptare ", value: pending, icon: Clock },
    { label: "Manual review", value: manual, icon: Hourglass },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-4 flex items-center gap-4 border hover:shadow-lg transition"
          >
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <Icon size={28} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">{card.label}</p>
              <p className="text-2xl font-semibold">{card.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
