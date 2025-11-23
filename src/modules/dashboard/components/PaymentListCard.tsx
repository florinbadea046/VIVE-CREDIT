import {
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  Landmark,
  Wallet,
} from "lucide-react";
import type { PaymentItem } from "../types/payments";

interface Props {
  payments: PaymentItem[];
}

export default function PaymentListCard({ payments }: Props) {
  const getStatusBadge = (status: PaymentItem["status"]) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs sm:text-sm font-medium">
            <CheckCircle size={16} /> Finalizată
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs sm:text-sm font-medium">
            <XCircle size={16} /> Eșuată
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs sm:text-sm font-medium">
            <Clock size={16} /> În procesare
          </span>
        );
    }
  };

  const getIcon = (method: PaymentItem["method"]) => {
    switch (method) {
      case "Card":
        return <CreditCard size={22} className="text-blue-600" />;
      case "Transfer":
        return <Landmark size={22} className="text-blue-600" />;
      case "Cash":
        return <Wallet size={22} className="text-blue-600" />;
    }
  };

  return (
    <div className="space-y-4">
      {payments.map((p) => (
        <div
          key={p.id}
          className="
            bg-white border border-gray-200 rounded-xl p-4 
            hover:shadow-md transition
            grid grid-cols-1 sm:grid-cols-3 gap-4
            items-center
          "
        >
          <div className="flex items-center gap-4">
            {getIcon(p.method)}
            <div className="leading-tight">
              <p className="font-medium text-gray-900 text-sm sm:text-base">
                {p.method}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">{p.date}</p>
            </div>
          </div>

          <p className="text-lg sm:text-xl font-bold text-blue-700 text-left sm:text-center whitespace-nowrap">
            {p.amount.toLocaleString("ro-RO")} RON
          </p>

          <div className="sm:text-right">{getStatusBadge(p.status)}</div>
        </div>
      ))}
    </div>
  );
}
