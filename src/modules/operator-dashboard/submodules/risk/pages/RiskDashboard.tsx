import { useState } from "react";
import RiskFiltersBar from "../components/RiskFiltersBar";
import RiskDetailsModal from "../components/RiskDetailsModal";
import { mockRiskApp } from "../mock-data";
import RiskKpiCards from "../components/RiskKpiCards";
import ApplicationTable, {
  type Column,
} from "../../../components/ui/ApplicationTable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { reasonCodeMap } from "../constants/reasoneCodeMap";

export interface RiskApplication {
  id: string;
  client: string;
  score: number;
  status: string;
  reasonCodes: string[];
}

export default function RiskDashboard() {
  const [applications, setApplications] = useState<RiskApplication[]>(mockRiskApp);
  const [filters, setFilters] = useState({ status: "", search: "" });
  const [selectedApp, setSelectedApp] = useState<RiskApplication | null>(null);

  // update application status
  function updateStatus(id: string, newStatus: string) {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  }
  //filtered application
  const filteredApplications = applications.filter((app) => {
    const matchesStatus = !filters.status || app.status === filters.status;
    const matchesSearch =
      !filters.search ||
      app.client.toLowerCase().includes(filters.search.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  // table columns
  const columns: Column<RiskApplication>[] = [
    { key: "id", label: "ID Aplicatie" },
    { key: "client", label: "Client" },
    {
      key: "status",
      label: "Status",
      render: (app) => {
        const getStatusColor = (status: string) => {
          switch (status) {
            case "approved":
              return "text-green-600 bg-green-100";
            case "rejected":
              return "text-red-600 bg-red-100";
            case "manual_review":
              return "text-yellow-600 bg-yellow-100";
            case "pending":
            default:
              return "text-blue-600 bg-blue-100";
          }
        };
        return (
          <span
            className={`px-2 py-1 text-xs rounded-lg ${getStatusColor(
              app.status
            )}`}
          >
            {app.status.replace("_", " ")}
          </span>
        );
      },
    },
    { key: "Scor", label: "Scor" },
    {
      key: "reasonCodes",
      label: "Reason Codes",
      render: (app) => {
        if (!app.reasonCodes?.length)
          return <span className="text-blue-600 text-xl">-</span>;
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <span className="text-blue-600 underline cursor-help">
                  {app.reasonCodes[0]}
                  {app.reasonCodes.length > 1 && " + more"}
                </span>
              </TooltipTrigger>

              <TooltipContent className="max-w-xs p-3 text-sm bg-white shadow-lg border rounded-md ">
                <div>Reason Codes:</div>
                {app.reasonCodes.map((code, index) => (
                  <div key={index} className="mb-1 text-gray-500">
                    <strong>{code}</strong> - {reasonCodeMap[code]}
                  </div>
                ))}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
  ];

  return (
    <div className=" flex flex-col flex-1 w-full h-full p-6 ">
      <h1 className="text-xl font-semibold text-blue-500 mb-4 mt-2 text-start">
        Risk Dashboard
      </h1>
      <RiskKpiCards />
      <RiskFiltersBar filters={filters} onChange={setFilters} />
      <ApplicationTable
        data={filteredApplications}
        columns={columns}
        pageSize={6}
        onRowClick={setSelectedApp}
        noResultsText="Nicio aplicatie gasita"
      />

      {selectedApp && (
        <RiskDetailsModal
          application={selectedApp}
          isOpen={!!selectedApp}
          onClose={() => setSelectedApp(null)}
          onApprove={() => updateStatus(selectedApp.id, "approved")}
          onReject={() => updateStatus(selectedApp.id, "rejected")}
          onRequestDocs={() => updateStatus(selectedApp.id, "manual_reviw")}
        />
      )}
    </div>
  );
}
