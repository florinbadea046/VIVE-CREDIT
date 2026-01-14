import { Building2, HeartHandshake, Gauge } from "lucide-react";
import { useTranslation } from "react-i18next";

const BrandStorySection = () => {
  const { t } = useTranslation("landing");

  const features = [
    {
      icon: Building2,
      title: t("brandStory.features.modernIFN.title"),
      text: t("brandStory.features.modernIFN.text"),
    },
    {
      icon: HeartHandshake,
      title: t("brandStory.features.transparency.title"),
      text: t("brandStory.features.transparency.text"),
    },
    {
      icon: Gauge,
      title: t("brandStory.features.fastDigital.title"),
      text: t("brandStory.features.fastDigital.text"),
    },
  ] as const;

  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 overflow-hidden">
      <div className="absolute -top-10 left-10 w-56 h-56 bg-blue-300/20 dark:bg-blue-900/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-200/20 dark:bg-blue-800/30 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 z-10">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 font-semibold mb-3">
            {t("brandStory.sectionLabel")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            {t("brandStory.sectionTitle")}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            {t("brandStory.description")}
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/60 shadow-lg backdrop-blur-lg p-6"
            >
              <f.icon className="w-9 h-9 text-blue-600 dark:text-blue-400 mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandStorySection;
