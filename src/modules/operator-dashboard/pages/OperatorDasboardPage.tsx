import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
import { mockDB } from "../data/mockDB";
import UiCard from "../components/ui/UiCard";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";

interface PieItem {
  label: string;
  value: number;
  color: string;
  [key: string]: string | number;
}

export default function OperatorDashboardPage() {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const applications = mockDB.riskApplications;
  const total = applications.length;
  const approved = applications.filter((a) => a.status === "approved").length;
  const rejected = applications.filter((a) => a.status === "rejected").length;
  const pending = applications.filter(
    (a) => a.status === "pending" || a.status === "manual_review"
  ).length;

  const totalApplication = total;
  const approvedPercent = totalApplication
    ? Math.round((approved / totalApplication) * 100)
    : 0;
  // Verdict
  let verdict = "Nivel sanatos";
  let icon = <CheckCircle className="text-green-500" />;

  if (approvedPercent < 50) {
    verdict = "Atentie!";
    icon = <AlertTriangle className="text-red-500" />;
  } else if (approvedPercent < 75) {
    verdict = "În monitorizare";
  }

  const kpiCards = [
    { label: "Total aplicații", value: total, icon: <AlertTriangle /> },
    { label: "Aprobate", value: approved, icon: <CheckCircle /> },
    { label: "Respinse", value: rejected, icon: <XCircle /> },
    { label: "În aşteptare", value: pending, icon: <Clock /> },
  ];

  const pieData: PieItem[] = [
    { label: "Aprobate", value: approved, color: "#22C55E" },
    { label: "Respinse", value: rejected, color: "#EF4444" },
    { label: "În aşteptare", value: pending, color: "#EAB308" },
  ];

  // MOCK
  const previosApprovedPercent = approvedPercent - 8; //mock trend
  const trend = approvedPercent - previosApprovedPercent;
  const trendUp = trend >= 0;

  return (
    <div className="w-full max-w-7xl mx-auto p-6 flex flex-col gap-10">
      {/* HEADER */}
      <h1 className="text-2xl font-semibold tracking-tight text-blue-500 dark:text-gray-300">
        Dashboard Monitorizare
      </h1>

      {/* SUMMARY CARD */}
      <div
        className={`flex flex-col sm:flex-row flex-wrap items-center justify-between p-4 sm:p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm gap-4`}
      >
        {/* Left: icon + text */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className={`flex items-center justify-center rounded-full 
        ${
          approvedPercent >= 75
            ? "bg-green-100"
            : approvedPercent >= 59
            ? "bg-yellow-100 text-yellow-600"
            : "bg-red-100 text-red-600"
        }
        ${windowWidth < 640 ? "w-10 h-10" : "w-12 h-12"}`}
          >
            {icon}
          </div>

          <div className="truncate min-w-0">
            <h3
              className={`font-semibold text-gray-900 dark:text-gray-100 ${
                windowWidth < 640 ? "text-base" : "text-lg"
              }`}
            >
              Rata de aprobare
            </h3>
            <p
              className={`text-gray-600 dark:text-gray-400 ${
                windowWidth < 640 ? "text-xs" : "text-sm"
              }`}
            >
              {verdict}
            </p>
            <div
              className={`flex items-center gap-1 mt-1 ${
                trendUp ? "text-green-600" : "text-red-600"
              } ${windowWidth < 640 ? "text-xs" : "text-sm"}`}
            >
              <span className="font-medium">
                {trendUp ? "▲" : "▼"}
                {Math.abs(trend)}%
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                vs perioada anterioara
              </span>
            </div>
          </div>
        </div>

        {/* Right: procent rotund */}
        <div
          className={`flex items-center justify-center rounded-full ${
            windowWidth < 640 ? "w-10 h-10 text-sm" : "w-12 h-12 text-base"
          } bg-gray-100 dark:bg-gray-700 font-semibold text-gray-900 dark:text-gray-100 flex-shrink-0`}
        >
          {approvedPercent}%
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* KPI CARDS*/}
        <div className="grid gap-5 w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2">
          {kpiCards.map((card, idx) => (
            <UiCard
              key={idx}
              icon={card.icon}
              label={card.label}
              value={card.value}
            />
          ))}
        </div>

        {/* PIE CHART */}
        <div className="flex items-center justify-center w-full lg:w-[45%] bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 ">
          <div className="flex flex-col items-center gap-6 w-full">
            <div className="relative w-full h-[320px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="label"
                    innerRadius={innerWidth < 640 ? 60 : 100}
                    outerRadius={innerWidth < 640 ? 90 : 140}
                    paddingAngle={3}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{ fontSize: windowWidth < 640 ? 10 : 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* TEXT CENTRAL */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span
                  className={` font-semibold text-gray-900 dark:text-gray-100 ${
                    windowWidth < 600 ? "text-2xl" : "text-4xl"
                  }`}
                >
                  {approvedPercent}%
                </span>
                <span
                  className={`text-gray-500 dark:text-gray-400 ${
                    windowWidth < 640 ? "text-xs" : "text-sm"
                  }`}
                >
                  Aprobate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
