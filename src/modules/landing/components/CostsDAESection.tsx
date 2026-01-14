import { Percent, ShieldCheck, Calculator } from "lucide-react";
import { useTranslation } from "react-i18next";

const CosturiDAESection = () => {
  const { t } = useTranslation("landing");

  return (
    <section className="relative w-full py-24 px-6 overflow-hidden bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-white">
      <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-40 pointer-events-none">
        <div className="hidden dark:block absolute top-0 left-0 w-72 h-72 bg-blue-600/20 blur-[120px]" />
        <div className="hidden dark:block absolute bottom-0 right-0 w-72 h-72 bg-indigo-600/20 blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold tracking-wide mb-4">
          <Percent className="w-5 h-5" />
          {t("costs.label")}
        </div>

        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          {t("costs.sectionTitle")}
        </h2>

        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mb-16 leading-relaxed">
          {t("costs.description")}
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="p-8 rounded-2xl shadow-lg border border-slate-200 bg-white dark:border-white/10 dark:bg-white/10 dark:backdrop-blur-xl">
          <h3 className="text-2xl font-semibold mb-6">
            {t("costs.exampleTitle")}
          </h3>

          <ul className="space-y-4 text-slate-700 dark:text-slate-200">
            <li>
              <span className="font-semibold text-slate-900 dark:text-white">
                {t("costs.loanAmount")}
              </span>{" "}
              {t("costs.values.loanAmount", { amount: "10.000 lei" })}
            </li>
            <li>
              <span className="font-semibold text-slate-900 dark:text-white">
                {t("costs.loanDuration")}
              </span>{" "}
              {t("costs.values.loanDuration", { months: 24 })}
            </li>
            <li>
              <span className="font-semibold text-slate-900 dark:text-white">
                {t("costs.dae")}
              </span>{" "}
              {t("costs.values.dae", { value: "24.99%" })}
            </li>
            <li>
              <span className="font-semibold text-slate-900 dark:text-white">
                {t("costs.monthlyRate")}
              </span>{" "}
              {t("costs.values.monthlyRate", { amount: "~530 lei" })}
            </li>
            <li>
              <span className="font-semibold text-slate-900 dark:text-white">
                {t("costs.totalRepayment")}
              </span>{" "}
              {t("costs.values.totalRepayment", { amount: "~12.720 lei" })}
            </li>
          </ul>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-6 leading-relaxed">
            {t("costs.exampleNote")}
          </p>
        </div>

        <div className="space-y-8 text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
            <p>
              <span className="font-semibold text-slate-900 dark:text-white">
                {t("costs.dae")}
              </span>{" "}
              {t("costs.daeDescription")}
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1" />
            <p>{t("costs.totalCostsDescription")}</p>
          </div>

          <p>{t("costs.personalizedOffer")}</p>
        </div>
      </div>
    </section>
  );
};

export default CosturiDAESection;
