import { useTranslation } from "react-i18next";
import CardWrapper from "../CardWrapper";
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
  const { t } = useTranslation("dashboard");

  const totalMonths = paidMonths + remainingMonths;
  const progress = (paidMonths / totalMonths) * 100;

  const totalPaid = paidMonths * monthlyRate;
  const totalRemaining = remainingMonths * monthlyRate;

  const isAlmostDone = progress >= 80;
  const isBehind = paidMonths < Math.floor(totalMonths * 0.3);

  return (
    <CardWrapper
      title={t("loanProgress.title")}
      icon={
        <TrendingUp size={22} className="text-blue-600 dark:text-blue-300" />
      }
    >
      <div className="space-y-4">
        <div
          className={
            `inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ` +
            (isBehind
              ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
              : isAlmostDone
              ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
              : "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300")
          }
        >
          ●{" "}
          {isBehind
            ? t("loanProgress.status.slow")
            : isAlmostDone
            ? t("loanProgress.status.almostDone")
            : t("loanProgress.status.inProgress")}
        </div>

        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            {t("loanProgress.totalProgress")}: <b>{progress.toFixed(0)}%</b>
          </p>

          <div className="w-full bg-blue-100 dark:bg-white/10 rounded-full h-3 overflow-hidden shadow-inner">
            <div
              className="h-full bg-blue-600 dark:bg-blue-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm pt-2">
          <div>
            <p className="text-gray-500 dark:text-gray-400">
              {t("loanProgress.totalRepaid")}
            </p>
            <p className="text-blue-700 dark:text-blue-300 font-semibold">
              {totalPaid.toLocaleString("ro-RO")} RON
            </p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400">
              {t("loanProgress.remainingToPay")}
            </p>
            <p className="text-red-600 dark:text-red-300 font-semibold">
              {totalRemaining.toLocaleString("ro-RO")} RON
            </p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400">
              {t("loanProgress.paidMonths")}
            </p>
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {paidMonths} {t("loanProgress.months")}
            </p>
          </div>

          <div>
            <p className="text-gray-500 dark:text-gray-400">
              {t("loanProgress.remainingMonths")}
            </p>
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {remainingMonths} {t("loanProgress.months")}
            </p>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-white/10 mt-2" />

        <p className="text-xs text-gray-500 dark:text-gray-400">
          {t("loanProgress.totalLoanValue")}:{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            {amount.toLocaleString("ro-RO")} RON
          </span>
        </p>
      </div>
    </CardWrapper>
  );
}
