import i18n from "i18next";
import type { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const loadNamespace = async (lng: string, ns: string) => {
  switch (ns) {
    case "common":
      return import(`./locales/${lng}/common.json`).then((m) => m.default);
    case "landing":
      return import(`./locales/${lng}/landing.json`).then((m) => m.default);
    case "static":
      return import(`./locales/${lng}/static.json`).then((m) => m.default);
    case "auth":
      return import(`./locales/${lng}/auth.json`).then((m) => m.default);
    case "onboarding":
      return import(`./locales/${lng}/onboarding.json`).then((m) => m.default);
    case "dashboard":
      return import(`./locales/${lng}/dashboard.json`).then((m) => m.default);
    default:
      return {};
  }
};

import roCommon from "./locales/ro/common.json";
import enCommon from "./locales/en/common.json";
import roLanding from "./locales/ro/landing.json";
import enLanding from "./locales/en/landing.json";
import roStatic from "./locales/ro/static.json";
import enStatic from "./locales/en/static.json";
import roAuth from "./locales/ro/auth.json";
import enAuth from "./locales/en/auth.json";
import roOnboarding from "./locales/ro/onboarding.json";
import enOnboarding from "./locales/en/onboarding.json";
import roDashboard from "./locales/ro/dashboard.json";
import enDashboard from "./locales/en/dashboard.json";

const resources: Resource = {
  ro: {
    common: roCommon,
    landing: roLanding,
    static: roStatic,
    auth: roAuth,
    onboarding: roOnboarding,
    dashboard: roDashboard,
  },
  en: {
    common: enCommon,
    landing: enLanding,
    static: enStatic,
    auth: enAuth,
    onboarding: enOnboarding,
    dashboard: enDashboard,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "ro",
    supportedLngs: ["ro", "en"],
    ns: ["common", "landing", "static", "auth", "onboarding", "dashboard"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
    react: { useSuspense: true },
  });

export const loadTranslations = async (
  namespace:
    | "common"
    | "landing"
    | "static"
    | "auth"
    | "onboarding"
    | "dashboard"
) => {
  const lng = i18n.resolvedLanguage?.split("-")[0] || "ro";
  if (i18n.hasResourceBundle(lng, namespace)) return;
  const data = await loadNamespace(lng, namespace);
  i18n.addResourceBundle(lng, namespace, data, true, true);
};

export default i18n;
