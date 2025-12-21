import { useState } from "react";
import { Filter, Upload, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type {
  DocumentItem,
  DocumentCategory,
  DocumentStatus,
} from "@/modules/dashboard/types/documents";
import DocumentsListCard from "./DocumentsListCard";

interface Props {
  documents: DocumentItem[];
}

type CategoryFilter = DocumentCategory | "all";
type StatusFilter = DocumentStatus | "all";

export default function DocumentsFilters({ documents }: Props) {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [year, setYear] = useState<string>("all");

  const navigate = useNavigate();

  const resetFilters = () => {
    setCategory("all");
    setStatus("all");
    setYear("all");
  };

  const years = Array.from(
    new Set(documents.map((d) => new Date(d.uploadedAt).getFullYear()))
  ).sort((a, b) => b - a);

  const filtered = documents.filter((doc) => {
    const categoryMatch = category === "all" || doc.category === category;
    const statusMatch = status === "all" || doc.status === status;
    const yearValue = new Date(doc.uploadedAt).getFullYear().toString();
    const yearMatch = year === "all" || yearValue === year;
    return categoryMatch && statusMatch && yearMatch;
  });

  return (
    <div className="space-y-4">
      <div className="bg-white border border-blue-100 rounded-2xl p-4 shadow-sm dark:bg-[#1C2534]/60 dark:border-white/10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-3">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-blue-600 dark:text-blue-300" />
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Filtrează documentele
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={resetFilters}
              className="
                flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                bg-gray-100 hover:bg-gray-200 dark:bg-[#2A3B55] dark:hover:bg-[#1C2534] 
                text-gray-800 dark:text-gray-200
                transition shadow-sm
              "
            >
              <RotateCcw size={16} />
              Resetează
            </button>

            <button
              onClick={() => navigate("/dashboard/documents/upload")}
              className="
                flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                bg-blue-600 hover:bg-blue-700 text-white
                transition shadow-sm
              "
            >
              <Upload size={16} />
              Încarcă document
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <select
            className="
              border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              dark:bg-[#2A3B55A6] dark:text-gray-200 dark:border-white/10 dark:hover:bg-[#1C2534]
            "
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoryFilter)}
          >
            <option value="all">Toate tipurile</option>
            <option value="contract">Contracte</option>
            <option value="schedule">Grafice rambursare</option>
            <option value="kyc">Documente KYC</option>
            <option value="income">Documente venit</option>
            <option value="other">Alte documente</option>
          </select>

          <select
            className="
              border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
              dark:bg-[#2A3B55A6] dark:text-gray-200 dark:border-white/10 dark:hover:bg-[#1C2534]
            "
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusFilter)}
          >
            <option value="all">Toate statusurile</option>
            <option value="available">Disponibile</option>
            <option value="processing">În prelucrare</option>
            <option value="expired">Expirate</option>
          </select>

          <select
            className="
              border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white 
              focus:outline-none focus:ring-2 focus:ring-blue-500
              dark:bg-[#2A3B55A6] dark:text-gray-200 dark:border-white/10 dark:hover:bg-[#1C2534]
            "
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="all">Toți anii</option>
            {years.map((y) => (
              <option key={y} value={y.toString()}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>

      <DocumentsListCard documents={filtered} />
    </div>
  );
}
