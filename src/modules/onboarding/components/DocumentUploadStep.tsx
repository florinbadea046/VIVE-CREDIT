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
  const [documents, setDocuments] = useState({
    idCard: initialData.documents?.idCard || null,
    incomeProof: initialData.documents?.incomeProof || null,
    otherDocs: initialData.documents?.otherDocs || [],
  });

  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [dragActive, setDragActive] = useState<string | null>(null);

  const validateFile = (file: File) => {
    if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
      alert("⚠️ Format invalid. Acceptate: PDF, JPG, PNG.");
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("⚠️ Fișierul nu poate depăși 5MB.");
      return false;
    }
    return true;
  };

  const simulateUpload = (key: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setProgressMap((prev) => ({ ...prev, [key]: progress }));
    }, 150);
  };

  const handleFileUpload = (file: File, type: string) => {
    if (!validateFile(file)) return;

    const key = `${type}-${file.name}`;
    simulateUpload(key);

    setDocuments((prev) => {
      if (type === "idCard") return { ...prev, idCard: file };
      if (type === "incomeProof") return { ...prev, incomeProof: file };
      if (type === "otherDocs")
        return { ...prev, otherDocs: [...prev.otherDocs, file] };
      return prev;
    });
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
        const newDocs = [...prev.otherDocs];
        newDocs.splice(index!, 1);
        return { ...prev, otherDocs: newDocs };
      }
      return prev;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!documents.idCard || !documents.incomeProof) {
      alert("⚠️ Încărcați actul de identitate și dovada de venit.");
      return;
    }

    updateData({ documents });
    onNext();
  };

  const renderFilePreview = (
    file: File,
    onRemove: () => void,
    type: string
  ) => {
    const isImage = file.type.startsWith("image/");
    const fileURL = isImage ? URL.createObjectURL(file) : null;
    const key = `${type}-${file.name}`;
    const progress = progressMap[key] || 0;

    return (
      <div className="bg-blue-50 border border-blue-100 rounded-md p-3 mt-2 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isImage ? (
              <img
                src={fileURL!}
                alt="preview"
                className="w-10 h-10 object-cover rounded-md border border-blue-200"
              />
            ) : (
              <FileText className="text-blue-600" size={22} />
            )}
            <div>
              <p className="text-sm font-medium text-blue-800 truncate max-w-[200px] sm:max-w-[240px]">
                {file.name}
              </p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          {progress < 100 ? (
            <button
              type="button"
              onClick={onRemove}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          ) : (
            <CheckCircle className="text-green-600" size={18} />
          )}
        </div>

        <div className="w-full bg-gray-200 h-2 mt-2 rounded-full overflow-hidden">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              progress === 100 ? "bg-green-500" : "bg-green-400"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg border border-blue-100 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-blue-700">
            Pasul 4 — Încărcare documente
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 sm:space-y-5">
            {/* ID CARD */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Act de identitate (CI / Pașaport)
              </label>

              <label
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer text-center transition ${
                  dragActive === "idCard"
                    ? "bg-blue-100 border-blue-500"
                    : "border-blue-300 hover:bg-blue-50"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive("idCard");
                }}
                onDragLeave={() => setDragActive(null)}
                onDrop={(e) => handleDrop(e, "idCard")}
              >
                <Upload className="text-blue-500 mb-1" size={24} />
                <span className="text-sm text-blue-700 leading-tight">
                  Click sau trage fișierul aici
                </span>

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, "idCard");
                  }}
                />
              </label>

              {documents.idCard &&
                renderFilePreview(
                  documents.idCard,
                  () => removeFile("idCard"),
                  "idCard"
                )}
            </div>

            {/* INCOME PROOF */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Dovadă de venit (fluturaș / extras cont)
              </label>

              <label
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer text-center transition ${
                  dragActive === "incomeProof"
                    ? "bg-blue-100 border-blue-500"
                    : "border-blue-300 hover:bg-blue-50"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive("incomeProof");
                }}
                onDragLeave={() => setDragActive(null)}
                onDrop={(e) => handleDrop(e, "incomeProof")}
              >
                <Upload className="text-blue-500 mb-1" size={24} />
                <span className="text-sm text-blue-700 leading-tight">
                  Click sau trage fișierul aici
                </span>

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file, "incomeProof");
                  }}
                />
              </label>

              {documents.incomeProof &&
                renderFilePreview(
                  documents.incomeProof,
                  () => removeFile("incomeProof"),
                  "incomeProof"
                )}
            </div>

            {/* OTHER DOCS */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Alte documente (opțional)
              </label>

              <label
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer text-center transition ${
                  dragActive === "otherDocs"
                    ? "bg-gray-100 border-gray-500"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive("otherDocs");
                }}
                onDragLeave={() => setDragActive(null)}
                onDrop={(e) => handleDrop(e, "otherDocs")}
              >
                <Upload className="text-gray-500 mb-1" size={22} />
                <span className="text-sm text-gray-600 leading-tight">
                  Adaugă alte fișiere
                </span>

                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
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

              {documents.otherDocs.map((file, i) => (
                <div key={`other-${file.name}-${i}`}>
                  {renderFilePreview(
                    file,
                    () => removeFile("otherDocs", i),
                    "otherDocs"
                  )}
                </div>
              ))}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-2 sm:mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="w-full sm:w-auto px-6"
            >
              ⬅ Înapoi
            </Button>

            <Button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              Continuă
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
