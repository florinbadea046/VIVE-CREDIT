import { useEffect, useState } from "react";
import { CreditCard, FileText, Info } from "lucide-react";
import type { NotificationType } from "./notifications.types";

interface ToastProps {
  message: string;
  type?: NotificationType;
  duration?: number;
  onClose: () => void;
}

const iconMap = {
  payment: (
    <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30">
      <CreditCard size={18} className="text-green-600 dark:text-green-400" />
    </div>
  ),
  document: (
    <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30">
      <FileText size={18} className="text-blue-600 dark:text-blue-400" />
    </div>
  ),
  system: (
    <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
      <Info size={18} className="text-gray-600 dark:text-gray-300" />
    </div>
  ),
};

export default function Toast({
  message,
  type,
  duration = 3000,
  onClose,
}: ToastProps) {
  const [progress, setProgress] = useState(100);

  const resolvedType: NotificationType =
    type ??
    (message.toLowerCase().includes("document") ? "document" : "system");

  useEffect(() => {
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(percent);

      if (elapsed >= duration) {
        clearInterval(interval);
        onClose();
      }
    }, 30);

    return () => clearInterval(interval);
  }, [duration, onClose]);

  return (
    <div
      className="
        fixed top-4 right-4 z-[100]
        w-[90%] max-w-sm
        bg-white dark:bg-gray-800
        border border-gray-200 dark:border-gray-700
        rounded-xl shadow-xl
        overflow-hidden
      "
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {iconMap[resolvedType]}
        <p className="text-sm text-gray-800 dark:text-gray-200">{message}</p>
      </div>

      <div className="h-1 bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-full transition-all ${
            resolvedType === "payment"
              ? "bg-green-600"
              : resolvedType === "document"
              ? "bg-blue-600"
              : "bg-gray-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
