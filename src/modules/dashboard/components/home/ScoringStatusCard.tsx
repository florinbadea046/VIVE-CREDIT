import { TrendingUp, ArrowRight } from "lucide-react";

interface Props {
  status: "approved" | "rejected" | "pending";
  score: number;
}

export default function ScoringStatusCard({ status, score }: Props) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-blue-700 dark:text-white tracking-tight">
            Scor Credit
          </h2>
        </div>

        <div className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition cursor-pointer">
          Vezi detalii
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-3">
        {/* Rând Punctaj */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            Punctaj calculat:
          </span>
          <span className="text-lg font-bold text-slate-900 dark:text-white">
            {score}
          </span>
        </div>

        {/* Rând Status */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            Status evaluare:
          </span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              status === "approved"
                ? "bg-green-100 text-green-600"
                : status === "rejected"
                ? "bg-red-100 text-red-600"
                : "bg-orange-100 text-orange-600"
            }`}
          >
            {status === "approved"
              ? "Aprobat"
              : status === "rejected"
              ? "Respins"
              : "În verificare"}
          </span>
        </div>
      </div>
    </div>
  );
}
