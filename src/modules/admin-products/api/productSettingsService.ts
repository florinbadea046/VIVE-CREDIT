import type { ProductSetting } from "@/types/productSettings";
const STORAGE_KEY = "vive_product_settings_v1";

const seed = (): ProductSetting[] => [
  {
    id: "ps-1",
    productCode: "CREDIT_PERSONAL",
    name: "Credit Personal Standard",
    interestType: "fixed",
    interestRate: 19.5,
    commission: 100,
    minAmount: 500,
    maxAmount: 50000,
    active: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "ps-2",
    productCode: "CREDIT_FAST",
    name: "Credit Rapid",
    interestType: "fixed",
    interestRate: 24.0,
    commission: 50,
    minAmount: 200,
    maxAmount: 10000,
    active: true,
    updatedAt: new Date().toISOString(),
  },
];

const load = (): ProductSetting[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const s = seed();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    return s;
  }
  try {
    return JSON.parse(raw) as ProductSetting[];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return seed();
  }
};

const save = (items: ProductSetting[]) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));

export const productSettingsService = {
  async list(): Promise<ProductSetting[]> {
    // simulate latency
    await new Promise((r) => setTimeout(r, 120));
    return load();
  },

  async get(id: string): Promise<ProductSetting | null> {
    const items = load();
    return items.find((i) => i.id === id) ?? null;
  },

  async create(payload: Omit<ProductSetting, "id" | "updatedAt">) {
    const items = load();
    const newItem: ProductSetting = {
      ...payload,
      id: "ps-" + Math.random().toString(36).slice(2, 9),
      updatedAt: new Date().toISOString(),
    };
    items.unshift(newItem);
    save(items);
    return newItem;
  },

  async update(id: string, patch: Partial<ProductSetting>) {
    const items = load();
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) throw new Error("Not found");
    items[idx] = {
      ...items[idx],
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    save(items);
    return items[idx];
  },

  async remove(id: string) {
    let items = load();
    items = items.filter((i) => i.id !== id);
    save(items);
    return true;
  },
};
