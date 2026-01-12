import FilterInput from "../../../components/ui/FilterInput";
import FilterSelect from "../../../components/ui/FilterSelect";

interface Props {
  filters: { status: string; search: string };
  onChange: (filters: { status: string; search: string }) => void;
}

export default function RiskFiltersBar({ filters, onChange }: Props) {
  const statusOptions = [
    { label: "Toate", value: "" },
    { label: "În așteptare", value: "pending" },
    { label: "Manual review", value: "manual_review" },
    { label: "Documente cerute", value: "documents_requested" },
    { label: "Trimise AML", value: "aml_review" },
    { label: "Aprobate", value: "approved" },
    { label: "Respinse", value: "rejected" },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full mb-4">
      <div className=" flex flex-1 gap-2">
        <FilterInput
          value={filters.search}
          placeholder="Caută după nume client..."
          onChange={(v) => onChange({ ...filters, search: v })}
        />

        <button
          onClick={() => onChange({ status: "", search: "" })}
          className="px-2 py-1 bg-blue-600 dark:bg-blue-600 text-white dark:text-blue-100 rounded hover:bg-blue-700 dark:hover:bg-blue-700"
        >
          Resetare
        </button>
      </div>

      <div className="flex-shrink-0">
        <FilterSelect
          value={filters.status}
          options={statusOptions}
          onChange={(v) => onChange({ ...filters, status: v })}
        />
      </div>
    </div>
  );
}
