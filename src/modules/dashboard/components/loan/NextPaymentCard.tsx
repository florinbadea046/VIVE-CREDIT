import { useState } from "react";
import { useTranslation } from "react-i18next";
import CardWrapper from "../CardWrapper";
import PaymentModal from "../PaymentModal";
import { Calendar, CreditCard, Clock } from "lucide-react";

interface NextPaymentProps {
  nextPaymentDate: string;
  nextPaymentAmount: number;
}

export default function NextPaymentCard({
  nextPaymentDate,
  nextPaymentAmount,
}: NextPaymentProps) {
  const { t } = useTranslation("dashboard");
  const [showModal, setShowModal] = useState(false);

  const dueDate = new Date(nextPaymentDate);
  const today = new Date();
  const diffDays = Math.ceil((dueDate.getTime() - today.getTime()) / 86400000);

  const isOverdue = diffDays < 0;
  const isSoon = diffDays <= 5 && diffDays >= 0;

  return (
    <>
      <CardWrapper
        title={t("nextPayment.title")}
        icon={
          <Calendar size={22} className="text-blue-600 dark:text-blue-300" />
        }
      >
        <div className="space-y-4">
          <div
            className={
              `inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ` +
              (isOverdue
                ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                : isSoon
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300"
                : "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300")
            }
          >
            <Clock
              size={16}
              className={
                isOverdue
                  ? "dark:text-red-300"
                  : isSoon
                  ? "dark:text-yellow-300"
                  : "dark:text-green-300"
              }
            />
            {isOverdue
              ? t("nextPayment.status.overdue")
              : isSoon
              ? t("nextPayment.status.dueSoon")
              : t("nextPayment.status.onTime")}
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 dark:bg-[#2A3B55A6] dark:border-white/10">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t("nextPayment.amountToPay")}
            </p>
            <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">
              {nextPaymentAmount.toLocaleString("ro-RO")} RON
            </p>

            <div className="mt-3">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t("nextPayment.dueDate")}
              </p>
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {nextPaymentDate}
              </p>
            </div>

            <div className="mt-3 flex items-center gap-2 text-sm">
              <Clock size={16} className="text-blue-600 dark:text-blue-300" />
              <span className="text-gray-700 dark:text-gray-300">
                {isOverdue
                  ? t("nextPayment.overdueDays", { days: Math.abs(diffDays) })
                  : diffDays === 0
                  ? t("nextPayment.dueToday")
                  : t("nextPayment.inDays", { days: diffDays })}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 shadow-md transition dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            <CreditCard size={18} />
            {t("nextPayment.payButton")}
          </button>
        </div>
      </CardWrapper>

      {showModal && (
        <PaymentModal
          amount={nextPaymentAmount}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
