import DashboardLayout from "../layout/DashboardLayout";
import { Phone, Mail, FileText, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HelpPage() {
  const { t } = useTranslation("dashboard");

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            {t("help.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            {t("help.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border border-blue-100 dark:border-white/10 bg-blue-50/40 dark:bg-[#2A3B55]/30 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Phone size={22} className="text-blue-700 dark:text-blue-300" />
              <h2 className="font-semibold text-blue-900 dark:text-white">
                {t("help.phoneSupport.title")}
              </h2>
            </div>

            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">
                {t("help.phoneSupport.scheduleLabel")}:
              </span>{" "}
              {t("help.phoneSupport.schedule")}
            </p>

            <p className="mt-2 text-lg font-semibold text-blue-700 dark:text-blue-300">
              {t("help.phoneSupport.number")}
            </p>
          </div>

          <div className="p-5 rounded-xl border border-blue-100 dark:border-white/10 bg-blue-50/40 dark:bg-[#2A3B55]/30 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Mail size={22} className="text-blue-700 dark:text-blue-300" />
              <h2 className="font-semibold text-blue-900 dark:text-white">
                {t("help.emailSupport.title")}
              </h2>
            </div>

            <p className="text-gray-700 dark:text-gray-300">
              {t("help.emailSupport.description")}
            </p>

            <p className="mt-2 text-lg font-semibold text-blue-700 dark:text-blue-300">
              {t("help.emailSupport.email")}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300">
            {t("help.usefulInfo.title")}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl border border-blue-100 dark:border-white/10 bg-white dark:bg-[#1C2A3A]/50 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <FileText
                  size={20}
                  className="text-blue-600 dark:text-blue-300"
                />
                <h4 className="font-semibold text-blue-900 dark:text-white">
                  {t("help.usefulInfo.requiredDocs.title")}
                </h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                • {t("help.usefulInfo.requiredDocs.idCard")}
                <br />• {t("help.usefulInfo.requiredDocs.incomeProof")}
                <br />• {t("help.usefulInfo.requiredDocs.otherDocs")}
              </p>
            </div>

            <div className="p-5 rounded-xl border border-blue-100 dark:border-white/10 bg-white dark:bg-[#1C2A3A]/50 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <Shield
                  size={20}
                  className="text-blue-600 dark:text-blue-300"
                />
                <h4 className="font-semibold text-blue-900 dark:text-white">
                  {t("help.usefulInfo.dataSecurity.title")}
                </h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {t("help.usefulInfo.dataSecurity.description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
