export type AuditAction = {
  id: string;
  user: string;
  entity: string;
  action: string;
  timestamp: string;
  details: string;
};

export const auditMock: AuditAction[] = [
  {
    id: "1",
    user: "john.doe",
    entity: "KYC",
    action: "Approve",
    timestamp: "2025-02-10T10:23:00Z",
    details: "User KYC approved",
  },
  {
    id: "2",
    user: "ana.ion",
    entity: "Loan",
    action: "Create",
    timestamp: "2025-02-11T09:12:00Z",
    details: "Loan application created",
  },
];
