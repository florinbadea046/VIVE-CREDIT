import { CreditCard, FileText, Info } from "lucide-react";
import type { ReactNode } from "react";
import type { NotificationType } from "./notifications.types";

type NotificationItemProps = {
  text: string;
  date: string;
  read: boolean;
  type?: NotificationType;
  onClick: () => void;
};

const iconMap: Record<NotificationType, ReactNode> = {
  payment: (
    <CreditCard size={18} className="text-green-600 dark:text-green-400" />
  ),
  document: <FileText size={18} className="text-blue-600 dark:text-blue-400" />,
  system: <Info size={18} className="text-gray-500 dark:text-gray-400" />,
};

const formatDateTime = (value: string) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;

  return d.toLocaleDateString("ro-RO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function NotificationItem({
  text,
  date,
  read,
  type,
  onClick,
}: NotificationItemProps) {
  const resolvedType: NotificationType =
    type ?? (text.toLowerCase().includes("document") ? "document" : "system");

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left
        px-4 py-3 border-b last:border-none
        border-gray-100 dark:border-gray-700
        flex items-start gap-3
        transition
        ${
          !read
            ? "bg-blue-50 dark:bg-blue-900/30"
            : "hover:bg-gray-50 dark:hover:bg-gray-700/40"
        }
      `}
    >
      <div className="flex items-center gap-2 shrink-0">
        {!read && <span className="w-2 h-2 rounded-full bg-red-500" />}
        {iconMap[resolvedType]}
      </div>

      <div className="flex-1">
        <p className="text-sm text-gray-800 dark:text-gray-200">{text}</p>

        <span className="text-xs text-gray-500 dark:text-gray-400">
          {formatDateTime(date)}
        </span>
      </div>
    </button>
  );
}
