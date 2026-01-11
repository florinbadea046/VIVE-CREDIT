import "react-i18next";
import type { CommonTranslations } from "./types/common";
import type { LandingTranslations } from "./types/landing";
import type { StaticTranslations } from "./types/static";
import type { AuthTranslations } from "./types/auth";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: {
      common: CommonTranslations;
      landing: LandingTranslations;
      static: StaticTranslations;
      auth: AuthTranslations;
    };
  }
}
