import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
import { mockDB } from "../data/mockDB";
import UiCard from "../components/ui/UiCard";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

interface PieItem {
  label: string;
  value: number;
  color: string;
}

export default function OperatorDashboardPage() {
  const applications = mockDB.riskApplications;

  const total = applications.length;
  const approved = applications.filter((a) => a.status === "approved").length;
  const rejected = applications.filter((a) => a.status === "rejected").length;
  const pending = applications.filter(
    (a) => a.status === "pending" || a.status === "manual_review"
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
      label: "În așteptare",
      value: pending,
      icon: <Clock />,
      onClick: () => navigate("/operator/applications?status=pending"),
    },
  ];

  const pieData: PieItem[] = [
    { label: "Aprobate", value: approved, color: "#22C55E" },
    { label: "Respinse", value: rejected, color: "#EF4444" },
    { label: "În așteptare", value: pending, color: "#EAB308" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 flex flex-col gap-10">
      {/* HEADER */}
      <h1 className="text-2xl font-semibold tracking-tight text-blue-500 dark:text-gray-300">
        Dashboard Monitorizare
      </h1>

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
          </div>
        </div>

        <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center font-semibold">
          {approvedPercent}%
        </div>
      </div>

      {/* MAIN */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* KPI */}
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
          {kpiCards.map((card, i) => (
            <UiCard key={i} {...card} />
          ))}
        </div>

        {/* PIE CARD */}
        <div className="w-full lg:w-[45%] bg-white dark:bg-gray-800 rounded-2xl p-6 border shadow-sm">
          <div className="flex flex-col items-center gap-6">
            {/* CHART */}
            <div className="relative w-full h-[260px] sm:h-[300px]">
              <ResponsiveContainer>
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
