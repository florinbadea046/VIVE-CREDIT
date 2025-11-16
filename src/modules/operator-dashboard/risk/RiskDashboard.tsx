import { useState } from "react";
import RiskFiltersBar from "./components/RiskFiltersBar";
import RiskApplicationsTable from "./components/RiskApplicationsTable";
import RiskDetailsModal from "./components/RiskDetailsModal";

export default function RiskDashboard() {
  const [filters, setFilters] = useState({ status: "", search: "" });
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  return (
    <div className="p-6 ">
      <h1 className="text-xl font-semibold text-blue-500 mb-4 text-start">
        Risk Dashboard
      </h1>
      <RiskFiltersBar filters={filters} onChange={setFilters} />
      <RiskApplicationsTable filters={filters} onSelect={setSelectedApp} />

      {selectedApp && (
        <RiskDetailsModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </div>
  );
}
