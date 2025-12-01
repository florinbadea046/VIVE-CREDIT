import { FiX, FiFileText, FiDownload, FiExternalLink } from "react-icons/fi";
import type { SalesApplication } from "../mock-data";

interface DocsModalProps {
  app: SalesApplication | null;
  onClose: () => void;
}

export default function DocsModal({ app, onClose }: DocsModalProps) {
  if (!app) return null;

  // ⚠️ Exemplu documente — ulterior poți lua din DB / API
  const documents = [
    { name: "Cerere Credit.pdf", url: "#" },
    { name: "CI Client.jpg", url: "#" },
    { name: "Adeverință venit.pdf", url: "#" },
  ];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[9999]">
      <div className="bg-white w-[500px] max-w-[90%] rounded-xl shadow-xl p-6 relative animate-fadeIn">

        {/* X CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black transition text-2xl"
        >
          <FiX />
        </button>

        {/* HEADER */}
        <h2 className="text-2xl font-bold mb-4">Documente client</h2>
        <p className="text-gray-600 mb-6">
          Aplicația: <strong>{app.id}</strong> — {app.client}
        </p>

        {/* DOCUMENT LIST */}
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <FiFileText className="text-gray-600 text-xl" />
                <span>{doc.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <button className="text-blue-600 hover:text-blue-800">
                  <FiExternalLink size={18} />
                </button>
                <button className="text-blue-600 hover:text-blue-800">
                  <FiDownload size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
          >
            Închide
          </button>
        </div>
      </div>
    </div>
  );
}