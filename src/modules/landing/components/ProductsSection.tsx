import { useState, Suspense } from "react";
import { useTranslation } from "react-i18next";

type Product = {
  name: string;
  rate: string;
  limit: string;
  description: string;
  features: string[];
};

const ProductsSection = () => {
  const { t } = useTranslation("landing");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const productsRaw = t("products.items", { returnObjects: true });
  const products: Product[] = Array.isArray(productsRaw) ? productsRaw : [];

  return (
    <section className="py-20 px-4 bg-white dark:bg-slate-900 transition">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center">
          {t("products.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 items-start">
          {products.map((p, index) => {
            const { name, rate, limit, description, features } = p;
            const isOpen = openIndex === index;

            return (
              <div
                key={name}
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                           shadow-md rounded-2xl p-8 transition"
              >
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {name}
                </h3>

                <div className="mt-5 space-y-1 text-slate-700 dark:text-slate-300 text-sm">
                  <p>
                    <span className="font-medium">{t("products.rate")}:</span>{" "}
                    {rate}
                  </p>
                  <p>
                    <span className="font-medium">{t("products.limit")}:</span>{" "}
                    {limit}
                  </p>
                </div>

                <button
                  className="mt-6 w-full rounded-xl bg-blue-600 text-white py-2.5 
                             text-sm font-semibold hover:bg-blue-700 transition"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  {isOpen
                    ? t("products.hideDetails")
                    : t("products.showDetails")}
                </button>

                {isOpen && (
                  <div
                    className="mt-6 p-5 rounded-xl bg-gray-50 dark:bg-slate-700 border 
                               border-slate-200 dark:border-slate-600 animate-fadeIn"
                  >
                    <p className="text-slate-800 dark:text-slate-200 font-medium">
                      {description}
                    </p>

                    <ul className="mt-4 space-y-2 text-slate-700 dark:text-slate-300 text-sm">
                      {features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default function ProductsSectionWrapper() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductsSection />
    </Suspense>
  );
}
