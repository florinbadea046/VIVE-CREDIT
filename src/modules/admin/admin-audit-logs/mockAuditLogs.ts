// src/modules/admin/audit-log/mockAuditLogs.ts

import { AuditLog } from "./types";

export const mockAuditLogs: AuditLog[] = [
  {
    id: 1,
    timestamp: "2025-01-10T14:30:00",
    user: "Admin",
    action: "CREATE",
    details: "Created user Ion",
  },
  {
    id: 2,
    timestamp: "2025-01-10T14:25:00",
    user: "Operator1",
    action: "UPDATE",
    details: "Approved application #123",
  },
  {
    id: 3,
    timestamp: "2025-01-09T18:10:00",
    user: "Admin",
    action: "DELETE",
    details: "Deleted document #55",
  },
  {
    id: 4,
    timestamp: "2025-01-09T08:00:00",
    user: "Operator2",
    action: "LOGIN",
    details: "User logged in",
  },
];
