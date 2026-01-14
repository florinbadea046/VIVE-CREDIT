import { Helmet } from "react-helmet-async";
import { ShieldCheck, Cog, Zap } from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import { useTranslation } from "react-i18next";

type IconKey = "ShieldCheck" | "Cog" | "Zap";

const iconMap: Record<
  IconKey,
  ForwardRefExoticComponent<LucideProps & RefAttributes<SVGSVGElement>>
> = {
  ShieldCheck,
  Cog,
  Zap,
};

interface Card {
  icon: IconKey;
  title: string;
  text: string;
}

interface EvolutionEvent {
  year: string;
  title: string;
  text: string;
}

const AboutPage = () => {
  const { t } = useTranslation("static");

  const cards: Card[] = [
    {
      icon: "ShieldCheck",
      title: t("about.cards.transparency.title"),
      text: t("about.cards.transparency.text"),
    },
    {
      icon: "Cog",
      title: t("about.cards.tech.title"),
      text: t("about.cards.tech.text"),
    },
    {
      icon: "Zap",
      title: t("about.cards.speed.title"),
      text: t("about.cards.speed.text"),
    },
  ];

  const evolutionEventsRaw = t("about.evolution", { returnObjects: true });
  const evolutionEvents: EvolutionEvent[] = Array.isArray(evolutionEventsRaw)
    ? (evolutionEventsRaw as EvolutionEvent[])
    : [];

  return (
    <>
      <Helmet>
        <title>{t("about.meta.title")}</title>
        <meta name="description" content={t("about.meta.description")} />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      </Helmet>

      <section className="min-h-screen bg-white dark:bg-slate-900 pt-28 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold leading-snug md:leading-tight text-slate-900 dark:text-white">
            {t("about.headline")}
            <br />
            <span className="text-blue-600 dark:text-blue-400">
              {t("about.headlineHighlight")}
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-3xl">
            {t("about.intro")}
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {cards.map((card) => {
              const Icon = iconMap[card.icon];
              return (
                <div
                  key={card.icon}
                  className="p-6 border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 shadow-sm"
                >
                  <Icon
                    className="text-blue-600 dark:text-blue-400"
                    size={32}
                  />
                  <h3 className="text-xl font-semibold mt-4 text-slate-900 dark:text-white">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">
                    {card.text}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-20 grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                {t("about.mission.title")}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {t("about.mission.text")}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                {t("about.vision.title")}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {t("about.vision.text")}
              </p>
            </div>
          </div>

          <section className="pt-24">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">
              {t("about.evolutionTitle")}
            </h2>

            <div className="relative ml-6">
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-slate-300 dark:bg-slate-700" />
              <ul className="space-y-14">
                {evolutionEvents.map((event) => (
                  <li key={event.year} className="relative pl-10">
                    <span className="absolute left-0 top-1 w-5 h-5 bg-blue-600 rounded-full border-4 border-white dark:border-slate-900 shadow-md" />
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white leading-snug">{`${event.year} – ${event.title}`}</h4>
                    <p className="text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                      {event.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </section>
    </>
  );
};

export default AboutPage;
