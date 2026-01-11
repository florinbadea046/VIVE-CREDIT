import { useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

import ApplicationTable, {
  type Column,
} from "../components/ui/ApplicationTable";
import Modal from "../components/ui/Modal";
import { StatusBadge } from "../components/ui/StatusBadge";
import { useApplications } from "../hooks/ApplicationsContext";
import { PENDING_STATUSES } from "../constants/applicationStatus";
import type { Application, ApplicationStatus } from "../types/Application";
import { formatStatus } from "../utils/formatters";

type Mode = "view" | "edit" | null;

const EDITABLE_STATUS_OPTIONS: ApplicationStatus[] = [
  "pending",
  "manual_review",
  "documents_requested",
  "aml_review",
];

export default function ApplicationsPage() {
  const { applications, updateApplicationFields } = useApplications();
  const [selected, setSelected] = useState<Application | null>(null);
  const [mode, setMode] = useState<Mode>(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const statusQuery = params.get("status") || "all";

  // --------------- FILTER ---------------
  const filteredApplications =
    statusQuery === "all"
      ? applications
      : applications.filter((a) => {
          if (statusQuery === "pending")
            return PENDING_STATUSES.includes(a.status);
          return a.status === statusQuery;
        });

  // --------------- TITLE ---------------
  const titleMap: Record<string, string> = {
    all: "Toate aplicațiile",
    approved: "Aplicațiile aprobate",
    rejected: "Aplicațiile respinse",
    pending: "Aplicațiile în așteptare",
    manual_review: "Aplicațiile în analiză",
    documents_requested: "Documente solicitate",
    aml_review: "AML review",
  };

  // --------------- COLUMNS ---------------
  const columns: Column<Application>[] = [
    { key: "id", label: "ID", width: "120px" },
    { key: "client", label: "Client", width: "200px" },
    {
      key: "income",
      label: "Venit",
      width: "150px",
      align: "left",
      render: (app) =>
        app.income ? `${app.income.amount.toLocaleString()} RON` : "-",
    },
    {
      key: "creditAmount",
      label: "Suma credit",
      width: "150px",
      align: "left",
      render: (app) => `${app.creditAmount.toLocaleString()} RON`,
    },
    {
      key: "status",
      label: "Status",
      width: "150px",
      align: "left",
      render: (app) => <StatusBadge status={app.status} />,
    },
    {
      key: "collectionsStatus",
      label: "Collections",
      width: "150px",
      align: "center",
      render: (app) => {
        switch (app.collectionsStatus) {
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
      },
    },
    {
      key: "actions",
      label: "Actions",
      width: "150px",
      align: "center",
      render: (app) => (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelected(app);
              setMode("view");
            }}
            className="px-3 py-1 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            View
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelected(app);
              setMode("edit");
            }}
            className="px-3 py-1 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600"
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  // --------------- SAVE ---------------
  const handleSave = () => {
    if (!selected) return;
    updateApplicationFields(selected.id, selected);
    setMode(null);
    setSelected(null);
    toast.success("Modificările au fost salvate cu succes!");
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        {titleMap[statusQuery] ?? "Aplicații"}
      </h1>

      <ApplicationTable<Application>
        data={filteredApplications}
        columns={columns}
        pageSize={10}
        selectedRow={selected}
        getRowId={(app) => app.id}
        onRowClick={(app) => {
          setSelected(app);
          setMode("view");
        }}
      />

      {/* VIEW MODAL */}
      <Modal
        isOpen={mode === "view"}
        onClose={() => {
          setMode(null);
          setSelected(null);
        }}
        title="Application details"
      >
        {selected && (
          <div className="space-y-6 text-sm text-gray-700 dark:text-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="font-medium">ID</span>
                <p>{selected.id}</p>
              </div>
              <div>
                <span className="font-medium">Client</span>
                <p>{selected.client}</p>
              </div>
              <div className="inline-flex items-center gap-2">
                <span className="font-medium">Status</span>
                <StatusBadge status={selected.status} />
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Stare plată</h3>
                <p>
                  Status:
                  {selected.collectionsStatus === "current" && (
                    <span className="text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs font-medium ml-2">
                      La zi
                    </span>
                  )}
                  {selected.collectionsStatus === "overdue" && (
                    <span className="text-red-700 bg-red-100 px-2 py-1 rounded-full text-xs font-medium ml-2">
                      Restant
                    </span>
                  )}
                  {selected.collectionsStatus === "defaulted" && (
                    <span className="text-red-900 bg-red-200 px-2 py-1 rounded-full text-xs font-medium ml-2">
                      Impagat
                    </span>
                  )}
                  {!selected.collectionsStatus ||
                  selected.collectionsStatus === "none" ? (
                    <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-full text-xs font-medium ml-2">
                      N/A
                    </span>
                  ) : null}
                </p>
              </div>
              <div>
                <span className="font-medium">Scor</span>
                <p>{selected.score}</p>
              </div>
            </div>

            {/* Credit */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Credit</h3>
              <p>
                <span className="font-medium">Suma solicitată:</span>{" "}
                {selected.creditAmount.toLocaleString()} RON
              </p>
            </div>

            {/* Income */}
            {selected.income && (
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Venit</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <p>
                    <span className="font-medium">Valoare:</span>{" "}
                    {selected.income.amount.toLocaleString()} RON
                  </p>
                  <p>
                    <span className="font-medium">Angajator:</span>{" "}
                    {selected.income.employer || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Tip contract:</span>{" "}
                    {selected.income.contractType || "-"}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        isOpen={mode === "edit"}
        onClose={() => {
          setMode(null);
          setSelected(null);
        }}
        title="Edit application"
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setMode(null);
                setSelected(null);
              }}
              className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        }
      >
        {selected && (
          <div className="space-y-4">
            {/* Client */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                Client
              </label>
              <input
                value={selected.client}
                onChange={(e) =>
                  setSelected({ ...selected, client: e.target.value })
                }
                disabled={
                  selected.status === "approved" ||
                  selected.status === "rejected"
                }
                className="w-full px-3 py-2 rounded border bg-white text-gray-900 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
              />
            </div>

            {/* Income */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                  Venit
                </label>
                <input
                  type="number"
                  value={selected.income?.amount ?? 0}
                  onChange={(e) =>
                    setSelected((prev) =>
                      prev
                        ? {
                            ...prev,
                            income: {
                              ...prev.income,
                              amount: Number(e.target.value),
                            },
                          }
                        : prev
                    )
                  }
                  className="w-full px-3 py-2 rounded border bg-white text-gray-900 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                  Angajator
                </label>
                <input
                  value={selected.income?.employer ?? ""}
                  onChange={(e) =>
                    setSelected((prev) => {
                      if (!prev) return prev;
                      const income = prev.income
                        ? { ...prev.income, employer: e.target.value }
                        : { amount: 0, employer: e.target.value };
                      return { ...prev, income };
                    })
                  }
                  className="w-full px-3 py-2 rounded border bg-white text-gray-900 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                  Tip contract
                </label>
                <select
                  value={selected.income?.contractType ?? ""}
                  onChange={(e) =>
                    setSelected((prev) => {
                      if (!prev) return prev;
                      const income = prev.income
                        ? {
                            ...prev.income,
                            contractType: e.target.value,
                          }
                        : { ammount: 0, contractType: e.target.value };
                      return { ...prev, income };
                    })
                  }
                  className="w-full px-3 py-2 rounded border bg-white text-gray-900 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
                >
                  <option value="">Selectează tipul contractului</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Contractual">Contractual</option>
                </select>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                Status
              </label>
              <select
                value={selected.status}
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    status: e.target.value as ApplicationStatus,
                  })
                }
                disabled={
                  selected.status === "approved" ||
                  selected.status === "rejected"
                }
                className="w-full px-3 py-2 rounded border bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              >
                {EDITABLE_STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {formatStatus(s)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
