import { useEffect, useState, Suspense } from "react";
import ScrollToTop from "@/components/ScrollToTop";
import CookieBanner from "@/components/CookieBanner";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { initMockClientAccount } from "@/modules/auth/mock/initMockClientAccount";
import { initMockOperatorAccount } from "@/modules/auth/mock/initMockOperatorAccount";
import { loadTranslations } from "./i18n/i18n";
import i18n from "./i18n/i18n";

function App() {
  const [translationsLoaded, setTranslationsLoaded] = useState(false);

  useEffect(() => {
    initMockClientAccount();
    initMockOperatorAccount();
  }, []);

  useEffect(() => {
    let active = true;

    const loadAllTranslations = async () => {
      setTranslationsLoaded(false);
      await Promise.all([
        loadTranslations("common"),
        loadTranslations("landing"),
        loadTranslations("static"),
        loadTranslations("auth"),
        loadTranslations("onboarding"),
        loadTranslations("dashboard"),
      ]);
      if (active) setTranslationsLoaded(true);
    };

    loadAllTranslations();

    i18n.on("languageChanged", loadAllTranslations);

    return () => {
      active = false;
      i18n.off("languageChanged", loadAllTranslations);
    };
  }, []);

  if (!translationsLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
        Se încarcă...
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
          Se încarcă componentele...
        </div>
      }
    >
      <ScrollToTop />
      <CookieBanner />
      <Toaster />
      <AppRoutes />
    </Suspense>
  );
}

export default App;
