import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

export interface AuditAction {
  id: string;
  user: string;
  action: string;
  entity: string;
  date: string;
}

export const AuditTable = ({ data }: { data: AuditAction[] }) => {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((i) => (
              <TableRow key={i.id}>
                <TableCell>{i.user}</TableCell>
                <TableCell>{i.action}</TableCell>
                <TableCell>{i.entity}</TableCell>
                <TableCell>{i.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
