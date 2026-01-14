import { useState } from "react";
import { useTranslation } from "react-i18next";
import type {
  PaymentItem,
  PaymentStatus,
  PaymentMethod,
} from "@/modules/dashboard/types/payments";
import PaymentListCard from "./PaymentListCard";

interface Props {
  payments: PaymentItem[];
}

export default function PaymentFilters({ payments }: Props) {
  const { t } = useTranslation("dashboard");
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
          dark:bg-[#1C2534]/60 dark:border-white/10
        "
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
            {t("paymentFilters.status.label")}
          </label>
          <select
            className="
              px-3 py-2 rounded-lg border bg-gray-50 text-gray-700 font-medium
              focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-white transition
              dark:bg-[#2A3B55A6] dark:text-gray-200 dark:border-white/10 dark:hover:bg-[#1C2534]
            "
            value={status}
            onChange={(e) => setStatus(e.target.value as PaymentStatus | "all")}
          >
            <option value="all" className="text-gray-500 dark:text-gray-300">
              {t("paymentFilters.status.all")}
            </option>
            <option
              value="completed"
              className="text-green-600 dark:text-green-300 font-semibold"
            >
              {t("paymentFilters.status.completed")}
            </option>
            <option
              value="pending"
              className="text-yellow-600 dark:text-yellow-300 font-semibold"
            >
              {t("paymentFilters.status.pending")}
            </option>
            <option
              value="failed"
              className="text-red-600 dark:text-red-300 font-semibold"
            >
              {t("paymentFilters.status.failed")}
            </option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
            {t("paymentFilters.method.label")}
          </label>
          <select
            className="
              px-3 py-2 rounded-lg border bg-gray-50 text-gray-700 font-medium
              focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-white transition
              dark:bg-[#2A3B55A6] dark:text-gray-200 dark:border-white/10 dark:hover:bg-[#1C2534]
            "
            value={method}
            onChange={(e) => setMethod(e.target.value as PaymentMethod | "all")}
          >
            <option value="all" className="text-gray-500 dark:text-gray-300">
              {t("paymentFilters.method.all")}
            </option>
            <option
              value="Card"
              className="text-indigo-600 dark:text-indigo-300 font-semibold"
            >
              {t("paymentFilters.method.card")}
            </option>
            <option
              value="Transfer"
              className="text-blue-600 dark:text-blue-300 font-semibold"
            >
              {t("paymentFilters.method.transfer")}
            </option>
            <option
              value="Cash"
              className="text-orange-600 dark:text-orange-300 font-semibold"
            >
              {t("paymentFilters.method.cash")}
            </option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
            {t("paymentFilters.month.label")}
          </label>
          <select
            className="
              px-3 py-2 rounded-lg border bg-gray-50 text-gray-700 font-medium
              focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-white transition
              dark:bg-[#2A3B55A6] dark:text-gray-200 dark:border-white/10 dark:hover:bg-[#1C2534]
            "
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="all" className="text-gray-500 dark:text-gray-300">
              {t("paymentFilters.month.all")}
            </option>
            {[...new Set(payments.map((p) => p.date.slice(0, 7)))].map((m) => (
              <option
                key={m}
                value={m}
                className="font-semibold dark:text-gray-200"
              >
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
