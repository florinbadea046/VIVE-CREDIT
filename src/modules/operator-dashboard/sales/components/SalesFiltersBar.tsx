interface SalesFilters {
  status: string;
  search: string;
  product: string;
  agent: string;
}

interface SalesFiltersBarProps {
  filters: SalesFilters;
  setFilters: (filters: SalesFilters) => void;
}

export default function SalesFiltersBar({ filters, setFilters }: SalesFiltersBarProps) {
  const resetFilters = () =>
    setFilters({
      status: "Toate",
      search: "",
      product: "Toate",
      agent: "",
    });

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">

      {/* Search client */}
      <input
        type="text"
        placeholder="Caută client..."
        className="border p-2 rounded w-full md:w-1/3"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />

      {/* Produs */}
      <select
        className="border p-2 rounded w-full md:w-40"
        value={filters.product}
        onChange={(e) =>
          setFilters({ ...filters, product: e.target.value })
        }
      >
        <option value="Toate">Toate</option>
        <option value="Credit Casa">Credit Casa</option>
        <option value="Credit Auto">Credit Auto</option>
        <option value="Card Credit">Card Credit</option>
      </select>

      {/* Status */}
      <select
        className="border p-2 rounded w-full md:w-40"
        value={filters.status}
        onChange={(e) =>
          setFilters({ ...filters, status: e.target.value })
        }
      >
        <option value="Toate">Toate</option>
        <option value="Nou">Nou</option>
        <option value="În lucru">În lucru</option>
        <option value="Finalizat">Finalizat</option>
      </select>

      {/* Agent */}
      <input
        type="text"
        placeholder="Caută agent..."
        className="border p-2 rounded w-full md:w-40"
        value={filters.agent}
        onChange={(e) => setFilters({ ...filters, agent: e.target.value })}
      />

      {/* Reset button */}
      <button
        onClick={resetFilters}
        className="px-5 py-2 bg-blue-600 text-white rounded-xl"
      >
        Resetează filtre
      </button>
    </div>
  );
}