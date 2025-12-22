import { FiX, FiFileText, FiDownload, FiExternalLink } from "react-icons/fi";
import jsPDF from "jspdf";
import type { SalesApplication } from "../mock-data";

interface DocsModalProps {
  app: SalesApplication | null;
  onClose: () => void;
}

export default function DocsModal({ app, onClose }: DocsModalProps) {
  if (!app) return null;

  const documents = [
    { name: "Cerere Credit.pdf", type: "cerere" },
    { name: "CI Client.pdf", type: "ci" },
    { name: "Adeverință venit.pdf", type: "adeverinta" },
  ];

  // Generează PDF demo
  const generateDemoPDF = (type: string) => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text(`Document: ${type}`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Aplicatie: ${app.id}`, 20, 40);
    doc.text(`Client: ${app.client}`, 20, 50);
    doc.text(`Produs: ${app.product}`, 20, 60);
    doc.text(`Suma: ${app.amount} RON`, 20, 70);
    
    return doc;
  };

  // Deschide PDF în fereastră nouă
  const handleOpenInNewTab = (type: string) => {
    const doc = generateDemoPDF(type);
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, '_blank');
  };

  // Descarcă PDF
  const handleDownload = (filename: string, type: string) => {
    const doc = generateDemoPDF(type);
    doc.save(filename);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[9999]">
      <div className="bg-white dark:bg-gray-800 w-[500px] max-w-[90%] rounded-xl shadow-xl p-6 relative animate-fadeIn">

        {/* X CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition text-2xl"
        >
          <FiX />
        </button>

        {/* HEADER */}
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Documente client
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Aplicația: <strong className="text-gray-900 dark:text-gray-100">{app.id}</strong> — {app.client}
        </p>

        {/* DOCUMENT LIST */}
        <div className="space-y-3">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <div className="flex items-center gap-3">
                <FiFileText className="text-gray-600 dark:text-gray-400 text-xl" />
                <span className="text-gray-900 dark:text-gray-100">{doc.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleOpenInNewTab(doc.type)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
                  title="Deschide în fereastră nouă"
                >
                  <FiExternalLink size={18} />
                </button>
                <button 
                  onClick={() => handleDownload(doc.name, doc.type)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
                  title="Descarcă"
                >
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
            className="px-5 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 rounded-lg transition"
          >
            Închide
          </button>
        </div>
      </div>
    </div>
  );
}