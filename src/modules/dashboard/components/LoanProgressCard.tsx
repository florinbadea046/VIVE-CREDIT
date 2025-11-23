import CardWrapper from "./CardWrapper";
import { TrendingUp } from "lucide-react";

interface LoanProgressProps {
  paidMonths: number;
  remainingMonths: number;
  monthlyRate: number;
  amount: number;
}

export default function LoanProgressCard({
  paidMonths,
  remainingMonths,
  monthlyRate,
  amount,
}: LoanProgressProps) {
  const totalMonths = paidMonths + remainingMonths;
  const progress = (paidMonths / totalMonths) * 100;

  const totalPaid = paidMonths * monthlyRate;
  const totalRemaining = remainingMonths * monthlyRate;

  const isAlmostDone = progress >= 80;
  const isBehind = paidMonths < Math.floor(totalMonths * 0.3);

  return (
    <CardWrapper
      title="Progres rambursare"
      icon={<TrendingUp size={22} className="text-blue-600" />}
    >
      <div className="space-y-4">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
            ${
              isBehind
                ? "bg-red-100 text-red-700"
                : isAlmostDone
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }
          `}
        >
          ●{" "}
          {isBehind
            ? "Rambursare lentă"
            : isAlmostDone
            ? "Aproape finalizat"
            : "În curs"}
        </div>

        <div>
          <p className="text-sm text-gray-600 mb-1">
            Progres total: <b>{progress.toFixed(0)}%</b>
          </p>

          <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm pt-2">
          <div>
            <p className="text-gray-500">Total rambursat</p>
            <p className="text-blue-700 font-semibold">
              {totalPaid.toLocaleString("ro-RO")} RON
            </p>
          </div>

          <div>
            <p className="text-gray-500">Rămas de plată</p>
            <p className="text-red-600 font-semibold">
              {totalRemaining.toLocaleString("ro-RO")} RON
            </p>
          </div>

          <div>
            <p className="text-gray-500">Luni plătite</p>
            <p className="font-medium text-gray-800">{paidMonths} luni</p>
          </div>

          <div>
            <p className="text-gray-500">Luni rămase</p>
            <p className="font-medium text-gray-800">{remainingMonths} luni</p>
          </div>
        </div>

        <hr className="border-gray-200 mt-2" />

        <p className="text-xs text-gray-500">
          Valoare totală credit:{" "}
          <span className="font-semibold text-gray-700">
            {amount.toLocaleString("ro-RO")} RON
          </span>
        </p>
      </div>
    </CardWrapper>
  );
}
