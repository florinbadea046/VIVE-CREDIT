// src/modules/admin/audit-log/AuditLogTable.tsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AuditLog } from "./types";

interface Props {
  logs: AuditLog[];
}

export function AuditLogTable({ logs }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data / Ora</TableHead>
          <TableHead>Utilizator</TableHead>
          <TableHead>Acțiune</TableHead>
          <TableHead>Detalii</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
            <TableCell>{log.user}</TableCell>
            <TableCell className="font-medium">{log.action}</TableCell>
            <TableCell>{log.details}</TableCell>
          </TableRow>
        ))}

        {logs.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-center text-muted-foreground"
            >
              Nu există loguri
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
