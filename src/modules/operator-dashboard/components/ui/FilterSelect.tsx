interface FilterSelectProps {
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  className?: string;
}

export default function FilterSelect({
  value,
  options,
  onChange,
  className,
}: FilterSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`border border-gray-300 rounded-xl px-3 py-2 text-gray-500 focus:outline-none focus:ring-2 focus:border-blue-500 hover:ring-2 hover:ring-blue-300 transition duration-200 w-full sm:w-auto ${className}`}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
