import { FiX, FiDownload, FiPrinter, FiUser } from "react-icons/fi";
import jsPDF from 'jspdf';

interface Props {
  selectedCase: any;
  open: boolean;
  onClose: () => void;
}

export function CaseViewModal({ selectedCase, open, onClose }: Props) {
  if (!open || !selectedCase) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Titlu
    doc.setFontSize(18);
    doc.text('Detalii Client', 20, 20);
    
    // Linie separator
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);
    
    // Informații client
    doc.setFontSize(12);
    let y = 40;
    doc.text('ID: ' + selectedCase.id, 20, y);
    y += 10;
    doc.text('Client: ' + selectedCase.client, 20, y);
    y += 10;
    doc.text('Suma: ' + selectedCase.amount + ' RON', 20, y);
    y += 10;
    doc.text('Zile intarziere: ' + selectedCase.daysLate, 20, y);
    y += 10;
    doc.text('Status: ' + selectedCase.status, 20, y);
    y += 10;
    doc.text('Agent: ' + selectedCase.agent, 20, y);
    
    // Descarcă PDF direct
    doc.save('client-' + selectedCase.id + '.pdf');
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[9999]">
      <div className="bg-white dark:bg-gray-900 w-[500px] max-w-[90%] rounded-xl shadow-xl p-6 relative animate-fadeIn">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 dark:hover:text-white transition text-2xl"
        >
          <FiX />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
          <FiUser size={20} className="text-gray-700 dark:text-gray-300" />
          Detalii Client
        </h2>

        {/* Client information */}
        <div className="space-y-3 text-gray-700 dark:text-gray-300">
          <div><strong className="text-gray-900 dark:text-white">ID:</strong> {selectedCase.id}</div>
          <div><strong className="text-gray-900 dark:text-white">Client:</strong> {selectedCase.client}</div>
          <div><strong className="text-gray-900 dark:text-white">Suma:</strong> {selectedCase.amount} RON</div>
          <div><strong className="text-gray-900 dark:text-white">Zile întârziere:</strong> {selectedCase.daysLate}</div>
          <div><strong className="text-gray-900 dark:text-white">Status:</strong> {selectedCase.status}</div>
          <div><strong className="text-gray-900 dark:text-white">Agent:</strong> {selectedCase.agent}</div>
        </div>

        {/* Buttons: Print + Save */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <FiPrinter /> Printează
          </button>

          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
          >
            <FiDownload /> Salvează
          </button>
        </div>
      </div>
    </div>
  );
}

export default CaseViewModal;