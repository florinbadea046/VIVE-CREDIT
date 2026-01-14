import { ShieldCheck, Clock, CheckCircle, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const BenefitsSection = () => {
  const { t } = useTranslation("landing");

  const items = [
    {
      icon: Clock,
      title: t("benefits.fastApproval.title"),
      text: t("benefits.fastApproval.text"),
    },
    {
      icon: ShieldCheck,
      title: t("benefits.fullSecurity.title"),
      text: t("benefits.fullSecurity.text"),
    },
    {
      icon: Globe,
      title: t("benefits.digital.title"),
      text: t("benefits.digital.text"),
    },
    {
      icon: CheckCircle,
      title: t("benefits.transparency.title"),
      text: t("benefits.transparency.text"),
    },
  ] as const;

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-slate-800 transition">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center">
          {t("benefits.sectionTitle")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {items.map((b) => (
            <div
              key={b.title}
              className="bg-white dark:bg-slate-900 
                         border border-slate-200 dark:border-slate-700 
                         shadow-md rounded-2xl p-7 hover:shadow-lg transition"
            >
              <b.icon className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {b.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mt-2">
                {b.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
