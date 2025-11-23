import { useState, type ReactNode } from "react";

export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
  className?: string;
}

interface Props<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  onRowClick?: (item: T) => void;
  noResultsText?: string;
}

export default function ApplicationTable<T>({
  data,
  columns,
  pageSize = 10,
  onRowClick,
  noResultsText = "No data found",
}: Props<T>) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="mt-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
      {/* table header */}
      <div
        className="grid px-4 py-4 bg-gray-100 dark:bg-gray-700 font-semibold text-gray-700 dark:text-gray-100"
        style={{
          gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
        }}
      >
        {columns.map((col) => (
          <div key={col.key} className={col.className}>
            {col.label}
          </div>
        ))}
      </div>

      {/* no result */}
      {data.length === 0 && (
        <div className="text-center py-6 text-gray-500">{noResultsText}</div>
      )}

      {/* table rows */}
      {paginatedData.map((item, rowIndex) => (
        <div
          key={rowIndex}
          onClick={() => onRowClick?.(item)}
          className={`grid px-6 py-4 border-t border-gray-100 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer transition ${
            rowIndex === paginatedData.length - 1
              ? "border-b border-gray-100 dark:border-gray-600"
              : ""
          }`}
          style={{
            gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
          }}
        >
          {columns.map((col) => (
            <div
              key={col.key}
              className={`${col.className} text-gray-800 dark:text-gray-100`}
            >
              {col.render ? col.render(item) : (item as any)[col.key]}
            </div>
          ))}
        </div>
      ))}

      {/* pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 p-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 text-white bg-blue-500 rounded-2xl disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 text-white bg-blue-500 rounded-2xl disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
