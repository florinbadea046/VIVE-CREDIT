import type { ApplicationStatus } from "../types/Application";

const STATUS_LABELS: Partial<Record<ApplicationStatus, string>> = {
  pending: "În așteptare",
  manual_review: "Analizǎ manualǎ",
  documents_requested: "Documente solicitate",
  aml_review: "Verificare AML",
  approved: "Aprobat",
  rejected: "Respins",
};

export function formatStatus(status: string): string {
  if (status in STATUS_LABELS) {
    return STATUS_LABELS[status as ApplicationStatus]!;
  }
  // Fallback generic
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
