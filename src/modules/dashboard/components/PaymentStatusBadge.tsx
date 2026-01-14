import { CheckCircle, Clock, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const base =
  "px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1";

export default function PaymentStatusBadge({ status }: { status: string }) {
  const { t } = useTranslation("dashboard");

  if (status === "completed")
    return (
      <span
        className={`${base} bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300`}
      >
        <CheckCircle size={14} className="dark:text-green-300" />
        {t("payments.status.completed")}
      </span>
    );

  if (status === "pending")
    return (
      <span
        className={`${base} bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300`}
      >
        <Clock size={14} className="dark:text-yellow-300" />
        {t("payments.status.pending")}
      </span>
    );

  return (
    <span
      className={`${base} bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300`}
    >
      <XCircle size={14} className="dark:text-red-300" />
      {t("payments.status.failed")}
    </span>
  );
}
