import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/modules/dashboard/layout/DashboardLayout";
import CardWrapper from "@/modules/dashboard/components/CardWrapper";
import DocumentUploader from "@/modules/dashboard/components/documents/DocumentUploader";
import { FilePlus, ArrowLeft } from "lucide-react";

export default function UploadDocumentPage() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <CardWrapper title="Încărcare documente" icon={<FilePlus size={22} />}>
        <div className="space-y-6">
          <button
            onClick={() => navigate("/dashboard/documents")}
            className="
    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition
    bg-gray-100 hover:bg-gray-200 text-gray-800
    dark:bg-[#2A3B55] dark:hover:bg-[#1C2534] dark:text-gray-200
  "
          >
            <ArrowLeft size={16} />
            Înapoi la documentele mele
          </button>

          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Încarcă documentele necesare pentru verificarea identității sau
            procesarea cererii tale. Sunt acceptate formatele:
            <span className="font-medium text-blue-700 dark:text-blue-300">
              {" "}
              PDF, JPG și PNG
            </span>{" "}
            (max 10MB).
          </p>

          <div
            className="
              p-5 rounded-xl border 
              border-blue-100 dark:border-white/10
              bg-blue-50/40 dark:bg-[#2A3B55]/30 shadow-sm
              transition
            "
          >
            <DocumentUploader />
          </div>

          <div
            className="
              text-xs text-gray-500 dark:text-gray-400
              border-t border-gray-200 dark:border-white/10 
              pt-4
            "
          >
            * Asigură-te că documentele sunt lizibile și că nu depășesc
            dimensiunea maximă permisă.
          </div>
        </div>
      </CardWrapper>
    </DashboardLayout>
  );
}
