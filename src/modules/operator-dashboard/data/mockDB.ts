import type { Application } from "../types/Application";

export const mockDB: Application[] = [
  {
    id: "APP-001",
    client: "Codreanu Matei Sergiu",
    contact: {
      email: "ion.popescu@email.com",
      phone: "+40 723 123 456",
    },
    score: 420,
    status: "rejected",
    creditAmount: 10000,
    modules: { risk: true },
    reasonCodes: ["INC_INCOME", "MISSING_DOC"],
    kyc: {
      idFront: "/mocks/id-front.jpg",
      idBack: "/mocks/id-back.jpg",
      selfie: "/mocks/selfie.jpg",
      status: "unclear",
    },
    income: {
      amount: 3500,
      employer: "SC Ex SRL",
      contractType: "Full-time",
      history: ["2024-01", "2023-12"],
    },
    documents: [
      { name: "CI.pdf", url: "#", uploadedAt: "2024-09-01" },
      { name: "FisaVenit.pdf", url: "#", uploadedAt: "2024-09-02" },
    ],
    notes: [
      { text: "Client cu venituri fluctuante", time: "2024-11-01 10:00" },
    ],
    requestedDocuments: [],
  },

  {
    id: "APP-002",
    client: "Ionescu Marian Andra",
    contact: {
      email: "ionescu.andra@email.com",
      phone: "+40 723 123 456",
    },
    score: 760,
    status: "approved",
    creditAmount: 20000,
    modules: { collections: true },
    collectionsStatus: "overdue",
    reasonCodes: [],
    kyc: {
      idFront: "/mocks/id-front-2.jpg",
      idBack: "/mocks/id-back-2.jpg",
      selfie: "/mocks/selfie-2.jpg",
      status: "verified",
    },
    income: {
      amount: 6200,
      employer: "Firma SRL",
      contractType: "Full-time",
      history: ["2024-10", "2024-09"],
    },
    documents: [{ name: "CI.pdf", url: "#", uploadedAt: "2024-10-01" }],
    notes: [{ text: "Întârziere plată 15 zile", time: "2025-01-10 09:00" }],
    requestedDocuments: [],
  },

  {
    id: "APP-003",
    client: "Popescu Alexandru",
    contact: {
      email: "popescu.alexandra@email.com",
      phone: "+40 723 123 456",
    },
    score: 420,
    status: "manual_review",
    creditAmount: 10000,
    modules: { risk: true },
    reasonCodes: ["INC_INCOME", "MISSING_DOC"],
    kyc: {
      idFront: "/mocks/id-front.jpg",
      idBack: "/mocks/id-back.jpg",
      selfie: "/mocks/selfie.jpg",
      status: "unclear",
    },
    income: {
      amount: 3500,
      employer: "SC Ex SRL",
      contractType: "Full-time",
    },
    documents: [
      { name: "CI.pdf", url: "#", uploadedAt: "2024-09-01" },
      { name: "FisaVenit.pdf", url: "#", uploadedAt: "2024-09-02" },
    ],
    notes: [],
    requestedDocuments: [],
  },

  {
    id: "APP-004",
    client: "Maria Ionescu",
    contact: {
      email: "maria.ionescu@email.com",
      phone: "+40 723 123 456",
    },
    score: 760,
    status: "approved",
    collectionsStatus: "current",
    creditAmount: 30000,
    modules: { risk: true, sales: true },
    reasonCodes: [],
    kyc: {
      idFront: "/mocks/id-front-2.jpg",
      idBack: "/mocks/id-back-2.jpg",
      selfie: "/mocks/selfie-2.jpg",
      status: "verified",
    },
    income: {
      amount: 6200,
      employer: "Firma SRL",
      contractType: "Full-time",
    },
    documents: [{ name: "CI.pdf", url: "#", uploadedAt: "2024-10-01" }],
    notes: [],
    requestedDocuments: [],
  },

  {
    id: "APP-005",
    client: "Ion Popescu",
    contact: {
      email: "ion.popescu@email.com",
      phone: "+40 723 123 456",
    },
    score: 420,
    status: "manual_review",
    creditAmount: 10000,
    modules: { risk: true, collections: true },
    reasonCodes: ["INC_INCOME"],
    kyc: {
      idFront: "/mocks/id-front.jpg",
      idBack: "/mocks/id-back.jpg",
      selfie: "/mocks/selfie.jpg",
      status: "unclear",
    },
    income: {
      amount: 3500,
      employer: "SC Ex SRL",
      contractType: "Full-time",
    },
    documents: [],
    notes: [
      {
        text: "Client intrat în collections după 60 zile",
        time: "2024-12-01 09:30",
      },
    ],
    requestedDocuments: [],
  },

  {
    id: "APP-006",
    client: "Maria Ionescu",
    contact: {
      email: "maria.ionescu@email.com",
      phone: "+40 723 123 456",
    },
    score: 760,
    status: "pending",
    creditAmount: 5000,
    modules: { sales: true },
    income: {
      amount: 6200,
      employer: "Firma SRL",
    },
    documents: [],
    notes: [],
    requestedDocuments: [],
  },

  {
    id: "APP-007",
    client: "Ion Popescu",
    contact: {
      email: "ion.popescu@email.com",
      phone: "+40 723 123 456",
    },
    score: 420,
    status: "manual_review",
    creditAmount: 2000,
    modules: { risk: true },
    reasonCodes: ["MISSING_DOC"],
    kyc: {
      idFront: "/mocks/id-front.jpg",
      idBack: "/mocks/id-back.jpg",
      selfie: "/mocks/selfie.jpg",
      status: "unclear",
    },
    income: {
      amount: 3500,
      employer: "SC Ex SRL",
    },
    documents: [],
    notes: [],
    requestedDocuments: ["Adeverință venit"],
  },

  {
    id: "APP-008",
    client: "Maria Ionescu",
    contact: {
      email: "maria.ionescu@email.com",
      phone: "+40 723 123 456",
    },
    score: 760,
    status: "pending",
    creditAmount: 10000,
    modules: { sales: true },
    income: {
      amount: 6200,
      employer: "Firma SRL",
    },
    documents: [],
    notes: [],
    requestedDocuments: [],
  },

  {
    id: "APP-009",
    client: "Maria Ionescu",
    contact: {
      email: "maria.ionescu@email.com",
      phone: "+40 723 123 456",
    },
    score: 760,
    status: "pending",
    creditAmount: 25000,
    modules: { sales: true, collections: true },
    income: {
      amount: 6200,
      employer: "Firma SRL",
    },
    documents: [],
    notes: [],
    requestedDocuments: [],
  },

  {
    id: "APP-010",
    client: "Ion Popescu",
    contact: {
      email: "ion.popescu@email.com",
      phone: "+40 723 123 456",
    },
    score: 420,
    status: "manual_review",
    creditAmount: 10000,
    modules: { risk: true },
    reasonCodes: ["INC_INCOME"],
    kyc: {
      idFront: "/mocks/id-front.jpg",
      idBack: "/mocks/id-back.jpg",
      selfie: "/mocks/selfie.jpg",
      status: "unclear",
    },
    income: {
      amount: 3500,
      employer: "SC Ex SRL",
    },
    documents: [],
    notes: [],
    requestedDocuments: [],
  },

  {
    id: "APP-011",
    client: "Maria Ionescu",
    contact: {
      email: "maria.ionescu@email.com",
      phone: "+40 723 123 456",
    },
    score: 760,
    status: "pending",
    creditAmount: 44000,
    modules: { sales: true },
    income: {
      amount: 6200,
      employer: "Firma SRL",
    },
    documents: [],
    notes: [],
    requestedDocuments: [],
  },
];
