import { useRef, useState } from "react";
import Modal from "../../../components/ui/Modal";
import Button from "@/modules/operator-dashboard/components/ui/Button";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { Menu } from "@headlessui/react";
import toast from "react-hot-toast";
import { formatStatus } from "@/modules/operator-dashboard/utils/formatters";
import type {
  Application,
  CollectionsStatus,
} from "@/modules/operator-dashboard/types/Application";

interface Props {
  application: Application;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onManualReview: (id: string) => void;
  onRequestDocs: (id: string, docs: string[], custom?: string) => void;
  onSendToAML: (id: string) => void;
  onAddNote?: (id: string, text: string) => void;
}

export default function RiskDetailsModal({
  application,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onManualReview,
  onRequestDocs,
  onSendToAML,
  onAddNote,
}: Props) {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [customDoc, setCustomDoc] = useState<string>("");
  const [noteText, setNoteText] = useState<string>("");

  const requestDocsRef = useRef<HTMLDivElement | null>(null);

  const isFinalized =
    application.status === "approved" || application.status === "rejected";

  const availableDocs = ["CI", "Venituri", "Contract muncă", "Altele"];

  function handleScrollToDocs() {
    requestDocsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  function toggleDoc(doc: string) {
    setSelectedDocs((prev) =>
      prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
    );
  }

  const renderCollectionsStatus = (status?: CollectionsStatus) => {
    switch (status) {
      case "current":
        return (
          <span className="text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs font-medium">
            La zi
          </span>
        );
      case "overdue":
        return (
          <span className="text-red-700 bg-red-100 px-2 py-1 rounded-full text-xs font-medium">
            Restant
          </span>
        );
      case "defaulted":
        return (
          <span className="text-red-900 bg-red-200 px-2 py-1 rounded-full text-xs font-medium">
            Impagat
          </span>
        );
      default:
        return (
          <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
            N/A
          </span>
        );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Aplicație: ${application.id}`}
      width="max-w-4xl"
      titleClassName="text-blue-600"
      icon={<ShieldCheck className="w-6 h-6" />}
    >
      <div className="flex flex-col gap-6 pr-2 pb-4">
        {/* CLIENT INFO */}
        <section className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="font-semibold text-lg mb-3 text-gray-700 dark:text-gray-200">
            Client Info
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Nume:</strong> {application.client}
            </p>
            <p>
              <strong>Email:</strong> {application.contact.email}
            </p>
            <p>
              <strong>Telefon:</strong> {application.contact.phone}
            </p>
            <p>
              <strong>Status:</strong> {formatStatus(application.status)}
            </p>
            <p className="sm:col-span-2">
              <strong>Adresă:</strong>{" "}
              {application.address
                ? `${application.address.street}, ${application.address.city}${
                    application.address.country
                      ? ", " + application.address.country
                      : ""
                  }`
                : "-"}
            </p>
            <p>
              <strong>Stare plata:</strong>{" "}
              {renderCollectionsStatus(application.collectionsStatus)}
            </p>
          </div>
        </section>

        {/* FINANCIAL INFO */}
        <section className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="font-semibold text-lg mb-3 text-gray-700 dark:text-gray-200">
            Date financiare
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Scor:</strong> {application.score ?? "-"}
            </p>
            <p>
              <strong>Venit:</strong> 5000 RON
            </p>
            <p>
              <strong>Cheltuieli:</strong> 3000 RON
            </p>
            <p>
              <strong>Suma cerută:</strong> 5000 RON
            </p>
          </div>
        </section>

        {/* REASON CODES */}
        {application.reasonCodes && application.reasonCodes?.length > 0 && (
          <section className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-semibold text-lg mb-3 text-gray-700 dark:text-gray-200">
              Reason Codes
            </h3>
            <ul className="space-y-1 text-gray-500 dark:text-gray-400 text-sm">
              {application.reasonCodes.map((code) => (
                <li key={code}>
                  <strong className="text-gray-700 dark:text-gray-300">
                    {code}
                  </strong>{" "}
                  – {code} description
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* DOCUMENT REQUEST */}
        <section
          ref={requestDocsRef}
          className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <h3 className="font-semibold text-lg mb-3 text-gray-700 dark:text-gray-200">
            Solicitare Documente
          </h3>
          <div className="flex flex-col gap-2">
            {availableDocs.map((doc) => (
              <label
                key={doc}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
              >
                <input
                  type="checkbox"
                  checked={selectedDocs.includes(doc)}
                  onChange={() => toggleDoc(doc)}
                  className="accent-blue-600"
                />
                {doc}
              </label>
            ))}
            <input
              type="text"
              placeholder="Alt document..."
              value={customDoc}
              onChange={(e) => setCustomDoc(e.target.value)}
              className="mt-2 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
            />
            <Button
              onClick={() => {
                onRequestDocs(application.id, selectedDocs, customDoc);
                setSelectedDocs([]);
                setCustomDoc("");
                toast(`Application ${application.id} documents requested`);
              }}
              disabled={isFinalized}
              className={`mt-2 ${
                isFinalized ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              Trimite solicitare
            </Button>
          </div>
        </section>

        {/* NOTES SECTION */}
        <section className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="font-semibold text-lg mb-3 text-gray-700 dark:text-gray-200">
            Notes
          </h3>
          <div className="flex flex-col gap-2">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              placeholder="Scrie o notă..."
            />
            <Button
              onClick={() => {
                if (noteText.trim() && onAddNote) {
                  onAddNote(application.id, noteText.trim());
                  setNoteText("");
                  toast.success("Notă adăugată");
                }
              }}
              disabled={isFinalized}
              className={isFinalized ? "opacity-40 cursor-not-allowed" : ""}
            >
              Adaugă notă
            </Button>

            {application.notes?.map((note, idx) => (
              <div
                key={idx}
                className="text-sm text-gray-500 dark:text-gray-300"
              >
                {note.text}{" "}
                <span className="text-gray-400">({note.time || "–"})</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* STICKY ACTION BAR */}
      <div className="sticky bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-t border-gray-200 dark:border-gray-700 p-4 flex flex-wrap items-center justify-end gap-2 z-20">
        {isFinalized && (
          <div className="w-full p-2 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 rounded-md text-sm flex items-center gap-2">
            ⚠️ Acțiunile nu mai sunt disponibile pentru aplicațiile aprobate sau
            respinse.
          </div>
        )}

        {/* Desktop Buttons */}
        <div className="hidden sm:flex gap-2 justify-end flex-wrap">
          <Button
            onClick={() => {
              onApprove(application.id);
              toast.success(`Application ${application.id} approved`);
            }}
            disabled={isFinalized}
            className={`bg-blue-600 sm:w-auto w-full ${
              isFinalized ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            Aprobă
          </Button>

          <Button
            onClick={() => {
              onReject(application.id);
              toast.error(`Application ${application.id} rejected`);
            }}
            disabled={isFinalized}
            className={`bg-blue-600 sm:w-auto w-full ${
              isFinalized ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            Respinge
          </Button>

          <Button
            onClick={() => {
              onManualReview(application.id);
              toast(`Application ${application.id} send to manual review`, {
                icon: "📝",
              });
            }}
            disabled={isFinalized}
            className={`bg-blue-600 sm:w-auto w-full ${
              isFinalized ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            Revizuire manualǎ
          </Button>

          <Button
            onClick={handleScrollToDocs}
            disabled={isFinalized}
            className={`bg-blue-600 sm:w-auto w-full ${
              isFinalized ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            Solicită Documente
          </Button>

          <Button
            onClick={() => {
              onSendToAML(application.id);
              toast(`Application ${application.id} sent to AML`, {
                icon: "🛡️",
              });
            }}
            disabled={isFinalized}
            className={`bg-blue-600 sm:w-auto w-full ${
              isFinalized ? "opacity-40 cursor-not-allowed" : ""
            }`}
          >
            Trimite la AML
          </Button>
        </div>

        {/* Mobile dropdown */}
        <div className="sm:hidden w-full mt-2">
          <Menu as="div" className="relative w-full">
            <Menu.Button className="w-full bg-blue-600 p-2 rounded-md text-white flex justify-between items-center">
              Actions <ChevronDown className="w-4 h-4" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-full bg-white dark:bg-gray-700 rounded-md shadow-lg z-50 flex flex-col">
              {[
                { label: "Aprobă", action: onApprove },
                { label: "Respinge", action: onReject },
                { label: "Manual Review", action: onManualReview },
                { label: "Solicită Documente", action: handleScrollToDocs },
                { label: "Trimite la AML", action: onSendToAML },
                {
                  label: "Adaugă Notă",
                  action: () => {
                    if (noteText.trim() && onAddNote) {
                      onAddNote(application.id, noteText.trim());
                      setNoteText("");
                      toast.success("Notă adăugată");
                    }
                  },
                },
              ].map((btn, idx) => (
                <Menu.Item key={idx}>
                  {({ active }) => (
                    <button
                      onClick={() => btn.action(application.id)}
                      disabled={isFinalized}
                      className={`w-full text-left p-2 ${
                        active ? "bg-blue-100 dark:bg-gray-700" : ""
                      } ${isFinalized ? "opacity-40 cursor-not-allowed" : ""}`}
                    >
                      {btn.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </Modal>
  );
}
