import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import type { FormEvent } from "react";

import type { ErrorState, ScadentarRow, ClientReport } from "@/types/credit";
import { generateScadentar } from "@/utils/credit";

function Scadentar() {
  const [errors, setErrors] = useState<ErrorState>({});
  const [rows, setRows] = useState<ScadentarRow[]>([]);
  const [report, setReport] = useState<ClientReport | null>(null);
  const [showTable, setShowTable] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const value = Number(data.get("value"));
    const time = Number(data.get("time"));
    const interest = Number(data.get("annualInterest"));
    const penalty = Number(data.get("penalty"));
    const daysLate = Number(data.get("daysLate"));

    const newErrors: ErrorState = {};

    if (value <= 0) newErrors.value = "Valoare invalidă";
    if (time <= 0) newErrors.time = "Durată invalidă";
    if (interest <= 0) newErrors.annualInterest = "Dobândă invalidă";
    if (penalty < 0) newErrors.penalty = "Penalitate invalidă";
    if (daysLate < 0) newErrors.daysLate = "Zile invalide";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const daysLateArray = Array(time).fill(daysLate);

    const result = generateScadentar(
      value,
      interest,
      time,
      penalty,
      daysLateArray
    );

    setRows(result.rows);
    setReport(result.report);
    setShowTable(true);
  };

  const handleReset = () => {
    setErrors({});
    setRows([]);
    setReport(null);
    setShowTable(false);
  };

  if (!showTable) {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 border rounded-xl px-4 py-4"
      >
        {[
          { name: "value", label: "Valoare credit" },
          { name: "time", label: "Durata (luni)" },
          { name: "annualInterest", label: "Dobândă (%)" },
          { name: "penalty", label: "Penalitate anuală (%)" },
          { name: "daysLate", label: "Zile întârziere / lună" },
        ].map((f) => (
          <div key={f.name}>
            <label>{f.label}</label>
            {errors[f.name as keyof ErrorState] && (
              <p className="text-red-600">
                {errors[f.name as keyof ErrorState]}
              </p>
            )}
            <input name={f.name} type="number" className="border rounded" />
          </div>
        ))}

        <button className="bg-blue-600 text-white rounded py-1 w-[120px] mt-2">
          Calculează
        </button>
      </form>
    );
  }

  return (
    <div>
      <Table className="mt-6 border rounded">
        <TableHeader>
          <TableRow>
            <TableHead>Luna</TableHead>
            <TableHead>Rată</TableHead>
            <TableHead>Principal</TableHead>
            <TableHead>Dobândă</TableHead>
            <TableHead>Penalitate</TableHead>
            <TableHead>Zile</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Sold</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.luna}>
              <TableCell>{r.luna}</TableCell>
              <TableCell>{r.rata.toFixed(2)}</TableCell>
              <TableCell>{r.principal.toFixed(2)}</TableCell>
              <TableCell>{r.dobanda.toFixed(2)}</TableCell>
              <TableCell>{r.penalitate.toFixed(2)}</TableCell>
              <TableCell>{r.zileIntarziere}</TableCell>
              <TableCell>{r.totalDePlata.toFixed(2)}</TableCell>
              <TableCell>{r.sold.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {report && (
        <div className="mt-4 border p-4 rounded">
          <p>Total rate: {report.totalRate.toFixed(2)}</p>
          <p>Total dobândă: {report.totalDobanda.toFixed(2)}</p>
          <p className="text-red-600">
            Total penalități: {report.totalPenalitati.toFixed(2)}
          </p>
          <p className="font-bold">
            Sumă totală: {report.sumaTotala.toFixed(2)}
          </p>
        </div>
      )}

      <button
        onClick={handleReset}
        className="bg-blue-600 text-white rounded py-1 w-[120px] mt-2"
      >
        Reset
      </button>
    </div>
  );
}

export default Scadentar;
