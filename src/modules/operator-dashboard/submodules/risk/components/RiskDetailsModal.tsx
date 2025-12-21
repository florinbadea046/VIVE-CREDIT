import { useRef, useState } from "react";
import Modal from "../../../components/ui/Modal";
import Button from "@/modules/operator-dashboard/components/ui/Button";

import { ChevronDown, ShieldCheck } from "lucide-react";
import { Menu } from "@headlessui/react";
import toast from "react-hot-toast";
import type { RiskApplication } from "../types";

interface Props {
  application: RiskApplication;
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
}: Props) {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [customDoc, setCustomDoc] = useState<string>("");

  const requestDocsRef = useRef<HTMLDivElement | null>(null);

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

  const availableDocs = ["CI", "Venituri", "Contract muncă", "Altele"];

  const standardDocs = ["CI", "Venituri", "Contract"];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Aplicație: ${application.id}`}
      width="max-w-4xl"
      titleClassName="text-blue-600"
      icon={<ShieldCheck className="w-6 h-6" />}
    >
      {/* Container */}
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
              <strong>Status:</strong> {application.status.replace("_", " ")}
            </p>
            <p>
              <strong>Email:</strong> client@exemplu.com
            </p>
            <p>
              <strong>Telefon:</strong> 0722 123 456
            </p>
            <p className="sm:col-span-2">
              <strong>Adresă:</strong> Str. Exemplu, nr.1, Timișoara
            </p>
          </div>
        </section>

        {/* Financial Info */}
        <section className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h3 className="font-semibold text-lg mb-3 text-gray-700 dark:text-gray-200">
            Date financiare
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 dark:text-gray-300">
            <p>
              <strong>Scor:</strong> {application.score}
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

        {/* Reason Codes */}
        {application.reasonCodes?.length > 0 && (
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

        {/* DOCUMENTS REQUEST */}
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
              className="mt-2"
            >
              Trimite solicitare
            </Button>
          </div>
        </section>
      </div>

      {/* Sticky action bar */}
      <div className="sticky bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur border-t border-gray-200 dark:border-gray-700 p-4 flex flex-wrap items-center justify-end gap-2 z-20">
        {/* Desktop buttons */}
        <div className="hidden sm:flex gap-2 justify-end flex-wrap">
          <Button
            onClick={() => {
              onApprove(application.id);
              toast.success(`Application ${application.id} approved`);
            }}
            className="bg-blue-600 sm:w-auto w-full"
          >
            Aprobă
          </Button>
          <Button
            onClick={() => {
              onReject(application.id);
              toast.error(`Application ${application.id} rejected`);
            }}
            className="bg-blue-600 sm:w-auto w-full"
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
            className="bg-blue-600 sm:w-auto w-full"
          >
            Manual Review
          </Button>
          <Button
            onClick={() => {
              handleScrollToDocs();
              toast(`Scroll to documents section`, { icon: "📄" });
            }}
            className="bg-blue-600 sm:w-auto w-full"
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
            className="bg-blue-600 sm:w-auto w-full "
          >
            Trimite la AML
          </Button>
        </div>

        {/* Mobile dropdown */}
        <div className=" sm:hidden w-full mt-2">
          <Menu as="div" className="relative w-full">
            <Menu.Button className="w-full bg-blue-600 p-2 rounded-md text-white flex justify-between items-center">
              Actions <ChevronDown className="w-4 h-4" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-full bg-white dark:bg-gray-700 rounded-md shadow-lg z-50 flex flex-col">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      onApprove(application.id);
                      toast.success(`Application ${application.id} approved`);
                    }}
                    className={`w-full text-left p-2 ${
                      active ? "bg-blue-100 dark:bg-gray-700" : ""
                    }`}
                  >
                    Aproba
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      onReject(application.id);
                      toast.error(`Application ${application.id} rejected`);
                    }}
                    className={`w-full text-left p-2 ${
                      active ? "bg-blue-100 dark:bg-gray-700" : ""
                    }`}
                  >
                    Respinge
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      onManualReview(application.id);
                      toast(
                        `Application ${application.id} send to manual review`,
                        {
                          icon: "📝",
                        }
                      );
                    }}
                    className={`w-full text-left p-2 ${
                      active ? "bg-blue-100 dark:bg-gray-700" : ""
                    }`}
                  >
                    Manual Review
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      handleScrollToDocs();
                      toast(`Scroll to documents section`, { icon: "📄" });
                    }}
                    className={`w-full text-left p-2 ${
                      active ? "bg-blue-100 dark:bg-gray-700" : ""
                    }`}
                  >
                    Solicita Documente
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => {
                      onSendToAML(application.id);
                      toast(`Application ${application.id} sent to AML`, {
                        icon: "🛡️",
                      });
                    }}
                    className={`w-full text-left p-2 ${
                      active ? "bg-blue-100 dark:bg-gray-700" : ""
                    }`}
                  >
                    Trimite in AML
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </Modal>
  );
}
