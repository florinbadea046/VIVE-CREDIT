import { useTranslation } from "react-i18next";
import CardWrapper from "../CardWrapper";
import { TrendingUp } from "lucide-react";

interface LoanSummaryCardProps {
  amount: number;
  interest: number;
  termMonths: number;
  monthlyRate: number;
  lastPayment: { date: string; amount: number; method: string };
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
  const { t } = useTranslation("dashboard");

  return (
    <CardWrapper
      title={t("loanSummary.title")}
      icon={
        <TrendingUp size={22} className="text-blue-600 dark:text-blue-300" />
      }
    >
      <div className="mb-4">
        <span
          className={
            `px-3 py-1 text-xs font-medium rounded-full ` +
            (status === "active"
              ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
              : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300")
          }
        >
          {status === "active"
            ? t("loanSummary.status.active")
            : t("loanSummary.status.completed")}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-1">
          <p className="text-gray-500 dark:text-gray-400">
            {t("loanSummary.grantedAmount")}
          </p>
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {amount.toLocaleString("ro-RO")} RON
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-gray-500 dark:text-gray-400">
            {t("loanSummary.monthlyRate")}
          </p>
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {monthlyRate.toLocaleString("ro-RO")} RON
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-gray-500 dark:text-gray-400">
            {t("loanSummary.interest")}
          </p>
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {interest}%
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-gray-500 dark:text-gray-400">
            {t("loanSummary.duration")}
          </p>
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {termMonths} {t("loanSummary.months")}
          </p>
        </div>
      </div>

      <hr className="my-4 border-gray-200 dark:border-white/10" />

      <div className="space-y-1">
        <p className="text-gray-500 dark:text-gray-400">
          {t("loanSummary.lastPayment")}
        </p>
        <p className="font-medium text-gray-800 dark:text-gray-200">
          {lastPayment.date} • {lastPayment.amount.toLocaleString("ro-RO")} RON
        </p>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {t("loanSummary.method")}: {lastPayment.method}
        </span>
      </div>
    </CardWrapper>
  );
}
