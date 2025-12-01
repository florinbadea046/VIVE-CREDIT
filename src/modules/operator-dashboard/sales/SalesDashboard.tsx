import { useState } from "react";
import { Link } from "react-router-dom";

import { salesData, type SalesApplication } from "./mock-data";
import SalesStatusBadge from "./components/SalesStatusBadge";
import CustomSelect from "./components/CustomSelect";

import PDFModal from "./components/PDFModal";
import DocsModal from "./components/DocsModal";

import { generateClientPdf } from "@/utils/generatePdf";

import ViewModal from "./components/ViewModal";



export default function SalesDashboard() {
  const [searchClient, setSearchClient] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedAgent, setSelectedAgent] = useState("");

  // 📄 PDF modal
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const openPdf = (app: SalesApplication) => {
    const blob = generateClientPdf(app);
    const url = URL.createObjectURL(blob);
    setPdfUrl(url);
  };

  const closePdf = () => setPdfUrl(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewApp, setViewApp] = useState<SalesApplication | null>(null);

  const openView = (app: SalesApplication) => {
    setViewApp(app);
    setViewOpen(true);
  };

  const closeView = () => {
    setViewOpen(false);
    setViewApp(null);
  };


  // 📁 DOCS modal
const [, setDocsOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<SalesApplication | null>(null);

  const openDocs = (app: SalesApplication) => {
    setSelectedApp(app);
    setDocsOpen(true);
  };

  const closeDocs = () => {
    setDocsOpen(false);
    setSelectedApp(null);
  };

  // 🔍 Filter logic
  const filteredData = salesData.filter((app) => {
    const matchClient = app.client.toLowerCase().includes(searchClient.toLowerCase());
    const matchProduct = selectedProduct === "all" || app.productValue === selectedProduct;
    const matchStatus = selectedStatus === "all" || app.statusValue === selectedStatus;
    const matchAgent = selectedAgent === "" || app.agent.toLowerCase().includes(selectedAgent.toLowerCase());
    return matchClient && matchProduct && matchStatus && matchAgent;
  });

  const resetFilters = () => {
    setSearchClient("");
    setSelectedProduct("all");
    setSelectedStatus("all");
    setSelectedAgent("");
  };

  // Suppress unused variable warning - openPdf is available for future use
  void openPdf;

  return (
    <div className="p-6 md:p-10">

      {/* --- Tabs --- */}
      <div className="flex gap-4 mb-8">
        <Link to="/sales" className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium shadow">
          Sales
        </Link>
        <Link to="/risk" className="px-6 py-2 rounded-lg border bg-white font-medium shadow">
          Risk
        </Link>
        <Link to="/collections" className="px-6 py-2 rounded-lg border bg-white font-medium shadow">
          Collections
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Sales Dashboard</h1>

      {/* --- Filters --- */}
      <div className="grid md:grid-cols-4 gap-5 mb-6">
        
        {/* Client */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Client</label>
          <input
            type="text"
            value={searchClient}
            onChange={(e) => setSearchClient(e.target.value)}
            placeholder="Caută client..."
            className="border px-3 py-2 rounded-lg shadow-sm"
          />
        </div>

        {/* Product */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Produs</label>
          <CustomSelect
            value={selectedProduct}
            onChange={setSelectedProduct}
            options={[
              { label: "Toate", value: "all" },
              { label: "Credit Casa", value: "casa" },
              { label: "Credit Auto", value: "auto" },
              { label: "Card Credit", value: "card" },
            ]}
          />
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Stare</label>
          <CustomSelect
            value={selectedStatus}
            onChange={setSelectedStatus}
            options={[
              { label: "Toate", value: "all" },
              { label: "Nou", value: "nou" },
              { label: "În lucru", value: "in_lucru" },
              { label: "Finalizat", value: "finalizat" },
            ]}
          />
        </div>

        {/* Agent */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Agent</label>
          <input
            type="text"
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            placeholder="Caută agent..."
            className="border px-3 py-2 rounded-lg shadow-sm"
          />
        </div>
      </div>

      {/* Reset button */}
      <button
        onClick={resetFilters}
        className="px-6 py-2 mb-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        Resetează filtre
      </button>

      {/* --- Table --- */}
      <div className="overflow-x-auto border rounded-xl shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 font-semibold">ID</th>
              <th className="px-4 py-3 font-semibold">Client</th>
              <th className="px-4 py-3 font-semibold">Produs</th>
              <th className="px-4 py-3 font-semibold">Sumă</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Acțiuni</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((app) => (
              <tr key={app.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3">{app.id}</td>
                <td className="px-4 py-3">{app.client}</td>
                <td className="px-4 py-3">{app.product}</td>
                <td className="px-4 py-3">{app.amount} RON</td>
                <td className="px-4 py-3">
                  <SalesStatusBadge status={app.status} />
                </td>
                <td className="px-4 py-3 flex gap-3">

                  <button
                    onClick={() => openView(app)}
                    className="px-4 py-1 bg-blue-600 text-white rounded-lg"
                  >
                    View
                  </button>


                  {/* DOCS */}
                  <button
                    onClick={() => openDocs(app)}
                    className="px-4 py-1 bg-blue-600 text-white rounded-lg"
                  >
                    Docs
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- Modals --- */}
      <PDFModal pdfUrl={pdfUrl} onClose={closePdf} />

      <DocsModal 
        app={selectedApp}
        onClose={closeDocs}
      />
      <ViewModal app={viewApp} open={viewOpen} onClose={closeView} />

    </div>
  );
}