import { ShieldCheck, Lock, FileCheck2, type LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

type SecurityCard = {
  icon: LucideIcon;
  titleKey: string;
  textKey: string;
};

const SecurityGDPRSection = () => {
  const { t } = useTranslation("landing");

  const cards: SecurityCard[] = [
    {
      icon: ShieldCheck,
      titleKey: "security.cards.gdpr.title",
      textKey: "security.cards.gdpr.text",
    },
    {
      icon: Lock,
      titleKey: "security.cards.encryption.title",
      textKey: "security.cards.encryption.text",
    },
    {
      icon: FileCheck2,
      titleKey: "security.cards.rights.title",
      textKey: "security.cards.rights.text",
    },
  ];

  return (
    <section className="relative py-20 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="absolute -left-10 top-10 w-64 h-64 bg-blue-300/25 dark:bg-blue-900/30 blur-3xl pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-72 h-72 bg-emerald-300/20 dark:bg-emerald-800/25 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 z-10">
        <p className="text-sm uppercase tracking-[0.18em] font-semibold text-blue-600 dark:text-blue-400 mb-3">
          {t("security.label")}
        </p>

        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          {t("security.title")}
        </h2>

        <p className="text-slate-600 dark:text-slate-300 max-w-3xl mb-8">
          {t("security.description")}
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg p-6"
            >
              <card.icon className="w-9 h-9 text-blue-600 dark:text-blue-400 mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                {t(card.titleKey)}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {t(card.textKey)}
              </p>
            </div>
          ))}
        </div>

        <p className="text-slate-400 text-sm mt-6">
          {t("security.footer.before")}{" "}
          <a
            href="/privacy"
            className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition"
          >
            {t("security.footer.privacy")}
          </a>{" "}
          {t("security.footer.and")}{" "}
          <a
            href="/terms"
            className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition"
          >
            {t("security.footer.terms")}
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default SecurityGDPRSection;
