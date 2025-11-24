import React, { useState } from "react";
import { AuditFilters } from "./AuditFilters";
import { AuditTable } from "./AuditTable";
import { getAuditData } from "@/services/auditService";
import type {
  AuditFilters as AuditFiltersType,
  AuditAction,
} from "@/types/audit";
import type { AuditAction as TableAuditAction } from "./AuditTable";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export const AuditDashboard = () => {
  const [data, setData] = useState<TableAuditAction[]>(
    () => getAuditData({}) as unknown as TableAuditAction[]
  );

  const onChangeFilters = (filters: AuditFiltersType) => {
    const filtered = getAuditData(filters);
    setData(filtered as unknown as TableAuditAction[]);
  };

  return (
    <div className="space-y-4 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Audit Dashboard</CardTitle>
        </CardHeader>
      </Card>

      <AuditFilters onChange={onChangeFilters} />
      <AuditTable data={data} />
    </div>
  );
};
