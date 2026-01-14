import { useMemo, useState } from "react";
import RiskFiltersBar from "../components/RiskFiltersBar";
import RiskDetailsModal from "../components/RiskDetailsModal";
import RiskKpiCards from "../components/RiskKpiCards";

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

import type { Application } from "@/modules/operator-dashboard/types/Application";
import { StatusBadge } from "@/modules/operator-dashboard/components/ui/StatusBadge";
import { useApplications } from "@/modules/operator-dashboard/hooks/ApplicationsContext";

export default function RiskDashboard() {
  const { applications, updateStatus, addNote, requestDocuments } =
    useApplications();

  const [filters, setFilters] = useState({ status: "", search: "" });
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesStatus = !filters.status || app.status === filters.status;
      const matchesSearch =
        !filters.search ||
        app.client.toLowerCase().includes(filters.search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [applications, filters]);

  const columns: Column<Application>[] = [
    {
      key: "id",
      label: "ID",
      className: "min-w-[80px]",
    },

    {
      key: "client",
      label: "Client",
      className: "min-w-[120px] sm:min-w-[150px]",
    },
    {
      key: "score",
      label: "Risc",
      className: "min-w-[80px]",
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
      label: "Stare aplicație",
      className: "min-w-[100px]",
      render: (app) => {
        return <StatusBadge status={app.status} />;
      },
    },
    {
      key: "reasonCodes",
      label: "Motiv",
      className: "hidden md:block min-w-[120px]",
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
    },
    {
      key: "actions",
      label: "Acțiuni",
      className: "min-w-[100px]",
      render: (app) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedApp(app);
            }}
            className="px-2 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            Revizuire
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
        Panou Risc
      </h1>

      <RiskKpiCards applications={applications} />
      <RiskFiltersBar filters={filters} onChange={setFilters} />

      <div className="overflow-x-auto">
        <ApplicationTable
          data={filteredApplications}
          columns={columns}
          pageSize={8}
          selectedRow={selectedApp}
          getRowId={(app) => app.id}
          onRowClick={(app) => setSelectedApp(app)}
          noResultsText="Nicio aplicație găsită"
        />
      </div>

      {selectedApp && (
        <RiskDetailsModal
          application={selectedApp}
          isOpen={!!selectedApp}
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
            requestDocuments(id, docs, custom || "");
            setSelectedApp(null);
          }}
          onSendToAML={(id) => {
            updateStatus(id, "aml_review");
            setSelectedApp(null);
          }}
          onAddNote={(id, text) => addNote(id, text)}
        />
      )}
    </div>
  );
}
