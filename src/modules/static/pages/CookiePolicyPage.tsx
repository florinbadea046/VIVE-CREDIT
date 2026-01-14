import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const CookiePolicyPage = () => {
  const { t } = useTranslation("static");

  return (
    <>
      <Helmet>
        <title>{t("cookies.meta.title")}</title>
        <meta name="description" content={t("cookies.meta.description")} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
          {t("cookies.headline")}
        </h1>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {t("cookies.intro")}
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          {t("cookies.sections.what.title")}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mt-3">
          {t("cookies.sections.what.text")}
        </p>

        <h2 className="mt-10 text-2xl font-semibold">
          {t("cookies.sections.types.title")}
        </h2>
        <ul className="list-disc ml-6 mt-3 text-slate-600 dark:text-slate-300">
          <li>{t("cookies.sections.types.items.0")}</li>
          <li>{t("cookies.sections.types.items.1")}</li>
          <li>{t("cookies.sections.types.items.2")}</li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold">
          {t("cookies.sections.manage.title")}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mt-3">
          {t("cookies.sections.manage.text")}
        </p>
      </div>
    </>
  );
};

export default CookiePolicyPage;
