export default function RiskFiltersBar({ filters, onChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full mb-4 ">
      {/* Input search */}
      <input
        type="text"
        placeholder="Cauta dupa client..."
        className=" flex-1 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  hover:ring-2 hover:ring-blue-300 transition  duration-200 text-gray-500 w-full sm:w-80"
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
      />
      {/* Select status */}
      <select
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
        className="border border-gray-300 rounded-xl px-3 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:border-blue-500   hover:ring-2 hover:ring-blue-300 transitions  duration-200 w-full sm:w-auto"
      >
        <option value="">Toate</option>
        <option value="pending">In asteptare</option>
        <option value="approved">Aprobate</option>
        <option value="rejected">Respinse</option>
        <option value="">Toate</option>
        <option value="manual_review">Manual review</option>
      </select>
    </div>
  );
}
