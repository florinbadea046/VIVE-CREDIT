import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ProfileSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("onboardingCompleted", "true");
  }, []);

  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-gradient-to-b from-blue-50 to-white
        dark:bg-gradient-to-br dark:from-[#0b162f] dark:via-[#0f1c3d] dark:to-[#0a1124]
        px-4 py-10
      "
    >
      <Card
        className="
          w-full max-w-lg rounded-2xl p-6 shadow-xl
          bg-white dark:bg-[#162233]
          border border-blue-100 dark:border-[#1f2e44]
          text-gray-700 dark:text-[#c7d5ff]
        "
      >
        <CardHeader className="text-center">
          <CheckCircle
            size={56}
            className="mx-auto text-green-600 dark:text-green-400"
          />

          <CardTitle
            className="
              mt-4 text-3xl font-semibold
              text-green-700 dark:text-green-400
            "
          >
            Profil complet!
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center mt-4 space-y-4">
          <p className="text-lg">
            Datele tale de bază au fost salvate cu succes.
          </p>

          <p className="text-gray-600 dark:text-gray-400">
            Acum poți continua și folosi platforma Vive Credit.
          </p>

          <div className="pt-6 flex justify-center">
            <Button
              onClick={() => navigate("/dashboard/home")}
              className="
                bg-blue-600 hover:bg-blue-700
                dark:bg-blue-700 dark:hover:bg-blue-600
                text-white px-8 py-3 rounded-md text-lg
              "
            >
              Mergi la Dashboard →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSuccessPage;
