import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const TermsPage = () => {
  const { t } = useTranslation("static");

  return (
    <>
      <Helmet>
        <title>{t("terms.meta.title")}</title>
        <meta name="description" content={t("terms.meta.description")} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 py-16 text-slate-800 dark:text-slate-200">
        <h1 className="text-4xl font-bold mb-6">{t("terms.headline")}</h1>

        <p className="mb-4">{t("terms.intro")}</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          {t("terms.sections.definitions.title")}
        </h2>
        <p className="mb-4">{t("terms.sections.definitions.text")}</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          {t("terms.sections.eligibility.title")}
        </h2>
        <p className="mb-4">{t("terms.sections.eligibility.text")}</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          {t("terms.sections.process.title")}
        </h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>{t("terms.sections.process.items.0")}</li>
          <li>{t("terms.sections.process.items.1")}</li>
          <li>{t("terms.sections.process.items.2")}</li>
          <li>{t("terms.sections.process.items.3")}</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          {t("terms.sections.responsibilities.title")}
        </h2>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>{t("terms.sections.responsibilities.items.0")}</li>
          <li>{t("terms.sections.responsibilities.items.1")}</li>
          <li>{t("terms.sections.responsibilities.items.2")}</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          {t("terms.sections.liability.title")}
        </h2>
        <p className="mb-4">{t("terms.sections.liability.text")}</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          {t("terms.sections.modifications.title")}
        </h2>
        <p className="mb-12">{t("terms.sections.modifications.text")}</p>

        <p className="text-sm opacity-60">{t("terms.lastUpdated")}</p>
      </div>
    </>
  );
};

export default TermsPage;
