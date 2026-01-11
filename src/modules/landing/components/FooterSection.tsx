import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FooterSection = () => {
  const { t } = useTranslation("landing");

  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-300 pt-16 pb-10 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
        {/* Logo + description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow">
              V
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              Vive Credit
            </h3>
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xs">
            {t("footer.description")}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            {t("footer.nav.title")}
          </h3>
          <ul className="space-y-2 text-sm">
            {["home", "products", "about", "contact"].map((key) => (
              <li key={key}>
                <Link
                  to={key === "home" ? "/" : `/${key}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  {t(`footer.nav.${key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            {t("footer.legal.title")}
          </h3>
          <ul className="space-y-2 text-sm">
            {["terms", "privacy", "cookies", "anpc"].map((key) => (
              <li key={key}>
                <Link
                  to={`/${key}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  {t(`footer.legal.${key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="text-center text-xs mt-10 text-slate-500 dark:text-slate-500">
        {t("footer.copyright", { year })}
      </div>
    </footer>
  );
};

export default FooterSection;
