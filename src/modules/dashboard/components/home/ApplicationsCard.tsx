import {
  AlertTriangle,
  CheckCircle,
  Clock,
  FilePlus,
  FileText,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CardWrapper from "../../components/CardWrapper";

type App = {
  id: number;
  amount: number;
  status: string;
  date: string;
};

export default function ApplicationsCard({
  applications,
}: {
  applications: App[];
}) {
  const navigate = useNavigate();
  const { t } = useTranslation("dashboard");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <span className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium">
            <CheckCircle size={16} /> {t("applications.status.approved")}
          </span>
        );

      case "pending":
        return (
          <span className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 text-sm font-medium">
            <Clock size={16} /> {t("applications.status.pending")}
          </span>
        );

      case "rejected":
        return (
          <span className="flex items-center gap-1 text-red-600 dark:text-red-400 text-sm font-medium">
            <AlertTriangle size={16} /> {t("applications.status.rejected")}
          </span>
        );

      default:
        return (
          <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm font-medium">
            <Clock size={16} /> {status}
          </span>
        );
    }
  };

  return (
    <CardWrapper title={t("applications.title")} icon={<FilePlus size={22} />}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="
              bg-blue-50 dark:bg-[#2A3B55]/30
              border border-blue-100 dark:border-white/10
              rounded-xl p-4
              shadow-sm transition
              flex flex-col gap-3
              select-none
            "
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-blue-900 dark:text-white">
                {t("applications.applicationId", { id: app.id })}
              </p>
              <FileText
                size={18}
                className="text-blue-600 dark:text-blue-300"
              />
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300">
              {t("applications.requestedAmount")}:{" "}
              <span className="font-medium">{app.amount} RON</span>
            </p>

            {getStatusBadge(app.status)}

            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t("applications.submittedOn")}: {app.date}
            </p>
          </div>
        ))}

        <div
          onClick={() => navigate("/dashboard/loan-form")}
          className="
            bg-gray-100 dark:bg-gray-700
            border border-gray-300 dark:border-white/10
            rounded-xl p-4
            flex flex-col items-center justify-center gap-2
            text-gray-700 dark:text-gray-300
            shadow-sm hover:shadow-md transition
            cursor-pointer
          "
        >
          <Plus size={22} className="text-blue-600 dark:text-blue-300" />
          <span className="font-medium text-sm">
            {t("applications.newApplication")}
          </span>
        </div>
      </div>
    </CardWrapper>
  );
}
