export type AuditAction = {
  id: string;
  user: string;
  entity: string;
  action: string;
  timestamp: string;
  details?: string;
};

export type AuditFilters = {
  user?: string;
  entity?: string;
  dateFrom?: string;
  dateTo?: string;
  action?: string;
};
