import { FiX, FiDownload, FiPrinter, FiUser } from "react-icons/fi";
import type { SalesApplication } from "../mock-data";

interface ViewModalProps {
  app: SalesApplication | null;
  open: boolean;
  onClose: () => void;
}

export default function ViewModal({ app, open, onClose }: ViewModalProps) {
  if (!open || !app) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[9999]">
      <div className="bg-white w-[500px] max-w-[90%] rounded-xl shadow-xl p-6 relative animate-fadeIn">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black transition text-2xl"
        >
          <FiX />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FiUser /> Detalii Client
        </h2>

        {/* Client information */}
        <div className="space-y-3 text-gray-700">
          <div><strong>ID:</strong> {app.id}</div>
          <div><strong>Client:</strong> {app.client}</div>
          <div><strong>Produs:</strong> {app.product}</div>
          <div><strong>Sumă:</strong> {app.amount} RON</div>
          <div><strong>Status:</strong> {app.status}</div>
          <div><strong>Agent:</strong> {app.agent}</div>
          <div><strong>Scor:</strong> {app.score}</div>
        </div>

        {/* Buttons: Save + Print */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <FiPrinter /> Printează
          </button>

          <button
            onClick={() => console.log("SAVE pressed!")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
          >
            <FiDownload /> Salvează
          </button>
        </div>
      </div>
    </div>
  );
}