import type { ApplicationStatus } from "../types/Application";

export const PENDING_STATUSES: ApplicationStatus[] = [
  "pending",
  "manual_review",
  "documents_requested",
  "aml_review",
];
