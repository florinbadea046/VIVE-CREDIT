import { useParams, Link } from "react-router-dom";
import { salesData } from "./mock-data";
import SalesStatusBadge from "./components/SalesStatusBadge";

export default function ApplicationDetail() {
  const { id } = useParams();
  const app = salesData.find((a) => a.id === id);

  if (!app) {
    return (
      <div className="p-6 md:p-10">
        <Link
          to="/sales"
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Înapoi la Sales
        </Link>

        <h2 className="mt-4 text-xl font-bold">Aplicația nu a fost găsită.</h2>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 w-full">

      {/* 🔵 BUTON ÎNAPOI — FIX AICI */}
      <Link
        to="/sales"
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Înapoi la Sales
      </Link>

      {/* Card detalii aplicație */}
      <div className="bg-white p-8 rounded-2xl shadow-md">

        <h2 className="text-2xl font-bold mb-8">
          Detalii aplicație: {app.id}
        </h2>

        <div className="grid grid-cols-2 gap-y-5 text-lg">
          <strong>Client:</strong>
          <span>{app.client}</span>

          <strong>Produs:</strong>
          <span>{app.product}</span>

          <strong>Sumă:</strong>
          <span>{app.amount} RON</span>

          <strong>Status:</strong>
          <div className="inline-block">
            <SalesStatusBadge status={app.status} />
          </div>

          <strong>Agent:</strong>
          <span>{app.agent}</span>

          <strong>Scor:</strong>
          <span>{app.score}</span>
        </div>

        <hr className="my-8" />

        <h3 className="font-semibold text-xl mb-3">Informații suplimentare</h3>

        <p className="text-gray-600 leading-relaxed">
          Aici poți adăuga informații extra:
          <br />• Documente încărcate
          <br />• Istoric procesare
          <br />• Date de contact ale clientului
        </p>

      </div>
    </div>
  );
}
