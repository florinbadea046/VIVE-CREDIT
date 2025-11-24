import FilterInput from "../../../components/ui/FilterInput";
import FilterSelect from "../../../components/ui/FilterSelect";

interface Props {
  filters: {
    status: string;
    search: string;
  };
  onChange: (filters: { status: string; search: string }) => void;
}

export default function RiskFiltersBar({ filters, onChange }: Props) {
  const statusOptions = [
    { label: "Toate", value: "" },
    { label: "In aspteptare", value: "pending" },
    { label: "Aprobate", value: "approved" },
    { label: "Respinse", value: "rejected" },
    { label: "Manual review", value: "manual_review" },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full mb-4 ">
      {/* Input search */}

      <FilterInput
        value={filters.search}
        placeholder="Cauta dupa nume"
        onChange={(value) => onChange({ ...filters, search: value })}
      />

      {/* Select status */}
      <FilterSelect
        value={filters.status}
        options={statusOptions}
        onChange={(value) => onChange({ ...filters, status: value })}
      />
    </div>
  );
}
