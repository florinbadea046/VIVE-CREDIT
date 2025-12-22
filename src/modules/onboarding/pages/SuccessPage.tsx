import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { applicationId, fullName } = location.state || {};

  useEffect(() => {
    localStorage.setItem("onboardingCompleted", "true");
    localStorage.setItem("showRegistrationSuccess", "true");
  }, []);

  return (
    <div
      className="
        min-h-screen flex items-center justify-center 
        bg-gradient-to-b from-blue-50 to-white 
        dark:bg-gradient-to-br dark:from-[#0b162f] dark:via-[#0f1c3d] dark:to-[#0a1124] 
        dark:shadow-[0_0_80px_rgba(0,102,255,0.25)] 
        dark:ring-1 dark:ring-blue-900/20
        px-4 py-10
      "
    >
      <Card
        className="
          w-full max-w-lg shadow-xl rounded-2xl p-6
          bg-white dark:bg-[#162233]
          border border-blue-100 dark:border-[#1f2e44]
          text-gray-700 dark:text-[#c7d5ff]
        "
      >
        <CardHeader className="text-center">
          <CheckCircle
            className="mx-auto text-green-600 dark:text-green-400"
            size={60}
          />

          <CardTitle
            className="
              text-3xl font-semibold mt-4
              text-green-700 dark:text-green-400
            "
          >
            Aplicația ta a fost finalizată cu succes!
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center mt-4">
          <p className="text-gray-700 dark:text-[#c7d5ff] text-lg">
            Mulțumim,{" "}
            <span className="font-semibold text-blue-700 dark:text-blue-400">
              {fullName || "client"}
            </span>
            !
          </p>

          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Datele tale au fost înregistrate și aplicația a fost trimisă spre
            analiză.
          </p>

          {applicationId && (
            <div
              className="
                mt-6 py-3 px-4 rounded-lg
                bg-green-50 dark:bg-[#133015]
                border border-green-200 dark:border-green-800
              "
            >
              <p className="text-sm text-green-800 dark:text-green-400">
                Număr aplicație:
              </p>
              <p className="text-xl font-semibold text-green-900 dark:text-green-300 tracking-wide">
                {applicationId}
              </p>
            </div>
          )}

          <p className="text-gray-600 dark:text-gray-400 mt-6">
            Un consultant va analiza informațiile furnizate și te va contacta în
            cel mai scurt timp pentru pașii următori.
          </p>

          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => navigate("/dashboard/home")}
              className="
                bg-blue-600 hover:bg-blue-700 
                dark:bg-blue-700 dark:hover:bg-blue-600
                text-white px-8 py-3 rounded-md text-lg
              "
            >
              Accesează contul tău →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
