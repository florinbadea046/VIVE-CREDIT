import { useState } from "react";
import type {
  PaymentItem,
  PaymentStatus,
  PaymentMethod,
} from "../types/payments";
import PaymentListCard from "./PaymentListCard";

interface Props {
  payments: PaymentItem[];
}

export default function PaymentFilters({ payments }: Props) {
  const [status, setStatus] = useState<PaymentStatus | "all">("all");
  const [method, setMethod] = useState<PaymentMethod | "all">("all");
  const [month, setMonth] = useState<string>("all");

  const filtered = payments.filter((p) => {
    const statusMatch = status === "all" || p.status === status;
    const methodMatch = method === "all" || p.method === method;
    const monthMatch =
      month === "all" || new Date(p.date).toISOString().slice(0, 7) === month;

    return statusMatch && methodMatch && monthMatch;
  });

  return (
    <div className="space-y-6">
      <div
        className="
          bg-white p-4 md:p-5 rounded-xl shadow-sm border border-gray-200 
          grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6
        "
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-indigo-700">
            Status
          </label>
          <select
            className="
              px-3 py-2 rounded-lg border 
              bg-gray-50 text-gray-700 font-medium
              focus:outline-none focus:ring-2 focus:ring-indigo-500 
              hover:bg-white transition
            "
            value={status}
            onChange={(e) => setStatus(e.target.value as PaymentStatus | "all")}
          >
            <option value="all" className="text-gray-500">
              Toate statusurile
            </option>
            <option value="completed" className="text-green-600 font-semibold">
              Finalizate
            </option>
            <option value="pending" className="text-yellow-600 font-semibold">
              În procesare
            </option>
            <option value="failed" className="text-red-600 font-semibold">
              Eșuate
            </option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-indigo-700">
            Metodă
          </label>
          <select
            className="
              px-3 py-2 rounded-lg border 
              bg-gray-50 text-gray-700 font-medium
              focus:outline-none focus:ring-2 focus:ring-indigo-500 
              hover:bg-white transition
            "
            value={method}
            onChange={(e) => setMethod(e.target.value as PaymentMethod | "all")}
          >
            <option value="all" className="text-gray-500">
              Toate metodele
            </option>
            <option value="Card" className="text-indigo-600 font-semibold">
              Card
            </option>
            <option value="Transfer" className="text-blue-600 font-semibold">
              Transfer
            </option>
            <option value="Cash" className="text-orange-600 font-semibold">
              Cash
            </option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-indigo-700">Lună</label>
          <select
            className="
              px-3 py-2 rounded-lg border 
              bg-gray-50 text-gray-700 font-medium
              focus:outline-none focus:ring-2 focus:ring-indigo-500 
              hover:bg-white transition
            "
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="all" className="text-gray-500">
              Toate lunile
            </option>
            {[...new Set(payments.map((p) => p.date.slice(0, 7)))].map((m) => (
              <option key={m} value={m} className="font-semibold">
                {m}
              </option>
            ))}
          </select>
        </div>
      </div>

      <PaymentListCard payments={filtered} />
    </div>
  );
}
