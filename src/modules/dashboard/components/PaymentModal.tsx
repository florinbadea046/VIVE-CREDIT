import { X } from "lucide-react";
import { addNotification } from "@/components/notifications/notifications.actions";

interface PaymentModalProps {
  amount: number;
  onClose: () => void;
}

export default function PaymentModal({ amount, onClose }: PaymentModalProps) {
  const handleConfirmPayment = () => {
    addNotification({
      text: `Plata de ${amount.toLocaleString(
        "ro-RO"
      )} RON a fost recepționată cu succes`,
      date: new Date().toISOString(),
      read: false,
      type: "payment",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div
        className="
          w-full max-w-sm md:max-w-md
          bg-white dark:bg-[#1C2534]
          rounded-xl shadow-xl
          border border-gray-200 dark:border-white/10
          p-4 md:p-6
          relative
        "
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-lg md:text-xl font-bold text-blue-700 dark:text-blue-300 mb-3 md:mb-4">
          Plată rată
        </h2>

        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-2 md:mb-4">
          Vei plăti suma de:
        </p>

        <p className="text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-300 mb-4 md:mb-6">
          {amount.toLocaleString("ro-RO")} RON
        </p>

        <button
          onClick={handleConfirmPayment}
          className="
            w-full
            py-2.5 md:py-3
            rounded-lg
            font-medium
            text-sm md:text-base
            bg-blue-600 hover:bg-blue-700
            text-white
            transition
            dark:bg-blue-500 dark:hover:bg-blue-400
          "
        >
          Confirmă plata
        </button>
      </div>
    </div>
  );
}
