import { useNavigate } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

const CTASection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("landing");

  const handleApply = () => navigate("/onboarding");

  return (
    <section className="relative py-28 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-10 -top-20 w-80 h-80 bg-blue-400/20 dark:bg-blue-900/30 blur-[140px]" />
        <div className="absolute left-0 bottom-0 w-72 h-72 bg-blue-300/10 dark:bg-blue-800/20 blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shadow-lg mb-6">
            <Zap className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
          {t("cta.title")}
        </h2>

        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {t("cta.subtitle")}
        </p>

        <button
          onClick={handleApply}
          className="mt-10 px-10 py-4 bg-blue-600 hover:bg-blue-700 
                     text-white text-lg font-semibold rounded-xl shadow-[0_10px_25px_-5px_rgba(37,99,235,0.4)]
                     flex items-center gap-3 mx-auto transition-all duration-200 
                     active:scale-95"
        >
          {t("cta.button")}
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
          {t("cta.note")}
        </p>
      </div>
    </section>
  );
};

export default CTASection;
