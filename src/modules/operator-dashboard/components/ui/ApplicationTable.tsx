import { useState, type ReactNode } from "react";

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (item: T) => ReactNode;
  className?: string;
  headerClassName?: string;
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
  const paginated = data.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="mt-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden">
      {/* SCROLL WRAPPER */}
      <div className="overflow-x-auto w-full">
        {/* HEADER */}
        <div
          className="
          grid px-4 py-3 gap-x-2 min-w-max
          bg-gray-100 dark:bg-gray-700 
          font-semibold text-gray-700 dark:text-gray-100 
          text-sm
        "
          style={{
            gridTemplateColumns: columns
              .map((_, i) =>
                i === columns.length - 1 ? "max-content" : "minmax(120px,1fr)"
              )
              .join(" "),
          }}
        >
          {columns.map((col) => (
            <div
              key={String(col.key)}
              className={`truncate ${
                col.headerClassName ?? col.className ?? ""
              }`}
            >
              {col.label}
            </div>
          ))}
        </div>

        {/* EMPTY STATE*/}
        {data.length === 0 && (
          <div className="text-center py-6 text-gray-500">{noResultsText}</div>
        )}

        {/* ROWS */}
        {paginated.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onRowClick?.(item)}
            className="
            grid  px-4 py-3 gap-x-2 min-w-max
            border-b border-gray-100 dark:border-gray-700
            text-sm text-gray-800 dark:text-gray-100
            hover:bg-blue-50 dark:hover:bg-gray-700
            transition cursor-pointer
          "
            style={{
              gridTemplateColumns: columns
                .map((_, i) =>
                  i === columns.length - 1 ? "max-content" : "minmax(120px,1fr)"
                )
                .join(" "),
            }}
          >
            {columns.map((col) => {
              const value = item[col.key];

              return (
                <div
                  key={String(col.key)}
                  className={`${
                    col.className ?? ""
                  } flex items-center break-words whitespace-normal min-w-0`}
                >
                  {col.render
                    ? col.render(item)
                    : value !== undefined &&
                      (typeof value === "string" ||
                        typeof value === "number" ||
                        typeof value === "boolean")
                    ? String(value)
                    : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 p-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="
              px-3 py-1 text-sm
              bg-blue-500 text-white rounded-lg 
              disabled:opacity-40
            "
          >
            Prev
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="
              px-3 py-1 text-sm
              bg-blue-500 text-white rounded-lg 
              disabled:opacity-40
            "
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
