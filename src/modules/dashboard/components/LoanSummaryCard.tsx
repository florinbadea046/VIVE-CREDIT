import CardWrapper from "./CardWrapper";
import { TrendingUp } from "lucide-react";

interface LoanSummaryCardProps {
  amount: number;
  interest: number;
  termMonths: number;
  monthlyRate: number;
  lastPayment: {
    date: string;
    amount: number;
    method: string;
  };
  status: string;
}

export default function LoanSummaryCard({
  amount,
  interest,
  termMonths,
  monthlyRate,
  lastPayment,
  status,
}: LoanSummaryCardProps) {
  return (
    <CardWrapper
      title="Detalii împrumut"
      icon={<TrendingUp size={22} className="text-blue-600" />}
    >
      <div className="mb-4">
        <span
          className={`
            px-3 py-1 text-xs font-medium rounded-full
            ${
              status === "active"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-600"
            }
          `}
        >
          {status === "active" ? "Activ" : "Finalizat"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <p className="text-gray-500">Suma acordată</p>
          <p className="font-semibold text-gray-800">
            {amount.toLocaleString("ro-RO")} RON
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-gray-500">Rată lunară</p>
          <p className="font-semibold text-gray-800">
            {monthlyRate.toLocaleString("ro-RO")} RON
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-gray-500">Dobândă</p>
          <p className="font-semibold text-gray-800">{interest}%</p>
        </div>

        <div className="space-y-1">
          <p className="text-gray-500">Durată</p>
          <p className="font-semibold text-gray-800">{termMonths} luni</p>
        </div>
      </div>

      <hr className="my-4 border-gray-200" />

      <div className="space-y-1">
        <p className="text-gray-500">Ultima plată</p>
        <p className="font-medium text-gray-800">
          {lastPayment.date} • {lastPayment.amount.toLocaleString("ro-RO")} RON
        </p>
        <span className="text-xs text-gray-500">
          Metodă: {lastPayment.method}
        </span>
      </div>
    </CardWrapper>
  );
}
