import type { ProductSetting } from "@/types/productSettings";
type Props = {
  items: ProductSetting[];
  onEdit: (item: ProductSetting) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string, active: boolean) => void;
};

export default function ProductSettingsTable({
  items,
  onEdit,
  onDelete,
  onToggleActive,
}: Props) {
  return (
    <div className="bg-white shadow rounded-md overflow-x-auto">
      <table className="min-w-full divide-y">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">Product</th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Interest %
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Commission
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">Limits</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Active</th>
            <th className="px-4 py-2 text-right text-sm font-medium">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {items.map((it) => (
            <tr key={it.id}>
              <td className="px-4 py-3">
                <div className="text-sm font-semibold">{it.name}</div>
                <div className="text-xs text-slate-500">{it.productCode}</div>
              </td>

              <td className="px-4 py-3 text-sm">{it.interestRate}%</td>
              <td className="px-4 py-3 text-sm">
                {typeof it.commission === "number"
                  ? `${it.commission}`
                  : `${it.commission}`}
              </td>

              <td className="px-4 py-3 text-sm">
                {it.minAmount} — {it.maxAmount}
              </td>

              <td className="px-4 py-3 text-sm">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={it.active}
                    onChange={(e) => onToggleActive(it.id, e.target.checked)}
                    className="form-checkbox"
                  />
                </label>
              </td>

              <td className="px-4 py-3 text-right space-x-2">
                <button
                  onClick={() => onEdit(it)}
                  className="text-sm px-3 py-1 rounded bg-slate-100 hover:bg-slate-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(it.id)}
                  className="text-sm px-3 py-1 rounded bg-rose-100 hover:bg-rose-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {items.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-6 text-center text-sm text-slate-500"
              >
                Nicio configurare gasită.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
