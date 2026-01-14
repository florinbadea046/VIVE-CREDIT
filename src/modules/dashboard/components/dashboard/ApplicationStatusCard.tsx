import { CheckCircle, Clock, Loader2, AlertTriangle } from "lucide-react";
import { useTranslation } from "react-i18next";
import CardWrapper from "../CardWrapper";

interface ApplicationStatusCardProps {
  status: "pending" | "in_review" | "approved" | "rejected";
  applicationId: string;
}

export default function ApplicationStatusCard({
  status,
  applicationId,
}: ApplicationStatusCardProps) {
  const { t } = useTranslation("dashboard");

  const renderStatus = () => {
    switch (status) {
      case "pending":
        return (
          <div className="flex items-center gap-3 text-blue-600">
            <Clock size={22} />
            <span className="font-medium">
              {t("applicationStatus.statuses.pending")}
            </span>
          </div>
        );

      case "in_review":
        return (
          <div className="flex items-center gap-3 text-yellow-600">
            <Loader2 size={22} className="animate-spin" />
            <span className="font-medium">
              {t("applicationStatus.statuses.inReview")}
            </span>
          </div>
        );

      case "approved":
        return (
          <div className="flex items-center gap-3 text-green-600">
            <CheckCircle size={22} />
            <span className="font-medium">
              {t("applicationStatus.statuses.approved")}
            </span>
          </div>
        );

      case "rejected":
        return (
          <div className="flex items-center gap-3 text-red-600">
            <AlertTriangle size={22} />
            <span className="font-medium">
              {t("applicationStatus.statuses.rejected")}
            </span>
          </div>
        );
    }
  };

  return (
    <CardWrapper
      title={t("applicationStatus.title")}
      icon={<Clock size={22} />}
    >
      <div className="space-y-4">
        {renderStatus()}

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 dark:bg-[#2A3B55A6] dark:border-white/10">
          <p className="text-sm text-blue-700 dark:text-gray-300">
            {t("applicationStatus.applicationNumber")}:
          </p>

          <p className="text-lg font-semibold text-blue-900 dark:text-white">
            {applicationId}
          </p>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {t("applicationStatus.notificationMessage")}
        </p>
      </div>
    </CardWrapper>
  );
}
