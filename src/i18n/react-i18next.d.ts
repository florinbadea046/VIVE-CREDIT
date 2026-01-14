// i18n/types/i18next.d.ts
import "i18next";
import type { CommonTranslations } from "./common";
import type { LandingTranslations } from "./landing";
import type { StaticTranslations } from "./static";
import type { AuthTranslations } from "./auth";
import type { OnboardingTranslations } from "./onboarding";
import type { DashboardTranslations } from "./dashboard";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: CommonTranslations;
      landing: LandingTranslations;
      static: StaticTranslations;
      auth: AuthTranslations;
      onboarding: OnboardingTranslations;
      dashboard: DashboardTranslations;
    };
  }
}
