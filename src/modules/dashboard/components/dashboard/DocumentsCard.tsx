import { FileText, Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import CardWrapper from "../CardWrapper";

interface DocumentItem {
  id: string;
  name: string;
  url: string;
}

interface Props {
  documents: DocumentItem[];
}

export default function DocumentsCard({ documents }: Props) {
  const { t } = useTranslation("dashboard");

  return (
    <CardWrapper
      title={t("documentsCard.title")}
      icon={<FileText size={22} className="text-blue-600 dark:text-blue-300" />}
    >
      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100 dark:bg-[#2A3B55A6] dark:border-white/10"
          >
            <div className="flex items-center gap-3">
              <FileText
                size={18}
                className="text-blue-600 dark:text-blue-300"
              />
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {t(`documents.names.${doc.name}`)}
              </span>
            </div>

            <a
              href={doc.url}
              download
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium dark:text-blue-300 dark:hover:text-blue-200"
            >
              <Download size={18} />
              {t("documentsCard.download")}
            </a>
          </div>
        ))}
      </div>
    </CardWrapper>
  );
}
