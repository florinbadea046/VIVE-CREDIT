import type { DocumentItem } from "../types/documents";

export const documentsMock: DocumentItem[] = [
  {
    id: "DOC-001",
    name: "contract_credit",
    category: "contract",
    uploadedAt: "2025-01-10",
    sizeKb: 320,
    status: "available",
    url: "/documents/contract.pdf",
  },
  {
    id: "DOC-002",
    name: "repayment_schedule",
    category: "schedule",
    uploadedAt: "2025-01-10",
    sizeKb: 210,
    status: "available",
    url: "/documents/schedule.pdf",
  },
  {
    id: "DOC-003",
    name: "id_card_both_sides",
    category: "kyc",
    uploadedAt: "2024-12-20",
    sizeKb: 580,
    status: "available",
    url: "/documents/id-card.pdf",
  },
  {
    id: "DOC-004",
    name: "income_certificate",
    category: "income",
    uploadedAt: "2024-12-18",
    sizeKb: 450,
    status: "processing",
    url: "/documents/income-proof.pdf",
  },
  {
    id: "DOC-005",
    name: "old_contract_expired",
    category: "contract",
    uploadedAt: "2023-05-01",
    sizeKb: 300,
    status: "expired",
    url: "/documents/old-contract.pdf",
  },
];
