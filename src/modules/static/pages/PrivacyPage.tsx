import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const PrivacyPage = () => {
  const { t } = useTranslation("static");

  return (
    <>
      <Helmet>
        <title>{t("privacy.meta.title")}</title>
        <meta name="description" content={t("privacy.meta.description")} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 py-16 text-slate-800 dark:text-slate-200">
        <h1 className="text-4xl font-bold mb-6">{t("privacy.headline")}</h1>

        <p className="mb-5">{t("privacy.intro")}</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          {t("privacy.sections.dataCollection.title")}
        </h2>
        <ul className="list-disc pl-6 mb-5 space-y-2">
          <li>{t("privacy.sections.dataCollection.items.0")}</li>
          <li>{t("privacy.sections.dataCollection.items.1")}</li>
          <li>{t("privacy.sections.dataCollection.items.2")}</li>
          <li>{t("privacy.sections.dataCollection.items.3")}</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          {t("privacy.sections.purpose.title")}
        </h2>
        <p className="mb-4">{t("privacy.sections.purpose.text")}</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          {t("privacy.sections.legalBasis.title")}
        </h2>
        <ul className="list-disc pl-6 mb-5 space-y-2">
          <li>{t("privacy.sections.legalBasis.items.0")}</li>
          <li>{t("privacy.sections.legalBasis.items.1")}</li>
          <li>{t("privacy.sections.legalBasis.items.2")}</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          {t("privacy.sections.retention.title")}
        </h2>
        <p className="mb-4">{t("privacy.sections.retention.text")}</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          {t("privacy.sections.rights.title")}
        </h2>
        <ul className="list-disc pl-6 mb-5 space-y-2">
          <li>{t("privacy.sections.rights.items.0")}</li>
          <li>{t("privacy.sections.rights.items.1")}</li>
          <li>{t("privacy.sections.rights.items.2")}</li>
          <li>{t("privacy.sections.rights.items.3")}</li>
          <li>{t("privacy.sections.rights.items.4")}</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          {t("privacy.sections.security.title")}
        </h2>
        <p className="mb-4">{t("privacy.sections.security.text")}</p>

        <h2 className="text-2xl font-semibold mt-8 mb-3">
          {t("privacy.sections.dpo.title")}
        </h2>
        <p className="mb-12">
          {t("privacy.sections.dpo.email")}
          <br />
          {t("privacy.sections.dpo.phone")}
        </p>

        <p className="text-sm opacity-60">{t("privacy.lastUpdated")}</p>
      </div>
    </>
  );
};

export default PrivacyPage;
