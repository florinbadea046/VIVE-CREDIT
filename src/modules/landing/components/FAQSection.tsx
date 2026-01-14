import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const faqs = ["faq1", "faq2", "faq3", "faq4"] as const;

const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);
  const { t } = useTranslation("landing");

  return (
    <section className="py-24 px-4 bg-gray-50 dark:bg-slate-800 transition">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center">
          {t("faq.title")}
        </h2>

        <p className="text-center text-slate-600 dark:text-slate-400 mt-3">
          {t("faq.subtitle")}
        </p>

        <div className="mt-14 space-y-4">
          {faqs.map((key, i) => (
            <div
              key={key}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm"
            >
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left text-slate-900 dark:text-white font-medium"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {t(`faq.${key}.q`)}
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    open === i ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {open === i && (
                <div className="px-6 pb-5 text-slate-600 dark:text-slate-300 animate-fadeIn">
                  {t(`faq.${key}.a`)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
