import { formatStatus } from "../../utils/formatters";

type Status =
  | "approved"
  | "rejected"
  | "manual_review"
  | "documents_requested"
  | "aml_review"
  | "pending";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

const styleMap: Record<Status, string> = {
  approved: "text-green-700 bg-green-100",
  rejected: "text-red-700 bg-red-100",
  manual_review: "text-yellow-700 bg-yellow-100",
  documents_requested: "text-indigo-700 bg-indigo-100",
  aml_review: "text-purple-700 bg-purple-100",
  pending: "text-blue-700 bg-blue-100",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className,
}) => {
  return (
    <span
      className={`px-2 py-1 text-x2 rounded-lg font-medium ${styleMap[status]} ${className}`}
    >
      {formatStatus(status)}
    </span>
  );
};
