import DashboardLayout from "../layout/DashboardLayout";
import { documentsMock } from "../mock/documentsMock";
import DocumentsFilters from "../components/documents/DocumentsFilters";
import { useTranslation } from "react-i18next";

export default function DocumentsPage() {
  const { t } = useTranslation("dashboard");
  const documents = documentsMock;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            {t("documents.title")}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {t("documents.description")}
          </p>
        </div>

        <DocumentsFilters documents={documents} />
      </div>
    </DashboardLayout>
  );
}
