import { useLocation } from "react-router-dom";
import { useState } from "react";
import { mockDB } from "../data/mockDB";
import ApplicationTable from "../components/ui/ApplicationTable";
import Modal from "../components/ui/Modal";

import toast from "react-hot-toast";
import type { RiskApplication } from "../submodules/risk/types";

type Mode = "view" | "edit" | null;

const STATUS_OPTIONS: RiskApplication["status"][] = [
  "pending",
  "approved",
  "rejected",
  "manual_review",
];

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<RiskApplication[]>(
    mockDB.riskApplications
  );
  const [selected, setSelected] = useState<RiskApplication | null>(null);
  const [mode, setMode] = useState<Mode>(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const statusQuery = params.get("status") || "all";

  /* ---------------- FILTER ---------------- */
  const filteredApplications =
    statusQuery === "all"
      ? applications
      : applications.filter((a) => {
          if (statusQuery === "pending") {
            return a.status === "pending" || a.status === "manual_review";
          }
          return a.status === statusQuery;
        });

  /* ---------------- TITLE ---------------- */
  const titleMap: Record<string, string> = {
    all: "Toate aplicațiile",
    approved: "Aplicațiile aprobate",
    rejected: "Aplicațiile respinse",
    pending: "Aplicațiile în așteptare",
    manual_review: "Aplicațiile în analiză",
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = () => {
    if (!selected) return;

    setApplications((prev) =>
      prev.map((app) =>
        app.id === selected.id
          ? {
              ...app,
              client: selected.client,
              status: selected.status,
            }
          : app
      )
    );

    setMode(null);
    setSelected(null);

    // SHOW TOAST
    toast.success("Modificările au fost salvate cu succes!");
  };

  /* ---------------- RENDER ---------------- */
  return (
    <div className="w-full max-w-7xl mx-auto p-6 flex flex-col gap-6">
      {/* TITLE */}
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        {titleMap[statusQuery] ?? "Aplicații"}
      </h1>

      {/* TABLE */}
      <ApplicationTable<RiskApplication>
        data={filteredApplications}
        pageSize={10}
        columns={[
          { key: "id", label: "ID", width: "150px" },
          { key: "client", label: "Client", width: "250px" },
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

          { key: "status", label: "Status", width: "160px", align: "left" },
          {
            key: "actions",
            label: "Actions",
            width: "120px",
            align: "center",
            render: (app) => (
              <div className="flex gap-4 flex-start">
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
        ]}
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
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-200">
            <div>
              <strong>ID:</strong> {selected.id}
            </div>
            <div>
              <strong>Nume client:</strong> {selected.client}
            </div>

            {selected.income && (
              <div>
                <strong>Income:</strong>{" "}
                {selected.income.amount.toLocaleString()} RON
              </div>
            )}
            {selected.income && (
              <div>
                <strong>Tip contract:</strong> {selected.income.contractType}
              </div>
            )}
            {selected.income && (
              <div>
                <strong>Angajator:</strong> {selected.income.employer}
              </div>
            )}

            <div>
              <strong>Credit solicitat:</strong>{" "}
              {selected.creditAmount.toLocaleString()} RON
            </div>
            <div>
              <strong>Status:</strong> {selected.status}
            </div>
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
              className="
                px-4 py-2 rounded
                bg-gray-200 text-gray-800
                hover:bg-gray-300
                dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600
              "
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
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                Client
              </label>
              <input
                value={selected.client}
                onChange={(e) =>
                  setSelected({ ...selected, client: e.target.value })
                }
                placeholder="Client name"
                className="
                  w-full px-3 py-2 rounded border
                  bg-white text-gray-900
                  placeholder-gray-400
                  dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500
                  border-gray-300 dark:border-gray-600
                "
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
                Status
              </label>
              <select
                value={selected.status}
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    status: e.target.value as RiskApplication["status"],
                  })
                }
                className="
                  w-full px-3 py-2 rounded border
                  bg-white text-gray-900
                  dark:bg-gray-800 dark:text-gray-100
                  border-gray-300 dark:border-gray-600
                "
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
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
