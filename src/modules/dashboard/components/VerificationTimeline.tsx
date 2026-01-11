import React from "react";

function formatDate(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleString("ro-RO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export interface TimelineStep {
  id: number;
  title: string;
  status: "completed" | "current" | "pending" | "rejected";
  date?: string;
  badge?: string; // opțional: ex "KYC", "AML", "APPROVED", "REJECTED"
}

function classNames(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function statusStyles(status: TimelineStep["status"]) {
  switch (status) {
    case "completed":
      return {
        circle: "bg-green-600 text-white",
        line: "bg-gray-300",
        badge: "bg-green-100 text-green-800",
      };
    case "current":
      return {
        circle: "bg-blue-600 text-white ring-4 ring-blue-100",
        line: "bg-gray-300",
        badge: "bg-blue-100 text-blue-800",
      };
    case "rejected":
      return {
        circle: "bg-red-500 text-white",
        line: "bg-gray-300",
        badge: "bg-red-100 text-red-800",
      };
    default:
      return {
        circle: "bg-gray-300 text-gray-700",
        line: "bg-gray-300",
        badge: "bg-gray-100 text-gray-700",
      };
  }
}

export default function VerificationTimeline({
  steps,
}: {
  steps: TimelineStep[];
}) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const styles = statusStyles(step.status);

        return (
          <div key={step.id} className="flex gap-4">
            {/* Linia + cerc */}
            <div className="flex flex-col items-center">
              <div
                className={classNames(
                  "w-8 h-8 rounded-full flex items-center justify-center text-lg font-semibold",
                  styles.circle
                )}
                aria-label={`Step ${index + 1} ${step.status}`}
              >
                {step.status === "completed" && "✓"}
                {step.status === "rejected" && (
                  <span className="text-xl text-white">&#10005;</span>
                )}
                {step.status !== "completed" &&
                  step.status !== "rejected" &&
                  index + 1}
              </div>

              {index < steps.length - 1 && (
                <div className={classNames("w-0.5 h-10 mt-2", styles.line)} />
              )}
            </div>

            {/* Conținut */}
            <div className="flex-1 pb-4">
              <div className="flex items-center justify-between gap-3 min-h-[40px]">
                <div>
                  <h3
                    className={classNames(
                      "font-medium",
                      step.status === "current" && "text-blue-700"
                    )}
                  >
                    {step.title}
                  </h3>

                  {step.date && (
                    <p className="text-sm text-gray-500">
                      {formatDate(step.date)}
                    </p>
                  )}
                </div>

                {/* Badge status (opțional) */}
                {step.badge && (
                  <span
                    className={classNames(
                      "px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap",
                      styles.badge
                    )}
                  >
                    {step.badge}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
