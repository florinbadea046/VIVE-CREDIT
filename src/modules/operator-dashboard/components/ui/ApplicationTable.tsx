import { useState, type ReactNode } from "react";

export interface Column<T> {
  key: keyof T | "actions";
  label: string;
  width?: string;
  render?: (item: T) => ReactNode;
  className?: string;
  headerClassName?: string;
  align?: "left" | "center" | "right";
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

  const alignClass = (align?: "left" | "center" | "right") =>
    align === "right"
      ? "text-right"
      : align === "center"
      ? "text-center"
      : "text-left";

  const gridTemplate = columns.map((c) => c.width ?? "1fr").join(" ");

  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        {/* HEADER */}
        <div
          className="grid px-4 py-3 bg-gray-100 dark:bg-gray-700 font-semibold text-gray-700 dark:text-gray-100 text-sm"
          style={{ gridTemplateColumns: gridTemplate }}
        >
          {columns.map((col) => (
            <div
              key={String(col.key)}
              className={`${alignClass(col.align)} ${
                col.headerClassName ?? ""
              }`}
            >
              {col.label}
            </div>
          ))}
        </div>

        {/* ROWS */}
        {paginated.map((item, idx) => (
          <div
            key={idx}
            onClick={() => onRowClick?.(item)}
            className="grid px-4 py-3 border-b border-gray-100 dark:border-gray-700 text-sm text-gray-800 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 transition cursor-pointer"
            style={{ gridTemplateColumns: gridTemplate }}
          >
            {columns.map((col) => {
              if (col.key === "actions") {
                return (
                  <div
                    key={String(col.key)}
                    className={`flex items-center px-2 ${alignClass(
                      col.align
                    )} ${col.className ?? ""}`}
                  >
                    {col.render ? col.render(item) : null}
                  </div>
                );
              }

              const value = item[col.key as keyof T];

              const isTextColumn = col.align !== "right";

              return (
                <div
                  key={String(col.key)}
                  className={`${alignClass(col.align)} ${col.className ?? ""} ${
                    isTextColumn ? "break-words" : "whitespace-nowrap"
                  }`}
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

        {/* EMPTY STATE */}
        {data.length === 0 && (
          <div className="text-center py-6 text-gray-500">{noResultsText}</div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3 p-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg disabled:opacity-40"
            >
              Prev
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
