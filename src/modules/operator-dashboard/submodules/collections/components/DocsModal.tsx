import { FiX, FiPhone, FiMail, FiCheckCircle, FiClock, FiPlus } from "react-icons/fi";
import { useState } from "react";
import type { CollectionCase } from "../types";

interface DocsModalProps {
  selectedCase: CollectionCase | null;
  open: boolean;
  onClose: () => void;
}

interface PTP {
  id: string;
  caseId: string;
  amount: number;
  promiseDate: string;
  dueDate: string;
  status: "Activ" | "Respectat" | "Rupt";
  notes: string;
}

// PTP-uri mock pentru toți clienții
const initialPTPs: PTP[] = [
  {
    id: "PTP-001",
    caseId: "CL-001",
    amount: 1000,
    promiseDate: "14/12/2025",
    dueDate: "20/12/2025",
    status: "Activ",
    notes: "Client a promis 1000 RON până pe 20 Dec"
  },
  {
    id: "PTP-002",
    caseId: "CL-002",
    amount: 2000,
    promiseDate: "13/12/2025",
    dueDate: "18/12/2025",
    status: "Respectat",
    notes: "Plată efectuată la timp"
  },
  {
    id: "PTP-003",
    caseId: "CL-003",
    amount: 500,
    promiseDate: "10/12/2025",
    dueDate: "15/12/2025",
    status: "Rupt",
    notes: "Client nu a plătit la scadență"
  },
];

