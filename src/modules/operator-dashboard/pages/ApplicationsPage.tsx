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
  const [selected, setSelected] = useState<Application | null>(null); // View modal
  const [editDraft, setEditDraft] = useState<Application | null>(null); // Edit modal
  const [mode, setMode] = useState<Mode>(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const statusQuery = params.get("status") || "all";

  // ---------------- FILTER ----------------
  const filteredApplications =
    statusQuery === "all"
      ? applications
      : applications.filter((a) => {
          if (statusQuery === "pending")
            return PENDING_STATUSES.includes(a.status);
          return a.status === statusQuery;
        });

  // ---------------- TITLE ----------------
  const titleMap: Record<string, string> = {
    all: "Toate aplicațiile",
    approved: "Aplicațiile aprobate",
    rejected: "Aplicațiile respinse",
    pending: "Aplicațiile în așteptare",
    manual_review: "Aplicațiile în analiză",
    documents_requested: "Documente solicitate",
    aml_review: "AML review",
  };

  // ---------------- COLUMNS ----------------
  const columns: Column<Application>[] = [
    { key: "id", label: "ID", width: "120px" },
    { key: "client", label: "Client", width: "200px" },
    {
      key: "income",
      label: "Venit",
      width: "150px",
      render: (app) =>
        app.income ? `${app.income.amount.toLocaleString()} RON` : "-",
    },
    {
      key: "creditAmount",
      label: "Sumǎ credit",
      width: "150px",
      render: (app) => `${app.creditAmount.toLocaleString()} RON`,
    },
    {
      key: "status",
      label: "Stare aplicație",
      width: "150px",
      render: (app) => <StatusBadge status={app.status} />,
    },
    {
      key: "collectionsStatus",
      label: "Stare platǎ",
      width: "150px",
      align: "center",
      render: (app) => {
        switch (app.collectionsStatus) {
          case "current":
            return (
              <span className="text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/40 px-2 py-1 rounded-full text-xs">
                La zi
              </span>
            );
          case "overdue":
            return (
              <span className="text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/40 px-2 py-1 rounded-full text-xs">
                Restant
              </span>
            );
          case "defaulted":
            return (
              <span className="text-red-900 bg-red-200 dark:text-red-200 dark:bg-red-900/60 px-2 py-1 rounded-full text-xs">
                Impagat
              </span>
            );
          default:
            return (
              <span className="text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-800 px-2 py-1 rounded-full text-xs">
                N/A
              </span>
            );
        }
      },
    },
    {
      key: "actions",
      label: "Acțiuni",
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
            className="px-3 py-1 text-sm rounded bg-blue-500 hover:bg-blue-600 text-white"
          >
            View
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditDraft({
                ...structuredClone(app),
                income: app.income ?? {
                  amount: 0,
                  employer: "",
                  contractType: "",
                },
                status: app.status,
              });
              setMode("edit");
            }}
            className="px-3 py-1 text-sm rounded bg-blue-500 hover:bg-blue-600 text-white"
          >
            Edit
          </button>
        </div>
      ),
    },
  ];

  // ---------------- SAVE ----------------
  const handleSave = () => {
    if (!editDraft) return;
    updateApplicationFields(editDraft.id, editDraft);
    toast.success("Modificările au fost salvate cu succes!");
    setEditDraft(null);
    setMode(null);
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
        getRowId={(app) => app.id}
        onRowClick={(app) => {
          setSelected(app);
          setMode("view");
        }}
      />

      {/* ================= VIEW MODAL ================= */}
      <Modal
        isOpen={mode === "view"}
        onClose={() => {
          setSelected(null);
          setMode(null);
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
              <div className="flex items-center gap-2">
                <span className="font-medium">Status</span>
                <StatusBadge status={selected.status} />
              </div>
              <div>
                <span className="font-medium">Scor</span>
                <p>{selected.score}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="font-semibold mb-2">Stare plată</h3>
              <p>
                Status:
                {selected.collectionsStatus === "current" && (
                  <span className="text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/40 px-2 py-1 rounded-full text-xs ml-2">
                    La zi
                  </span>
                )}
                {selected.collectionsStatus === "overdue" && (
                  <span className="text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/40 px-2 py-1 rounded-full text-xs ml-2">
                    Restant
                  </span>
                )}
                {selected.collectionsStatus === "defaulted" && (
                  <span className="text-red-900 bg-red-200 dark:text-red-200 dark:bg-red-900/60 px-2 py-1 rounded-full text-xs ml-2">
                    Impagat
                  </span>
                )}
                {!selected.collectionsStatus ||
                selected.collectionsStatus === "none" ? (
                  <span className="text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-800 px-2 py-1 rounded-full text-xs ml-2">
                    N/A
                  </span>
                ) : null}
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h3 className="font-semibold mb-2">Credit</h3>
              <p>
                <span className="font-medium">Suma:</span>{" "}
                {selected.creditAmount.toLocaleString()} RON
              </p>
            </div>

            {selected.income && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
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
      {/* ================= EDIT MODAL ================= */}
      <Modal
        isOpen={mode === "edit"}
        onClose={() => {
          setEditDraft(null);
          setMode(null);
        }}
        title="Edit application"
        footer={
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setEditDraft(null);
                setMode(null);
              }}
              className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-100"
            >
              Cancel
            </button>
            {editDraft?.status !== "rejected" && (
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save
              </button>
            )}
          </div>
        }
      >
        {editDraft && (
          <div className="space-y-4">
            {/* ------------------ ALERT MESSAGES ------------------ */}
            {editDraft.status === "rejected" && (
              <p className="text-red-700 dark:text-red-400 text-sm font-medium">
                Aplicația a fost respinsă, nu se pot face modificări.
              </p>
            )}
            {editDraft.status === "approved" && (
              <p className="text-green-700 dark:text-green-300 text-sm font-medium">
                Aplicația este aprobată. Starea aplicației nu poate fi
                schimbatǎ.
              </p>
            )}

            {/* ------------------ CLIENT ------------------ */}
            <div>
              <label className="block text-sm font-medium mb-1">Client</label>
              <input
                value={editDraft.client}
                onChange={(e) =>
                  setEditDraft({ ...editDraft, client: e.target.value })
                }
                disabled={editDraft.status === "rejected"} // disabled dacă respins
                className="w-full px-3 py-2 rounded border bg-white dark:bg-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
            </div>

            {/* ------------------ INCOME ------------------ */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="number"
                value={editDraft.income?.amount ?? 0}
                onChange={(e) =>
                  setEditDraft({
                    ...editDraft,
                    income: {
                      ...editDraft.income,
                      amount: Number(e.target.value),
                    },
                  })
                }
                disabled={editDraft.status === "rejected"}
                className="px-3 py-2 rounded border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              />

              <input
                value={editDraft.income?.employer ?? ""}
                onChange={(e) =>
                  setEditDraft({
                    ...editDraft,
                    income: {
                      amount: editDraft.income?.amount ?? 0,
                      employer: e.target.value,
                    },
                  })
                }
                disabled={editDraft.status === "rejected"}
                className="px-3 py-2 rounded border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              />

              <select
                value={editDraft.income?.contractType ?? ""}
                onChange={(e) =>
                  setEditDraft({
                    ...editDraft,
                    income: {
                      amount: editDraft.income?.amount ?? 0,
                      contractType: e.target.value,
                    },
                  })
                }
                disabled={editDraft.status === "rejected"}
                className="px-3 py-2 rounded border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              >
                <option value="">Tip contract</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Freelance">Freelance</option>
                <option value="Contractual">Contractual</option>
              </select>
            </div>

            {/* ------------------ STATUS ------------------ */}
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={editDraft.status}
                onChange={(e) =>
                  setEditDraft({
                    ...editDraft,
                    status: e.target.value as ApplicationStatus,
                  })
                }
                disabled={
                  editDraft.status === "approved" ||
                  editDraft.status === "rejected"
                }
                className="w-full px-3 py-2 rounded border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              >
                {editDraft.status !== "approved" &&
                  editDraft.status !== "rejected" && (
                    <>
                      {EDITABLE_STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {formatStatus(s)}
                        </option>
                      ))}
                      <option value="approved">Aprobat</option>
                      <option value="rejected">Respins</option>
                    </>
                  )}
                {(editDraft.status === "approved" ||
                  editDraft.status === "rejected") && (
                  <option value={editDraft.status}>
                    {formatStatus(editDraft.status)}
                  </option>
                )}
              </select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
