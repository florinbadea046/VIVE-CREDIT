import { FiX, FiDownload, FiPrinter, FiUser } from "react-icons/fi";
import jsPDF from "jspdf";
import type { SalesApplication } from "../mock-data";

interface ViewModalProps {
  app: SalesApplication | null;
  open: boolean;
  onClose: () => void;
}

export default function ViewModal({ app, open, onClose }: ViewModalProps) {
  if (!open || !app) return null;

  const handleSave = () => {
    const doc = new jsPDF();
    
    // Titlu
    doc.setFontSize(20);
    doc.text("Detalii Client", 20, 20);
    
    // Linie separator
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);
    
    // Informatii client
    doc.setFontSize(12);
    let yPos = 40;
    const lineHeight = 10;
    
    doc.text(`ID: ${app.id}`, 20, yPos);
    yPos += lineHeight;
    
    doc.text(`Client: ${app.client}`, 20, yPos);
    yPos += lineHeight;
    
    doc.text(`Produs: ${app.product}`, 20, yPos);
    yPos += lineHeight;
    
    doc.text(`Suma: ${app.amount} RON`, 20, yPos);
    yPos += lineHeight;
    
    doc.text(`Status: ${app.status}`, 20, yPos);
    yPos += lineHeight;
    
    doc.text(`Agent: ${app.agent}`, 20, yPos);
    yPos += lineHeight;
    
    doc.text(`Scor: ${app.score}`, 20, yPos);
    
    // Salvează PDF
    doc.save(`detalii-client-${app.id}.pdf`);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[9999]">
      <div className="bg-white dark:bg-gray-800 w-[500px] max-w-[90%] rounded-xl shadow-xl p-6 relative animate-fadeIn">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition text-2xl"
        >
          <FiX />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
          <FiUser /> Detalii Client
        </h2>

        {/* Client information */}
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <div><strong className="text-gray-900 dark:text-gray-100">ID:</strong> {app.id}</div>
          <div><strong className="text-gray-900 dark:text-gray-100">Client:</strong> {app.client}</div>
          <div><strong className="text-gray-900 dark:text-gray-100">Produs:</strong> {app.product}</div>
          <div><strong className="text-gray-900 dark:text-gray-100">Sumă:</strong> {app.amount} RON</div>
          <div><strong className="text-gray-900 dark:text-gray-100">Status:</strong> {app.status}</div>
          <div><strong className="text-gray-900 dark:text-gray-100">Agent:</strong> {app.agent}</div>
          <div><strong className="text-gray-900 dark:text-gray-100">Scor:</strong> {app.score}</div>
        </div>

        {/* Buttons: Save + Print */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 dark:hover:bg-blue-600 transition"
          >
            <FiPrinter /> Printează
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 dark:bg-green-500 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 dark:hover:bg-green-600 transition"
          >
            <FiDownload /> Salvează
          </button>
        </div>
      </div>
    </div>
  );
}