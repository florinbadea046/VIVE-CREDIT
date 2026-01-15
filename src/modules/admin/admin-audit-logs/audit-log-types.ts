// src/modules/admin/audit-log/types.ts

export type AuditAction = "LOGIN" | "CREATE" | "UPDATE" | "DELETE";

export interface AuditLog {
  id: number;
  timestamp: string; // ISO string
  user: string;
  action: AuditAction;
  details: string;
}
