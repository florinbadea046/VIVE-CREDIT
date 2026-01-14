import { useTranslation } from "react-i18next";
import {
  FileText,
  BadgeCheck,
  Clock,
  AlertTriangle,
  Download,
} from "lucide-react";
import CardWrapper from "../CardWrapper";
import type { DocumentItem } from "@/modules/dashboard/types/documents";

interface Props {
  documents: DocumentItem[];
}

const formatSize = (kb: number): string =>
  kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;

const formatDate = (value: string): string => {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString("ro-RO");
};

export default function DocumentsListCard({ documents }: Props) {
  const { t } = useTranslation("dashboard");

  const categoryLabel: Record<DocumentItem["category"], string> = {
    contract: t("documentsList.categories.contract"),
    schedule: t("documentsList.categories.schedule"),
    kyc: t("documentsList.categories.kyc"),
    income: t("documentsList.categories.income"),
    other: t("documentsList.categories.other"),
  };

  const getStatusBadge = (status: DocumentItem["status"]) => {
    switch (status) {
      case "available":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[11px] font-medium dark:bg-green-500/20 dark:text-green-300">
            <BadgeCheck size={14} />
            {t("documentsList.status.available")}
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 text-[11px] font-medium dark:bg-yellow-500/20 dark:text-yellow-300">
            <Clock size={14} />
            {t("documentsList.status.processing")}
          </span>
        );
      case "expired":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-[11px] font-medium dark:bg-red-500/20 dark:text-red-300">
            <AlertTriangle size={14} />
            {t("documentsList.status.expired")}
          </span>
        );
    }
  };

  return (
    <CardWrapper
      title={t("documentsList.title")}
      icon={<FileText size={22} className="text-blue-600 dark:text-blue-300" />}
    >
      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-blue-50/60 border border-blue-100 rounded-xl px-3 py-3 sm:px-4 sm:py-3 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:bg-blue-50 transition dark:bg-[#2A3B55A6] dark:border-white/10 dark:hover:bg-[#2A3B55CC]"
          >
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <FileText
                size={22}
                className="text-blue-600 dark:text-blue-300"
              />

              <div className="min-w-0">
                <p className="font-medium text-gray-900 dark:text-gray-100 text-sm sm:text-base truncate">
                  {t(`documents.names.${doc.name}`)}
                </p>

                <p className="text-[11px] sm:text-xs text-blue-700 dark:text-blue-300 mt-0.5">
                  {categoryLabel[doc.category]}
                </p>

                <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
                  <span>{formatDate(doc.uploadedAt)}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-500" />
                  <span>{formatSize(doc.sizeKb)}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-500" />
                  {getStatusBadge(doc.status)}
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 flex items-center justify-end">
              {doc.status === "available" ? (
                <a
                  href={doc.url}
                  download
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-blue-700 text-xs sm:text-sm border border-blue-100 shadow-sm hover:bg-blue-600 hover:text-white transition dark:bg-[#1C2534] dark:text-blue-300 dark:border-white/10 dark:hover:bg-blue-500"
                >
                  <Download size={16} />
                  <span>{t("documentsList.download")}</span>
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 text-gray-400 text-xs sm:text-sm border border-gray-200 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500 dark:border-white/10"
                >
                  <Download size={16} />
                  <span>{t("documentsList.unavailable")}</span>
                </button>
              )}
            </div>
          </div>
        ))}

        {documents.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 italic">
            {t("documentsList.noDocuments")}
          </p>
        )}
      </div>
    </CardWrapper>
  );
}
