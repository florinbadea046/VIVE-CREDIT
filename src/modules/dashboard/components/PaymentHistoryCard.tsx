import CardWrapper from "./CardWrapper";
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
  const statusConfig = {
    completed: {
      color: "text-green-600",
      icon: <CheckCircle size={18} className="text-green-600" />,
      label: "Finalizată",
    },
    pending: {
      color: "text-blue-600",
      icon: <Clock size={18} className="text-blue-600" />,
      label: "În procesare",
    },
  } as const;

  return (
    <CardWrapper
      title="Istoric plăți"
      icon={<CreditCard size={22} className="text-blue-600" />}
    >
      <div className="space-y-4">
        {payments.map((p) => {
          const cfg = statusConfig[p.status];

          return (
            <div
              key={p.id}
              className="flex items-center justify-between bg-blue-50 border border-blue-100 p-3 rounded-lg"
            >
              <div>
                <p className="text-gray-800 font-medium">
                  {p.amount.toLocaleString("ro-RO")} RON
                </p>
                <p className="text-sm text-gray-500">{p.date}</p>
                <p className="text-sm text-gray-500 capitalize">{p.method}</p>
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
