import { CreditCard, ShieldCheck, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HeroSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("landing");

  return (
    <section className="w-full bg-white dark:bg-slate-900 transition">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
            {t("hero.title")}{" "}
            <span className="text-blue-600 dark:text-blue-400">
              {t("hero.highlight")}
            </span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => navigate("/onboarding")}
              className="px-7 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md"
            >
              {t("hero.cta")}
            </button>
          </div>

          <div className="flex gap-6 pt-6 text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              {t("hero.badges.security")}
            </div>

            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              {t("hero.badges.digital")}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              {t("hero.card.title")}
            </h3>

            <p className="text-slate-600 dark:text-slate-300 mt-2 text-sm">
              {t("hero.card.description")}
            </p>

            <div className="mt-8 bg-blue-50 dark:bg-slate-700 rounded-xl p-5 flex items-center gap-4">
              <CreditCard className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-slate-800 dark:text-white font-semibold">
                  {t("hero.card.feature.title")}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {t("hero.card.feature.text")}
                </p>
              </div>
            </div>
          </div>

          <div className="absolute -z-10 top-16 left-10 w-60 h-60 bg-blue-200 dark:bg-blue-900 blur-3xl opacity-40" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
