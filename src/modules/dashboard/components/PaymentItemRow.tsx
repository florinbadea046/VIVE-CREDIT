import PaymentMethodIcon from "./PaymentMethodIcon";
import PaymentStatusBadge from "./PaymentStatusBadge";
import type { PaymentItem } from "../types/payments";

export default function PaymentItemRow({ item }: { item: PaymentItem }) {
  return (
    <div
      className="
        flex items-center justify-between 
        bg-white border border-gray-200 
        rounded-xl p-4 shadow-sm hover:shadow-md transition
      "
    >
      <div className="flex items-center gap-4">
        <PaymentMethodIcon method={item.method} />

        <div>
          <p className="font-medium text-gray-800">{item.method}</p>
          <p className="text-sm text-gray-500">{item.date}</p>
        </div>
      </div>

      <div className="text-right">
        <p className="text-lg font-bold text-blue-700">
          {item.amount.toLocaleString("ro-RO")} RON
        </p>
      </div>

      <PaymentStatusBadge status={item.status} />
    </div>
  );
}
