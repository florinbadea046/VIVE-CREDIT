import { useTranslation } from "react-i18next";
import CardWrapper from "../CardWrapper";
import { CreditCard, CheckCircle, Clock } from "lucide-react";

interface PaymentItem {
  id: string;
  amount: number;
  date: string;
  method: string;
  status: "completed" | "pending";
}

interface Props {
  payments: PaymentItem[];
}

export default function PaymentHistoryCard({ payments }: Props) {
  const { t } = useTranslation("dashboard");

  const statusConfig = {
    completed: {
      color: "text-green-600 dark:text-green-300",
      icon: (
        <CheckCircle size={18} className="text-green-600 dark:text-green-300" />
      ),
      label: t("paymentHistory.status.completed"),
    },
    pending: {
      color: "text-blue-600 dark:text-blue-300",
      icon: <Clock size={18} className="text-blue-600 dark:text-blue-300" />,
      label: t("paymentHistory.status.pending"),
    },
  } as const;

  return (
    <CardWrapper
      title={t("paymentHistory.title")}
      icon={<CreditCard size={22} />}
    >
      <div className="space-y-4">
        {payments.map((p) => {
          const cfg = statusConfig[p.status];

          return (
            <div
              key={p.id}
              className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100 dark:bg-[#2A3B55A6] dark:border-white/10"
            >
              <div>
                <p className="text-gray-800 dark:text-gray-200 font-medium">
                  {p.amount.toLocaleString("ro-RO")} RON
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {p.date}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {p.method}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {cfg.icon}
                <span className={`text-sm font-medium ${cfg.color}`}>
                  {cfg.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </CardWrapper>
  );
}
