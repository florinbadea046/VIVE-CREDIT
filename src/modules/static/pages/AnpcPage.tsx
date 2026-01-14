import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const AnpcPage = () => {
  const { t } = useTranslation("static");

  return (
    <>
      <Helmet>
        <title>{t("anpc.meta.title")}</title>
        <meta name="description" content={t("anpc.meta.description")} />
      </Helmet>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
          {t("anpc.headline")}
        </h1>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {t("anpc.intro")}
        </p>

        <h2 className="mt-10 text-2xl font-semibold text-slate-900 dark:text-white">
          {t("anpc.sections.complaints.title")}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
          {t("anpc.sections.complaints.text")}
          <br />
          <strong className="text-blue-600">
            {t("anpc.sections.complaints.email")}
          </strong>
        </p>

        <h2 className="mt-10 text-2xl font-semibold text-slate-900 dark:text-white">
          {t("anpc.sections.authority.title")}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
          {t("anpc.sections.authority.text")}
        </p>

        <ul className="list-disc ml-6 mt-3 text-slate-600 dark:text-slate-300">
          <li>
            {t("anpc.sections.authority.website")}:{" "}
            <a
              href="https://anpc.ro"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://anpc.ro
            </a>
          </li>
          <li>
            {t("anpc.sections.authority.phoneLabel")}:{" "}
            <strong className="text-blue-600">
              {t("anpc.sections.authority.phone")}
            </strong>
          </li>
        </ul>

        <h2 className="mt-10 text-2xl font-semibold text-slate-900 dark:text-white">
          {t("anpc.sections.sol.title")}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
          {t("anpc.sections.sol.text")}
        </p>

        <a
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow"
        >
          {t("anpc.sections.sol.button")}
        </a>

        <div className="mt-16 p-6 bg-blue-50 dark:bg-slate-800 rounded-xl">
          <p className="text-slate-800 dark:text-slate-200">
            {t("anpc.commitment")}
          </p>
        </div>
      </div>
    </>
  );
};

export default AnpcPage;
