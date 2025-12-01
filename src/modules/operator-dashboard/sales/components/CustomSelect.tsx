import { useState, useRef, useEffect } from "react";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

export default function CustomSelect({
  label,
  value,
  onChange,
  options
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col w-full relative" ref={ref}>
      {label && (
        <span className="mb-1 text-sm text-gray-700 font-medium">{label}</span>
      )}

      {/* Trigger */}
      <div
        className="border rounded-lg px-3 py-2 bg-white cursor-pointer shadow-sm flex items-center justify-between"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>
          {options.find((o) => o.value === value)?.label || "Selectează..."}
        </span>

        {/* Săgeata */}
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="border rounded-lg mt-1 bg-white shadow-lg absolute left-0 z-50 w-full">
          {options.map((opt) => (
            <div
              key={opt.value}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
