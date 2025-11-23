import { CheckCircle, Clock, XCircle } from "lucide-react";

const base =
  "px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1";

export default function PaymentStatusBadge({ status }: { status: string }) {
  if (status === "completed")
    return (
      <span className={`${base} bg-green-100 text-green-700`}>
        <CheckCircle size={14} /> Finalizată
      </span>
    );

  if (status === "pending")
    return (
      <span className={`${base} bg-yellow-100 text-yellow-700`}>
        <Clock size={14} /> În procesare
      </span>
    );

  return (
    <span className={`${base} bg-red-100 text-red-700`}>
      <XCircle size={14} /> Eșuată
    </span>
  );
}
