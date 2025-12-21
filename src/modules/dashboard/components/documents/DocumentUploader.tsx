import { useState } from "react";
import {
  Upload,
  FileText,
  Trash2,
  Loader2,
  CheckCircle,
  Image as ImageIcon,
  Eye,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addNotification } from "@/components/notifications/notifications.actions";

export default function DocumentUploader() {
  const navigate = useNavigate();

  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [sentMessage, setSentMessage] = useState("");
  const [previewFile, setPreviewFile] = useState<File | null>(null);

  const getFileIcon = (type: string) => {
    if (type === "application/pdf")
      return <FileText size={22} className="text-red-500 dark:text-red-400" />;
    return <ImageIcon size={22} className="text-blue-500 dark:text-blue-300" />;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    setLoading(true);
    setUploadProgress(0);

    const totalFiles = selectedFiles.length;

    for (let i = 0; i < totalFiles; i++) {
      const file = selectedFiles[i];

      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        setError("Doar PDF, JPG sau PNG sunt permise.");
        setLoading(false);
        e.target.value = "";
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("Fișierul este prea mare (max 10MB).");
        setLoading(false);
        e.target.value = "";
        return;
      }

      await new Promise<void>((resolve) => {
        let progress = 0;

        const interval = setInterval(() => {
          progress += 15;
          setUploadProgress(Math.min(progress, 100));

          if (progress >= 100) {
            clearInterval(interval);
            resolve();
          }
        }, 120);
      });

      setFiles((prev) => [...prev, file]);
    }

    setError("");
    setSuccessMessage("Fișierele au fost încărcate cu succes!");
    setTimeout(() => setSuccessMessage(""), 3000);

    setLoading(false);
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    addNotification({
      text: `Au fost trimise ${files.length} document(e) pentru verificare`,
      date: new Date().toISOString(),
      read: false,
      type: "document",
    });

    setSentMessage("Documentele au fost trimise cu succes! 🔥");

    setTimeout(() => {
      navigate("/dashboard/documents");
    }, 3500);

    setFiles([]);
  };

  return (
    <div className="space-y-6">
      <input
        id="fileInput"
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFileChange}
        className="hidden"
      />

      <label
        htmlFor="fileInput"
        className="
          cursor-pointer rounded-xl p-8
          border-2 border-dashed border-blue-300 dark:border-white/20
          bg-blue-50/20 dark:bg-[#2A3B55]/20
          hover:bg-blue-50/40 dark:hover:bg-[#2A3B55]/40
          flex flex-col items-center justify-center
          transition-all
        "
      >
        {loading ? (
          <>
            <Loader2 size={40} className="animate-spin text-blue-600 mb-3" />

            <div className="w-full max-w-xs mt-3">
              <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 dark:bg-blue-400 transition-all"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 text-center">
                {uploadProgress}% încărcat
              </p>
            </div>
          </>
        ) : (
          <Upload size={40} className="text-blue-600 dark:text-blue-300 mb-3" />
        )}

        {!loading && (
          <>
            <p className="font-medium text-blue-700 dark:text-blue-300">
              Încarcă documente
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Acceptă PDF, JPG, PNG (max 10MB)
            </p>
          </>
        )}
      </label>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {successMessage && (
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm">
          <CheckCircle size={18} />
          {successMessage}
        </div>
      )}

      <div
        className="
          p-4 rounded-xl 
          bg-white dark:bg-[#1F2A40]
          border border-blue-100 dark:border-white/10 
          shadow-sm space-y-3
        "
      >
        <p className="font-semibold text-gray-800 dark:text-gray-100">
          Documente încărcate
        </p>

        {files.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Nu ai încărcat niciun document.
          </p>
        ) : (
          <div className="space-y-3">
            {files.map((file, i) => (
              <div
                key={i}
                className="
                  flex items-center justify-between
                  p-3 rounded-lg
                  bg-blue-50/40 dark:bg-[#2A3B55]/30
                  border border-blue-100 dark:border-white/10
                  transition
                "
              >
                <div className="flex items-center gap-3">
                  {getFileIcon(file.type)}

                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {(file.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewFile(file)}
                    className="p-2 rounded-md hover:bg-blue-100 dark:hover:bg-blue-900/40 transition"
                  >
                    <Eye
                      size={18}
                      className="text-blue-600 dark:text-blue-300"
                    />
                  </button>

                  <button
                    onClick={() => removeFile(i)}
                    className="p-2 rounded-md hover:bg-red-100 dark:hover:bg-red-900/40 transition"
                  >
                    <Trash2
                      size={18}
                      className="text-red-600 dark:text-red-400"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {files.length > 0 && (
        <button
          className="w-full py-3 mt-2 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition"
          onClick={handleSubmit}
        >
          Trimite documentele
        </button>
      )}

      {sentMessage && (
        <div className="flex items-center justify-center text-green-600 dark:text-green-400 text-sm mt-2">
          <CheckCircle size={18} className="mr-1" />
          {sentMessage}
        </div>
      )}

      {previewFile && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={() => setPreviewFile(null)}
        >
          <div
            className="bg-white dark:bg-[#1C2534] rounded-xl p-5 shadow-xl max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Preview document
              </h2>
              <button
                onClick={() => setPreviewFile(null)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                <X size={20} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>

            {previewFile.type === "application/pdf" ? (
              <embed
                src={URL.createObjectURL(previewFile)}
                type="application/pdf"
                className="w-full h-[70vh] rounded-lg"
              />
            ) : (
              <img
                src={URL.createObjectURL(previewFile)}
                alt="Document preview"
                className="w-full max-h-[70vh] object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
