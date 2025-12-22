import { useState } from "react";

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

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(salesData.length / itemsPerPage);

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
  const filteredData = salesData
    .filter((app) => {
      const matchClient = app.client.toLowerCase().includes(searchClient.toLowerCase());
      const matchProduct = selectedProduct === "all" || app.productValue === selectedProduct;
      const matchStatus = selectedStatus === "all" || app.statusValue === selectedStatus;
      const matchAgent = selectedAgent === "" || app.agent.toLowerCase().includes(selectedAgent.toLowerCase());
      return matchClient && matchProduct && matchStatus && matchAgent;
    })
    .slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
            className="border dark:border-gray-600 px-3 py-2 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
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
            className="border dark:border-gray-600 px-3 py-2 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
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
          <thead className="bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
            <tr>
              <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">ID</th>
              <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Client</th>
              <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Produs</th>
              <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Sumă</th>
              <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Status</th>
              <th className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">Acțiuni</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((app) => (
              <tr
                key={app.id}
                onClick={() => openView(app)}
                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer"
              >
                <td className="px-4 py-3">{app.id}</td>
                <td className="px-4 py-3">{app.client}</td>
                <td className="px-4 py-3">{app.product}</td>
                <td className="px-4 py-3">{app.amount} RON</td>
                <td className="px-4 py-3">
                  <SalesStatusBadge status={app.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => openView(app)}
                      className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      View
                    </button>

                    {/* DOCS */}
                    <button
                      onClick={() => openDocs(app)}
                      className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Docs
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 p-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg disabled:opacity-40"
          >
            Prev
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

      {/* --- Modals --- */}
      <PDFModal pdfUrl={pdfUrl} onClose={closePdf} />

      <DocsModal app={selectedApp} onClose={closeDocs} />
      <ViewModal app={viewApp} open={viewOpen} onClose={closeView} />
    </div>
  );
}