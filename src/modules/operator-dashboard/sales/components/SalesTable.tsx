import SalesStatusBadge from "./SalesStatusBadge";
import { Link } from "react-router-dom";
import type { SalesApplication } from "../mock-data";

interface SalesFilters {
  status: string;
  search: string;
  product: string;
  agent: string;
}

interface SalesTableProps {
  data: SalesApplication[];
  filters: SalesFilters;
}

export default function SalesTable({ data, filters }: SalesTableProps) {
  const filtered = data.filter((row) => {
    return (
      (filters.status === "Toate" || row.status === filters.status) &&
      (filters.product === "Toate" || row.product === filters.product) &&
      row.client.toLowerCase().includes(filters.search.toLowerCase()) &&
      row.agent.toLowerCase().includes(filters.agent.toLowerCase())
    );
  });

  return (
    <div className="w-full overflow-auto border rounded-xl">
      <table className="w-full min-w-[1000px]">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Client</th>
            <th className="p-3 text-left">Produs</th>
            <th className="p-3 text-left">Sumă</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Acțiuni</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-3">{item.id}</td>
              <td className="p-3">{item.client}</td>
              <td className="p-3">{item.product}</td>
              <td className="p-3">{item.amount} RON</td>
              <td className="p-3">
                <SalesStatusBadge status={item.status} />
              </td>

              <td className="p-3 flex gap-2">
                <Link
                  to={`/sales/${item.id}`}
                  className="px-4 py-1 bg-blue-600 text-white rounded-lg"
                >
                  View
                </Link>

                <button className="px-4 py-1 bg-blue-600 text-white rounded-lg">
                  Docs
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}