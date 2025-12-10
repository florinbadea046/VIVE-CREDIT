import { useEffect, useState } from "react";
import { z } from "zod";
import AdminLayout from "../layout/AdminLayout";
import ProductSettingsTable from "../components/ProductSettingsTable";
import ProductSettingsForm from "../components/ProductSettingsForm";
import { productSettingsService } from "../api/productSettingsService";
import type { ProductSetting } from "@/types/productSettings";

const formSchema = z.object({
  id: z.string().optional(),
  productCode: z.string().min(2, "Cod produs obligatoriu"),
  name: z.string().min(3, "Nume obligatoriu"),
  interestType: z.enum(["fixed", "variable"]),
  interestRate: z.number().min(0, "Trebuie >= 0"),
  commission: z.number().min(0),
  minAmount: z.number().min(0),
  maxAmount: z.number().min(0),
  active: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

export default function ProductSettingsPageInternal() {
  return (
    <AdminLayout>
      <ProductSettingsPage />
    </AdminLayout>
  );
}

export function ProductSettingsPage() {
  const [items, setItems] = useState<ProductSetting[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<ProductSetting | null>(null);
  const [showForm, setShowForm] = useState(false);

  const load = async () => {
    setLoading(true);
    const list = await productSettingsService.list();
    setItems(list);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const onEdit = (it: ProductSetting) => {
    setEditing(it);
    setShowForm(true);
  };

  const onDelete = async (id: string) => {
    if (!confirm("Stergi configurarea?")) return;
    await productSettingsService.remove(id);
    await load();
  };

  const onToggleActive = async (id: string, active: boolean) => {
    await productSettingsService.update(id, { active });
    await load();
  };

  const onSubmit = async (data: FormData) => {
    if (data.id) {
      await productSettingsService.update(data.id, data);
    } else {
      await productSettingsService.create(data);
    }
    setShowForm(false);
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Configurări produse</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={onCreate}
            className="px-4 py-2 bg-sky-600 text-white rounded"
          >
            + Adaugă configurare
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <ProductSettingsTable
          items={items}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleActive={onToggleActive}
        />
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowForm(false)}
          />
          <div className="relative bg-white rounded-md shadow-lg w-[900px] p-6 z-10">
            <h3 className="text-lg font-medium mb-4">
              {editing ? "Editează configurare" : "Creează configurare"}
            </h3>
            <ProductSettingsForm
              initial={editing ?? undefined}
              onCancel={() => setShowForm(false)}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
}
