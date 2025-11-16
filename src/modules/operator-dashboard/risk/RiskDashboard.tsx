import { useState } from "react";
import RiskFiltersBar from "./components/RiskFiltersBar";
import RiskApplicationsTable from "./components/RiskApplicationsTable";
import RiskDetailsModal from "./components/RiskDetailsModal";
import { mockRiskApp } from "./mock-data";

export default function RiskDashboard() {
  const [applications, setApplications] = useState(mockRiskApp);
  const [filters, setFilters] = useState({ status: "", search: "" });
  const [selectedApp, setSelectedApp] = useState<any | null>(null);

  function updateStatus(id: string, newStatus: string) {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
    );
  }
  return (
    <div className="p-6 ">
      <h1 className="text-xl font-semibold text-blue-500 mb-4 text-start">
        Risk Dashboard
      </h1>
      <RiskFiltersBar filters={filters} onChange={setFilters} />
      <RiskApplicationsTable
        applications={applications}
        filters={filters}
        onSelect={setSelectedApp}
      />

      {selectedApp && (
        <RiskDetailsModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onApprove={() => updateStatus(selectedApp.id, "approved")}
          onReject={() => updateStatus(selectedApp.id, "rejected")}
          onRequestDocs={() => updateStatus(selectedApp.id, "manual_reviw")}
        />
      )}
    </div>
  );
}
