import { useTranslation } from "react-i18next";

const StepsSection = () => {
  const { t } = useTranslation("landing");

  const steps = [
    { nr: "1", label: t("steps.step1") },
    { nr: "2", label: t("steps.step2") },
    { nr: "3", label: t("steps.step3") },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white text-center">
          {t("steps.title")}
        </h2>

        <div className="flex flex-col md:flex-row justify-center gap-14 mt-14">
          {steps.map((step) => (
            <div key={step.nr} className="flex flex-col items-center">
              <div
                className="w-16 h-16 flex items-center justify-center
                           rounded-full bg-blue-600 text-white text-2xl font-bold shadow-xl"
              >
                {step.nr}
              </div>

              <p className="mt-4 text-lg font-medium text-slate-900 dark:text-white text-center max-w-xs">
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
