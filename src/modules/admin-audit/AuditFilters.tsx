import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export type AuditFilter = {
  user?: string;
  entity?: string;
  dateFrom?: string;
  dateTo?: string;
};

export const AuditFilters = ({
  onChange,
}: {
  onChange: (f: AuditFilter) => void;
}) => {
  const [filters, setFilters] = useState<AuditFilter>({});

  const update = (key: keyof AuditFilter, value: string) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onChange(updated);
  };

  return (
    <Card className="p-4 mb-4">
      <CardContent className="grid grid-cols-4 gap-4">
        <Input
          placeholder="User"
          onChange={(e) => update("user", e.target.value)}
        />
        <Input
          placeholder="Entity"
          onChange={(e) => update("entity", e.target.value)}
        />
        <Input
          type="date"
          onChange={(e) => update("dateFrom", e.target.value)}
        />
        <Input type="date" onChange={(e) => update("dateTo", e.target.value)} />
      </CardContent>
    </Card>
  );
};
