import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";

import UiCard from "../components/ui/UiCard";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import { useApplications } from "../hooks/ApplicationsContext";
import { PENDING_STATUSES } from "../constants/applicationStatus";
import { isInCollections } from "../utils/collections";

interface PieItem {
  label: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

export default function OperatorDashboardPage() {
  const { applications } = useApplications();
  const total = applications.length;
  const approved = applications.filter((a) => a.status === "approved").length;
  const collections = applications.filter(isInCollections).length;
  const rejected = applications.filter((a) => a.status === "rejected").length;
  const pending = applications.filter((a) =>
    PENDING_STATUSES.includes(a.status)
  ).length;

  const approvedPercent = total ? Math.round((approved / total) * 100) : 0;

  let verdict = "Nivel sănătos";
  let icon = <CheckCircle className="text-green-500" />;

  if (approvedPercent < 50) {
    verdict = "Atenție!";
    icon = <AlertTriangle className="text-red-500" />;
  } else if (approvedPercent < 75) {
    verdict = "În monitorizare";
  }

  const navigate = useNavigate();

  const kpiCards = [
    {
      label: "Total aplicații",
      value: total,
      icon: <AlertTriangle />,
      onClick: () => navigate("/operator/applications?status=all"),
    },
    {
      label: "Aprobate",
      value: approved,
      icon: <CheckCircle />,
      onClick: () => navigate("/operator/applications?status=approved"),
    },
    {
      label: "Respinse",
      value: rejected,
      icon: <XCircle />,
      onClick: () => navigate("/operator/applications?status=rejected"),
    },
    {
      label: "În așteptare ",
      value: pending,
      icon: <Clock />,
      onClick: () => navigate("/operator/applications?status=pending"),
    },
  ];

  const pieData: PieItem[] = [
    { label: "Aprobate", value: approved, color: "#22C55E" },
    { label: "Respinse", value: rejected, color: "#EF4444" },
    { label: "În așteptare", value: pending, color: "#EAB308" },
    { label: "În colecții", value: collections, color: "#F43F5E" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 flex flex-col gap-5">
      {/* HEADER */}
      <h1 className="text-2xl font-semibold tracking-tight text-gray-700 dark:text-gray-300 mb-3">
        Panou de monitorizare
      </h1>

      {/* Management Clienți Card */}
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:shadow-md transition cursor-pointer border border-gray-100 dark:border-gray-700 w-full max-w-[420px]"
        onClick={() => navigate("/operator/clients")}
      >
        <div className="flex items-center gap-2.5">
          <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full p-2.5 flex-shrink-0">
            <svg
              className="w-5 h-5 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
              Management Clienți
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Gestionare informații clienți
            </p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate("/operator/clients");
          }}
          className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
        >
          Accesează
        </button>
      </div>

      {/* SUMMARY */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center justify-center rounded-full w-12 h-12
              ${
                approvedPercent >= 75
                  ? "bg-green-100"
                  : approvedPercent >= 59
                  ? "bg-yellow-100"
                  : "bg-red-100"
              }`}
          >
            {icon}
          </div>

          <div>
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              Rata de aprobare
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {verdict}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Aplicații în colecții:{" "}
              <span className="font-medium">{collections}</span>
            </p>
          </div>
        </div>

        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-semibold">
          {approvedPercent}%
        </div>
      </div>

      {/* MAIN */}
      <div className="flex flex-col lg:flex-row gap-6 min-w-0">
        {/* KPI Cards */}
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl-grid-cols-2 gap-5">
          {kpiCards.map((card, i) => (
            <UiCard key={i} {...card} />
          ))}
        </div>

        {/* PIE CARD */}
        <div className="w-full lg:w-[45%] bg-white dark:bg-gray-800 rounded-2xl p-6 border shadow-sm min-w-0">
          <div className="flex flex-col items-center gap-6">
            {/* CHART */}
            <div className="relative w-full">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="label"
                    innerRadius="55%"
                    outerRadius="75%"
                    paddingAngle={3}
                    cx="50%"
                    cy="50%"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* CENTER TEXT */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                  {approvedPercent}%
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Aprobate
                </span>
              </div>
            </div>

            {/* LEGEND */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
              {pieData.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600 dark:text-gray-300">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
