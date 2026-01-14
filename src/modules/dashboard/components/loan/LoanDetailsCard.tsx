import { useTranslation } from "react-i18next";
import CardWrapper from "../CardWrapper";
import { CreditCard } from "lucide-react";
import type { LoanDetails } from "@/modules/dashboard/types/dashboard";

interface Props {
  data: LoanDetails;
}

export default function LoanDetailsCard({ data }: Props) {
  const { t } = useTranslation("dashboard");

  return (
    <CardWrapper title={t("loanDetails.title")} icon={<CreditCard size={22} />}>
      <div className="space-y-3 text-gray-700 dark:text-gray-300">
        <p className="flex justify-between">
          <span className="font-medium">{t("loanDetails.loanAmount")}:</span>
          <span className="text-blue-700 dark:text-blue-300 font-semibold">
            {data.amount} RON
          </span>
        </p>

        <p className="flex justify-between">
          <span className="font-medium">{t("loanDetails.monthlyRate")}:</span>
          <span className="text-blue-700 dark:text-blue-300 font-semibold">
            {data.monthlyRate} RON
          </span>
        </p>

        <p className="flex justify-between">
          <span className="font-medium">{t("loanDetails.interest")}:</span>
          <span className="dark:text-gray-200">{data.interest}%</span>
        </p>

        <p className="flex justify-between">
          <span className="font-medium">
            {t("loanDetails.contractDuration")}:
          </span>
          <span className="dark:text-gray-200">
            {data.remainingMonths} {t("loanDetails.months")}
          </span>
        </p>

        <p className="flex justify-between">
          <span className="font-medium">{t("loanDetails.nextDueDate")}:</span>
          <span className="dark:text-gray-200">{data.nextDueDate}</span>
        </p>
      </div>
    </CardWrapper>
  );
}
