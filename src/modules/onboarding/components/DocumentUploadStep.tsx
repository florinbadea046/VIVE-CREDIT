import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, FileText, CheckCircle } from "lucide-react";
import type { OnboardingData } from "@/modules/onboarding/types/onboarding";
import { documentsService } from "@/services/documentsService";
import { useTranslation } from "react-i18next";

interface DocumentUploadStepProps {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: Partial<OnboardingData>) => void;
  initialData: OnboardingData;
}

export default function DocumentUploadStep({
  onNext,
  onBack,
  updateData,
  initialData,
}: DocumentUploadStepProps) {
  const { t } = useTranslation("onboarding");

  const [documents, setDocuments] = useState({
    idCard: initialData.documents?.idCard || null,
    incomeProof: initialData.documents?.incomeProof || null,
    otherDocs: initialData.documents?.otherDocs || [],
  });

  const [uploadedLinks, setUploadedLinks] = useState<string[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [dragActive, setDragActive] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(t("documentUpload.errors.invalidFormat"));
      return false;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert(t("documentUpload.errors.fileTooLarge"));
      return false;
    }

    return true;
  };

  const handleRealUpload = async (
    file: File,
    documentType: "idCard" | "incomeProof" | "other"
  ) => {
    const key = `${documentType}-${file.name}`;
    setIsUploading(true);
    setUploadError(null);

    try {
      const applicationId = `temp-${Date.now()}`;

      const progressInterval = setInterval(() => {
        setProgressMap((prev) => {
          const p = prev[key] || 0;
          return { ...prev, [key]: Math.min(p + Math.random() * 25, 90) };
        });
      }, 180);

      const response = await documentsService.uploadDocuments(
        [file],
        applicationId,
        documentType
      );

      clearInterval(progressInterval);

      if (response.success) {
        setProgressMap((prev) => ({ ...prev, [key]: 100 }));

        const uploadedDoc = response.data?.documents?.[0];
        if (uploadedDoc?.fileName) {
          const link = `http://localhost:3000/documents/${uploadedDoc.fileName}`;
          setUploadedLinks((prev) => [...prev, link]);
        }
      } else {
        throw new Error(
          response.message || t("documentUpload.errors.uploadError")
        );
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : t("documentUpload.errors.unknownError");

      setUploadError(
        t("documentUpload.errors.uploadFailedFor", {
          fileName: file.name,
          message,
        })
      );
      setProgressMap((prev) => ({ ...prev, [key]: 0 }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileUpload = async (file: File, type: string) => {
    if (!validateFile(file)) return;

    setDocuments((prev) => {
      if (type === "idCard") return { ...prev, idCard: file };
      if (type === "incomeProof") return { ...prev, incomeProof: file };
      if (type === "otherDocs")
        return { ...prev, otherDocs: [...prev.otherDocs, file] };
      return prev;
    });

    const mappedType: "idCard" | "incomeProof" | "other" =
      type === "idCard"
        ? "idCard"
        : type === "incomeProof"
        ? "incomeProof"
        : "other";

    await handleRealUpload(file, mappedType);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>, type: string) => {
    e.preventDefault();
    setDragActive(null);

    const files = Array.from(e.dataTransfer.files);
    files.forEach((file) => handleFileUpload(file, type));
  };

  const removeFile = (type: string, index?: number) => {
    setDocuments((prev) => {
      if (type === "idCard") return { ...prev, idCard: null };
      if (type === "incomeProof") return { ...prev, incomeProof: null };
      if (type === "otherDocs") {
        const arr = [...prev.otherDocs];
        arr.splice(index!, 1);
        return { ...prev, otherDocs: arr };
      }
      return prev;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!documents.idCard || !documents.incomeProof) {
      alert(t("documentUpload.errors.requiredDocuments"));
      return;
    }

    const uploadsDone = Object.values(progressMap).every((p) => p === 100);
    if (isUploading || !uploadsDone) {
      alert(t("documentUpload.errors.waitForUploads"));
      return;
    }

    updateData({
      documents: {
        ...documents,
        uploadedLinks,
      },
    });

    onNext();
  };

  const renderPreview = (file: File, remove: () => void, type: string) => {
    const isImage = file.type.startsWith("image/");
    const key = `${type}-${file.name}`;
    const progress = progressMap[key] || 0;
    const url = isImage ? URL.createObjectURL(file) : null;

    return (
      <div className="bg-blue-50 dark:bg-[#0c1324] border border-blue-100 dark:border-[#243247] rounded-md p-3 mt-2 transition">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isImage ? (
              <img
                src={url!}
                className="w-10 h-10 rounded-md object-cover border border-blue-200 dark:border-[#243247]"
              />
            ) : (
              <FileText
                className="text-blue-600 dark:text-blue-300"
                size={22}
              />
            )}

            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-[#c7d5ff] max-w-[210px] truncate">
                {file.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          {progress < 100 ? (
            <button onClick={remove} type="button" className="text-red-500">
              <Trash2 size={16} />
            </button>
          ) : (
            <CheckCircle className="text-green-500" size={18} />
          )}
        </div>

        <div className="w-full bg-gray-200 dark:bg-[#1c2a3a] h-2 mt-2 rounded-full overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className={`h-2 rounded-full transition-all ${
              progress === 100 ? "bg-green-500" : "bg-green-400"
            }`}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full p-4 bg-transparent">
      <Card className="w-full max-w-md mx-auto shadow-lg border border-blue-100 dark:border-[#1f2e44] bg-white dark:bg-[#162233] text-gray-900 dark:text-[#c7d5ff] rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
            {t("documentUpload.title")}
          </CardTitle>

          {uploadError && (
            <div className="bg-red-50 dark:bg-[#3b0f0f] border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 rounded-lg p-3">
              {uploadError}
            </div>
          )}
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div>
              <label className="block font-medium text-gray-700 dark:text-[#c7d5ff] mb-1">
                {t("documentUpload.fields.idCard.label")}
              </label>

              <label
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 border-dashed cursor-pointer transition
                ${
                  dragActive === "idCard"
                    ? "bg-blue-100 dark:bg-[#132b55] border-blue-500"
                    : "border-blue-300 dark:border-[#243247] hover:bg-blue-50 dark:hover:bg-[#0c1324]"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive("idCard");
                }}
                onDragLeave={() => setDragActive(null)}
                onDrop={(e) => handleDrop(e, "idCard")}
              >
                <Upload
                  className="text-blue-600 dark:text-blue-300 mb-1"
                  size={24}
                />
                <span className="text-sm text-blue-700 dark:text-[#c7d5ff]">
                  {t("documentUpload.fields.idCard.placeholder")}
                </span>

                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, "idCard");
                  }}
                />
              </label>

              {documents.idCard &&
                renderPreview(
                  documents.idCard,
                  () => removeFile("idCard"),
                  "idCard"
                )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-[#c7d5ff] mb-1">
                {t("documentUpload.fields.incomeProof.label")}
              </label>

              <label
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 border-dashed cursor-pointer transition
                ${
                  dragActive === "incomeProof"
                    ? "bg-blue-100 dark:bg-[#132b55] border-blue-500"
                    : "border-blue-300 dark:border-[#243247] hover:bg-blue-50 dark:hover:bg-[#0c1324]"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive("incomeProof");
                }}
                onDragLeave={() => setDragActive(null)}
                onDrop={(e) => handleDrop(e, "incomeProof")}
              >
                <Upload
                  className="text-blue-600 dark:text-blue-300 mb-1"
                  size={24}
                />
                <span className="text-sm text-blue-700 dark:text-[#c7d5ff]">
                  {t("documentUpload.fields.incomeProof.placeholder")}
                </span>

                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, "incomeProof");
                  }}
                />
              </label>

              {documents.incomeProof &&
                renderPreview(
                  documents.incomeProof,
                  () => removeFile("incomeProof"),
                  "incomeProof"
                )}
            </div>

            <div>
              <label className="block font-medium text-gray-700 dark:text-[#c7d5ff] mb-1">
                {t("documentUpload.fields.otherDocs.label")}
              </label>

              <label
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 border-dashed cursor-pointer transition
                ${
                  dragActive === "otherDocs"
                    ? "bg-gray-100 dark:bg-[#1a2333] border-gray-500"
                    : "border-gray-300 dark:border-[#243247] hover:bg-gray-50 dark:hover:bg-[#0c1324]"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive("otherDocs");
                }}
                onDragLeave={() => setDragActive(null)}
                onDrop={(e) => handleDrop(e, "otherDocs")}
              >
                <Upload
                  className="text-gray-600 dark:text-[#c7d5ff] mb-1"
                  size={22}
                />
                <span className="text-sm text-gray-600 dark:text-[#c7d5ff]">
                  {t("documentUpload.fields.otherDocs.placeholder")}
                </span>

                <input
                  type="file"
                  multiple
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const files = e.target.files
                      ? Array.from(e.target.files)
                      : [];
                    files.forEach((file) =>
                      handleFileUpload(file, "otherDocs")
                    );
                  }}
                />
              </label>

              {documents.otherDocs.map((file, index) => (
                <div key={`other-${file.name}-${index}`}>
                  {renderPreview(
                    file,
                    () => removeFile("otherDocs", index),
                    "otherDocs"
                  )}
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              disabled={isUploading}
              className="px-6 dark:border-[#243247] dark:text-[#c7d5ff]"
            >
              {t("documentUpload.backButton")}
            </Button>

            <Button
              type="submit"
              disabled={isUploading}
              className="px-6 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isUploading
                ? t("documentUpload.uploading")
                : t("documentUpload.continueButton")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
