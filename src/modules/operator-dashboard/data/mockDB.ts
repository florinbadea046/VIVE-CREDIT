import { mockRiskApp } from "../submodules/risk/mock-data";
import { salesData } from "../submodules/sales/mock-data";

export const mockDB = {
  // Applications for operator dashboard
  applications: [
    {
      id: "OP - 001",
      customerName: "Ion Popescu",
      amount: 5000,
      date: "2025-01-10",
      status: "pending",
    },
    {
      id: "OP - 002",
      customerName: "Maria Ionescu",
      amount: 15000,
      date: "2025-01-09",
      status: "pending",
    },
    {
      id: "OP - 003",
      customerName: "Andrei Popa",
      amount: 8000,
      date: "2025-01-08",
      status: "approved",
    },
  ],

  // Risk assessment applications
  riskApplications: mockRiskApp,

  // Sales applications
  salesApplocations: salesData,

  // Collections
  collections: [
    {
      id: "C0L-001",
      client: "Ion Popescu",
      totalCredit: 10000,
      remaining: 2500,
      daysOverdue: 0,
      status: "la-zi",
    },
    {
      id: "C0L-002",
      client: "Maria Ionescu",
      totalCredit: 8000,
      remaining: 3200,
      daysOverdue: 12,
      status: "intraziat",
    },
    {
      id: "C0L-003",
      client: "Andrei Popa",
      totalCredit: 15000,
      remaining: 6000,
      daysOverdue: 45,
      status: "critic",
    },
  ],

  // Customers
  customers: [
    {
      id: "CUST-001",
      name: "Ion Popescu",
      email: "ion.popescu@mail.com",
      phone: "0740123456",
      kycStatus: "Pending",
    },
    {
      id: "CUST-002",
      name: "MAria Ionescu",
      email: "maria.ionescu@mail.com",
      phone: "0740123456",
      kycStatus: "Verified",
    },
    {
      id: "CUST-003",
      name: "Andrei Popa",
      email: "andrei.popa@mail.com",
      phone: "0740123456",
      kycStatus: "Rejected",
    },
  ],
};
