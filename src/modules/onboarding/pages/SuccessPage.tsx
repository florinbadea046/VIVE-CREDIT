import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { applicationId, fullName } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-10">
      <Card className="w-full max-w-lg shadow-xl border border-blue-100 rounded-2xl p-6">
        <CardHeader className="text-center">
          <CheckCircle className="mx-auto text-green-600" size={60} />
          <CardTitle className="text-3xl font-semibold text-green-700 mt-4">
            Cererea ta a fost trimisă cu succes!
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center mt-4">
          <p className="text-gray-700 text-lg">
            Mulțumim,{" "}
            <span className="font-semibold text-blue-700">{fullName}</span>!
          </p>

          <p className="text-gray-600 mt-2">
            Cererea ta a fost înregistrată în sistemul nostru.
          </p>

          {applicationId && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg py-3 px-4">
              <p className="text-sm text-green-800">Număr cerere de credit:</p>
              <p className="text-xl font-semibold text-green-900 tracking-wide">
                {applicationId}
              </p>
            </div>
          )}

          <p className="text-gray-600 mt-6">
            Un consultant va analiza documentele și te va contacta în cel mai
            scurt timp pentru finalizarea procesului.
          </p>

          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md text-lg"
            >
              Mergi la Dashboard →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
