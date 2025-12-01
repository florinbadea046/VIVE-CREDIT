import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface PdfApplication {
  id: string;
  client: string;
  product: string;
  amount: number;
  status: string;
  agent: string;
  score: number;
}

export function generateClientPdf(app: PdfApplication) {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(18);
  doc.text("Fisa Clientului", 14, 20);

  doc.setFontSize(12);
  doc.setTextColor(100);
  doc.text(`ID aplicatie: ${app.id}`, 14, 30);

  // Tabel date
  autoTable(doc, {
    startY: 40,
    head: [["Câmp", "Valoare"]],
    body: [
      ["Client", app.client],
      ["Produs", app.product],
      ["Suma", `${app.amount} RON`],
      ["Status", app.status],
      ["Agent", app.agent],
      ["Scor", String(app.score)],
    ],
    styles: {
      fontSize: 11,
      cellPadding: 4,
    },
    headStyles: {
      fillColor: [23, 74, 255],
      textColor: 255,
      halign: "center",
    },
  });

  // Footer
  doc.setFontSize(10);
  doc.text(
    "Fișă generată automat — Vive Credit © " + new Date().getFullYear(),
    14,
    doc.internal.pageSize.height - 10
  );

  return doc.output("blob");
}