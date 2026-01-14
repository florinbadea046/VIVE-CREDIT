// src/modules/admin/audit-log/AuditLogFilters.tsx

import { AuditAction } from "./types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  action: AuditAction | "ALL";
  date: string;
  onActionChange: (value: AuditAction | "ALL") => void;
  onDateChange: (value: string) => void;
  onReset: () => void;
}

export function AuditLogFilters({
  action,
  date,
  onActionChange,
  onDateChange,
  onReset,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 items-end mb-4">
      {/* Action filter */}
      <div className="w-48">
        <Select value={action} onValueChange={onActionChange}>
          <SelectTrigger>
            <SelectValue placeholder="Tip acțiune" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Toate</SelectItem>
            <SelectItem value="LOGIN">Login</SelectItem>
            <SelectItem value="CREATE">Create</SelectItem>
            <SelectItem value="UPDATE">Update</SelectItem>
            <SelectItem value="DELETE">Delete</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Date filter */}
      <div>
        <Input
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
        />
      </div>

      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}
