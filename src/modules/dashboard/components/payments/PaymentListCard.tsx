import { useTranslation } from "react-i18next";
import {
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  Landmark,
  Wallet,
} from "lucide-react";
import type { PaymentItem } from "@/modules/dashboard/types/payments";

interface Props {
  payments: PaymentItem[];
}

export default function PaymentListCard({ payments }: Props) {
  const { t } = useTranslation("dashboard");

  const getStatusBadge = (status: PaymentItem["status"]) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300">
            <CheckCircle size={16} className="dark:text-green-300" />{" "}
            {t("paymentList.status.completed")}
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300">
            <XCircle size={16} className="dark:text-red-300" />{" "}
            {t("paymentList.status.failed")}
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300">
            <Clock size={16} className="dark:text-yellow-300" />{" "}
            {t("paymentList.status.pending")}
          </span>
        );
    }
  };

  const getIcon = (method: PaymentItem["method"]) => {
    switch (method) {
      case "Card":
        return (
          <CreditCard size={22} className="text-blue-600 dark:text-blue-300" />
        );
      case "Transfer":
        return (
          <Landmark size={22} className="text-blue-600 dark:text-blue-300" />
        );
      case "Cash":
        return (
          <Wallet size={22} className="text-blue-600 dark:text-blue-300" />
        );
    }
  };

  return (
    <div className="space-y-4">
      {payments.map((p) => (
        <div
          key={p.id}
          className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition grid grid-cols-1 sm:grid-cols-3 gap-4 items-center dark:bg-[#2A3B55A6] dark:border-white/10 dark:shadow-none"
        >
          <div className="flex items-center gap-4">
            {getIcon(p.method)}
            <div className="leading-tight">
              <p className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                {p.method}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {p.date}
              </p>
            </div>
          </div>

          <p className="text-lg sm:text-xl font-bold text-blue-700 dark:text-blue-300 text-left sm:text-center whitespace-nowrap">
            {p.amount.toLocaleString("ro-RO")} RON
          </p>

          <div className="sm:text-right">{getStatusBadge(p.status)}</div>
        </div>
      ))}
    </div>
  );
}