export function DocsModal({ selectedCase, open, onClose }: DocsModalProps) {
  const [activeTab, setActiveTab] = useState<"taskuri" | "ptp">("taskuri");
  const [showAddForm, setShowAddForm] = useState(false);
  const [allPTPs, setAllPTPs] = useState<PTP[]>(initialPTPs);

  // Form state
  const [formData, setFormData] = useState({
    amount: "",
    promiseDate: "",
    dueDate: "",
    notes: ""
  });

  if (!open || !selectedCase) return null;

  // Filtrează PTP-urile doar pentru clientul curent
  const casePTPs = allPTPs.filter(ptp => ptp.caseId === selectedCase.id);

  const tasks = [
    { 
      type: "Apel telefonic",
      description: "Contactează clientul pentru discuție plată",
      deadline: "16 Dec 2025",
      status: "Programat",
      icon: FiPhone 
    },
    { 
      type: "Trimitere email",
      description: "Email reminder despre restanță",
      deadline: "17 Dec 2025",
      status: "În așteptare",
      icon: FiMail 
    },
    { 
      type: "Negociere PTP",
      description: "Stabilire plan de plată cu clientul",
      deadline: "18 Dec 2025",
      status: "Programat",
      icon: FiCheckCircle 
    },
    { 
      type: "Follow-up",
      description: "Verificare respectare promisiune plată",
      deadline: "20 Dec 2025",
      status: "Viitor",
      icon: FiClock 
    },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Programat": return "bg-blue-100 text-blue-700";
      case "În așteptare": return "bg-yellow-100 text-yellow-700";
      case "Viitor": return "bg-gray-100 text-gray-700";
      case "Activ": return "bg-blue-100 text-blue-700";
      case "Respectat": return "bg-green-100 text-green-700";
      case "Rupt": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handlePTPStatusChange = (ptpId: string, newStatus: "Respectat" | "Rupt") => {
    setAllPTPs(allPTPs.map(ptp => 
      ptp.id === ptpId ? { ...ptp, status: newStatus } : ptp
    ));
  };

  const handleDeletePTP = (ptpId: string) => {
    if (window.confirm(`Sigur vrei să ștergi PTP-ul ${ptpId}?`)) {
      setAllPTPs(allPTPs.filter(ptp => ptp.id !== ptpId));
    }
  };

  const handleAddPTP = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formatDate = (dateString: string) => {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    };
    
    const newPTP: PTP = {
      id: `PTP-${String(allPTPs.length + 1).padStart(3, '0')}`,
      caseId: selectedCase.id,
      amount: Number(formData.amount),
      promiseDate: formatDate(formData.promiseDate),
      dueDate: formatDate(formData.dueDate),
      status: "Activ",
      notes: formData.notes
    };

    setAllPTPs([...allPTPs, newPTP]);
    setFormData({ amount: "", promiseDate: "", dueDate: "", notes: "" });
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[9999]">
      <div className="bg-white dark:bg-gray-900 w-[700px] max-w-[90%] rounded-xl shadow-xl p-6 relative animate-fadeIn">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 dark:hover:text-white transition text-2xl"
        >
          <FiX />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Documente & Management</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Caz: <strong className="text-gray-900 dark:text-white">{selectedCase.id}</strong> — {selectedCase.client}
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab("taskuri")}
            className={`px-4 py-2 font-medium transition ${
              activeTab === "taskuri"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            📋 Taskuri de colectare
          </button>
          <button
            onClick={() => setActiveTab("ptp")}
            className={`px-4 py-2 font-medium transition ${
              activeTab === "ptp"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            💰 PTP Management
          </button>
        </div>

        {/* Tab Content */}
        <div className="max-h-[450px] overflow-y-auto">
          {activeTab === "taskuri" && (
            <div className="space-y-3">
              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-750 transition border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-3">
                    <task.icon className="text-blue-600 dark:text-blue-400 mt-1" size={20} />
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-800 dark:text-white">{task.type}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{task.description}</p>
                      
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        📅 Deadline: {task.deadline}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "ptp" && (
            <div>
              {/* Add PTP Button or Form */}
              {!showAddForm ? (
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="w-full mb-4 px-4 py-3 bg-blue-50 dark:bg-blue-900/30 border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg text-blue-700 dark:text-blue-400 font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition flex items-center justify-center gap-2"
                >
                  <FiPlus size={20} />
                  Adaugă PTP nou
                </button>
              ) : (
                <form onSubmit={handleAddPTP} className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-300 dark:border-blue-700 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">Adaugă Promisiune de Plată Nouă</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Sumă promisă (RON)</label>
                      <input
                        type="number"
                        required
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded"
                        placeholder="ex: 1000"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Data promisiune</label>
                        <input
                          type="date"
                          required
                          value={formData.promiseDate}
                          onChange={(e) => setFormData({...formData, promiseDate: e.target.value})}
                          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Data scadență</label>
                        <input
                          type="date"
                          required
                          value={formData.dueDate}
                          onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                          className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-white">Note</label>
                      <textarea
                        required
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded"
                        rows={2}
                        placeholder="Detalii despre promisiune..."
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Salvează PTP
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddForm(false);
                          setFormData({ amount: "", promiseDate: "", dueDate: "", notes: "" });
                        }}
                        className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                      >
                        Anulează
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* PTP List - DOAR pentru clientul curent */}
              {casePTPs.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>Nu există PTP-uri pentru acest client</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {casePTPs.map((ptp) => (
                    <div
                      key={ptp.id}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 relative"
                    >
                      {/* Delete button - top right */}
                      <button
                        onClick={() => handleDeletePTP(ptp.id)}
                        className="absolute top-2 right-2 p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition"
                        title="Șterge PTP"
                      >
                        <FiX size={18} />
                      </button>

                      <div className="flex items-start justify-between mb-3 pr-8">
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white text-lg">
                            {ptp.amount} RON
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">ID: {ptp.id}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ptp.status)}`}>
                          {ptp.status}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm mb-3">
                        <p className="text-gray-600 dark:text-gray-400">
                          📅 <strong className="text-gray-900 dark:text-white">Data promisiune:</strong> {ptp.promiseDate}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          ⏰ <strong className="text-gray-900 dark:text-white">Scadență:</strong> {ptp.dueDate}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          📝 <strong className="text-gray-900 dark:text-white">Note:</strong> {ptp.notes}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      {ptp.status === "Activ" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handlePTPStatusChange(ptp.id, "Respectat")}
                            className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
                          >
                            ✓ Marchează Respectat
                          </button>
                          <button
                            onClick={() => handlePTPStatusChange(ptp.id, "Rupt")}
                            className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition"
                          >
                            ✗ Marchează Rupt
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Close button at bottom */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Închide
          </button>
        </div>
      </div>
    </div>
  );
}

export default DocsModal;