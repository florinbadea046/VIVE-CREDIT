type AuditAction = {
  user: string;
  entity: string;
  date: string;
  [key: string]: any;
};

type AuditFilter = {
  user?: string;
  entity?: string;
  dateFrom?: string | Date;
  dateTo?: string | Date;
};

let auditMock: any[] = [];
try {
  const mod = require("../mock/auditMock");
  if (mod) {
    if (Array.isArray(mod.auditMock)) {
      auditMock = mod.auditMock;
    } else if (Array.isArray(mod)) {
      auditMock = mod;
    }
  }
} catch {}

export const getAuditData = (filters: AuditFilter): AuditAction[] => {
  return auditMock.filter((item) => {
    return (
      (!filters.user || item.user.includes(filters.user)) &&
      (!filters.entity || item.entity.includes(filters.entity)) &&
      (!filters.dateFrom ||
        new Date(item.date) >= new Date(filters.dateFrom)) &&
      (!filters.dateTo || new Date(item.date) <= new Date(filters.dateTo))
    );
  });
};
