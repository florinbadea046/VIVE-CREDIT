import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const CookieBanner = () => {
  const { t } = useTranslation("common");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookieAccepted");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookieAccepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[600px] bg-white dark:bg-slate-800 shadow-xl rounded-xl p-5 border border-slate-200 dark:border-slate-700">
      <p className="text-slate-700 dark:text-slate-300 text-sm">
        {t("cookieBanner.text")}{" "}
        <a href="/cookies" className="text-blue-600 hover:underline">
          {t("cookieBanner.link")}
        </a>
        .
      </p>

      <button
        onClick={accept}
        className="mt-3 w-full px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
      >
        {t("cookieBanner.button")}
      </button>
    </div>
  );
};

export default CookieBanner;
