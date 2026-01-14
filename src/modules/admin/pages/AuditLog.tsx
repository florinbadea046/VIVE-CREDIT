import { useMemo, useState } from "react";
import { mockAuditLogs } from "@/modules/admin/admin-audit-logs/mockAuditLogs";
import type { AuditAction } from "@/modules/admin/admin-audit-logs/types";
import { AuditLogFilters } from "@/modules/admin/admin-audit-logs/AuditLogFilters";
import { AuditLogTable } from "@/modules/admin/admin-audit-logs/AuditLogTable";

export default function AuditLog() {
  const [action, setAction] = useState<AuditAction | "ALL">("ALL");
  const [date, setDate] = useState("");

  const filteredLogs = useMemo(() => {
    return mockAuditLogs
      .filter((log) => (action === "ALL" ? true : log.action === action))
      .filter((log) => (date ? log.timestamp.startsWith(date) : true))
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
  }, [action, date]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Audit Log</h1>

      <AuditLogFilters
        action={action}
        date={date}
        onActionChange={setAction}
        onDateChange={setDate}
        onReset={() => {
          setAction("ALL");
          setDate("");
        }}
      />

      <AuditLogTable logs={filteredLogs} />
    </div>
  );
}
