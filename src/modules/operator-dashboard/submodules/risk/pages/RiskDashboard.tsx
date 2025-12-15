import { useMemo, useState } from "react";
import RiskFiltersBar from "../components/RiskFiltersBar";
import RiskDetailsModal from "../components/RiskDetailsModal";
import RiskKpiCards from "../components/RiskKpiCards";
import { mockDB } from "@/modules/operator-dashboard/data/mockDB";
import ApplicationTable, {
  type Column,
} from "../../../components/ui/ApplicationTable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { reasonCodeMap } from "../constants/reasoneCodeMap";
import type { RiskApplication } from "../types";

export default function RiskDashboard() {
  const [applications, setApplications] = useState<RiskApplication[]>(
    mockDB.riskApplications
  );
  const [filters, setFilters] = useState({ status: "", search: "" });
  const [selectedApp, setSelectedApp] = useState<RiskApplication | null>(null);

  const updateStatus = (id: string, newStatus: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  };

  const handleAddNote = (id: string, text: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              notes: [
                ...(app.notes ?? []),
                { text, time: new Date().toISOString() },
              ],
            }
          : app
      )
    );
  };

  const handleRequestDocs = (id: string, docs: string[], custom: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? {
              ...app,
              requestedDocuments: [
                ...(app.requestedDocuments ?? []),
                ...docs,
                ...(custom ? [custom] : []),
              ],
              status: "documents_requested",
            }
          : app
      )
    );
  };

  const handleSendToAML = (id: string) => updateStatus(id, "aml_review");

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesStatus = !filters.status || app.status === filters.status;
      const matchesSearch =
        !filters.search ||
        app.client.toLowerCase().includes(filters.search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [applications, filters]);

  const columns: Column<RiskApplication>[] = [
    { key: "id", label: "ID" },
    { key: "client", label: "Client" },
    {
      key: "score",
      label: "Risk",
      render: (app) => {
        const score = app.score ?? 0;
        const level = score >= 700 ? "Low" : score >= 400 ? "Medium" : "High";
        const map: Record<string, string> = {
          Low: "text-green-700 bg-green-100",
          Medium: "text-yellow-700 bg-yellow-100",
          High: "text-red-700 bg-red-100",
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${map[level]}`}
          >
            {level}
          </span>
        );
      },
    },
    {
      key: "status",
      label: "Status",
      render: (app) => {
        const styleMap: Record<string, string> = {
          approved: "text-green-700 bg-green-100",
          rejected: "text-red-700 bg-red-100",
          manual_review: "text-yellow-700 bg-yellow-100",
          documents_requested: "text-indigo-700 bg-indigo-100",
          aml_review: "text-purple-700 bg-purple-100",
          pending: "text-blue-700 bg-blue-100",
        };
        const formatStatus = (s: string) =>
          s
            .split("_")
            .map((w) => w[0].toUpperCase() + w.slice(1))
            .join(" ");
        return (
          <span
            className={`px-2 py-1 text-xs rounded-lg font-medium ${
              styleMap[app.status]
            }`}
          >
            {formatStatus(app.status)}
          </span>
        );
      },
    },
    {
      key: "reasonCodes",
      label: "Reason",
      render: (app) => {
        if (!app.reasonCodes?.length)
          return <span className="text-blue-600 text-sm">-</span>;
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="text-blue-600 text-sm underline cursor-help">
                  {app.reasonCodes[0]}
                  {app.reasonCodes.length > 1 && " +"}
                </span>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-3 text-sm bg-white dark:bg-gray-800 shadow-lg border rounded-md">
                <div className="font-medium mb-1">Reason Codes:</div>
                {app.reasonCodes.map((code, index) => (
                  <div
                    key={index}
                    className="mb-1 text-gray-500 dark:text-gray-300"
                  >
                    <strong>{code}</strong> - {reasonCodeMap[code]}
                  </div>
                ))}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
      className: "hidden md:block",
    },

    {
      key: "actions",
      label: "Acțiuni",
      render: (app) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedApp(app);
            }}
            className="px-2 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            Review
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto">
      <h1 className="text-xl font-semibold text-blue-500 mb-4 mt-2">
        Risk Dashboard
      </h1>

      <RiskKpiCards applications={applications} />
      <RiskFiltersBar filters={filters} onChange={setFilters} />

      <div className="overflow-x-auto">
        <ApplicationTable
          data={filteredApplications}
          columns={columns}
          pageSize={8}
          onRowClick={(app) => setSelectedApp(app)}
          noResultsText="Nicio aplicație găsită"
        />
      </div>

      {selectedApp !== null && (
        <RiskDetailsModal
          application={selectedApp}
          isOpen={selectedApp !== null}
          onClose={() => setSelectedApp(null)}
          onApprove={(id) => {
            updateStatus(id, "approved");
            setSelectedApp(null);
          }}
          onReject={(id) => {
            updateStatus(id, "rejected");
            setSelectedApp(null);
          }}
          onManualReview={(id) => {
            updateStatus(id, "manual_review");
            setSelectedApp(null);
          }}
          onRequestDocs={(id, docs, custom) => {
            handleRequestDocs(id, docs, custom);
            setSelectedApp(null);
          }}
          onSendToAML={(id) => {
            handleSendToAML(id);
            setSelectedApp(null);
          }}
          onAddNote={(id, text) => handleAddNote(id, text)}
        />
      )}
    </div>
  );
}
