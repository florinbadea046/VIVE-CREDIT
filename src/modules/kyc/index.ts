// Barrel export pentru modulul KYC/AML Screening

// Types
export * from "./types/amlScreening.types";

// Utils
export * from "./utils/amlScreening.utils";

// Services
export {
  amlScreeningService,
  amlScreeningMockService,
} from "./services/amlScreeningService";

// Hooks
export { useAMLScreening } from "./hooks/useAMLScreening";

// Components
export { AMLScreeningModal } from "./components/AMLScreeningModal";
export { AMLManualReviewCard } from "./components/AMLManualReviewCard";

// Pages
export { AMLScreeningPage } from "./pages/AMLScreeningPage";
export { default as AMLScreeningPageDefault } from "./pages/AMLScreeningPage";
