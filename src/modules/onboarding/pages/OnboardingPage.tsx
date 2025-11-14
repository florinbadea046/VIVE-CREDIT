import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PersonalDataStep from "../components/PersonalDataStep";
import AddressDataStep from "../components/AddressDataStep";
import WorkDataStep from "../components/WorkDataStep";
import DocumentUploadStep from "../components/DocumentUploadStep";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import type { OnboardingData } from "@/modules/onboarding/types/onboarding";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const totalSteps = 5;

  const [formData, setFormData] = useState<OnboardingData>({
    fullName: "",
    cnp: "",
    email: "",
    address: "",
    city: "",
    county: "",
    phone: "",
    company: "",
    position: "",
    income: "",
    experience: "",
    documents: {
      idCard: null,
      incomeProof: null,
      otherDocs: [],
    },
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const updateData = (newData: Partial<OnboardingData>) => {
    setFormData(
      (prev): OnboardingData => ({
        ...prev,
        ...newData,
        documents: {
          idCard: newData.documents?.idCard ?? prev.documents.idCard,
          incomeProof:
            newData.documents?.incomeProof ?? prev.documents.incomeProof,
          otherDocs: newData.documents?.otherDocs ?? prev.documents.otherDocs,
        },
      })
    );
  };

  const steps = [
    "Date personale",
    "Adresă",
    "Loc de muncă",
    "Documente",
    "Rezumat",
  ];

  const handleSubmit = () => {
    const requiredFields = {
      fullName: formData.fullName,
      cnp: formData.cnp,
      email: formData.email,
      address: formData.address,
      city: formData.city,
      county: formData.county,
      phone: formData.phone,
      company: formData.company,
      position: formData.position,
      income: formData.income,
      experience: formData.experience,
      idCard: formData.documents.idCard,
      incomeProof: formData.documents.incomeProof,
    };

    const invalid = Object.values(requiredFields).some(
      (value) => !value || String(value).trim() === ""
    );

    if (invalid) {
      alert("Completați toate câmpurile obligatorii.");
      return;
    }

    if (!formData.phone.startsWith("+")) {
      alert("Prefixul internațional lipsește. Verificați numărul de telefon.");
      return;
    }

    const applicationId = "VC-" + Date.now();

    navigate("/onboarding/success", {
      state: {
        applicationId,
        fullName: formData.fullName,
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 to-white pt-8 md:pt-12 pb-10 px-4 transition-all duration-500">
      <div className="w-full max-w-2xl mb-4 md:mb-6">
        <div className="flex justify-between items-center mb-4 md:mb-5">
          {steps.map((label, index) => {
            const current = index + 1;
            const isActive = current === step;
            const isCompleted = current < step;

            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    isCompleted
                      ? "bg-blue-600 border-blue-600 text-white"
                      : isActive
                      ? "bg-blue-300 border-blue-400 text-blue-800"
                      : "bg-blue-100 border-blue-300 text-blue-400"
                  }`}
                >
                  {isCompleted ? <Check size={18} /> : current}
                </div>
                <span className="text-xs mt-2 text-blue-700">{label}</span>
              </div>
            );
          })}
        </div>

        <div className="relative w-full h-3 bg-blue-100 rounded-full overflow-hidden shadow-inner">
          <div
            className="absolute top-0 left-0 h-full bg-blue-600 bg-opacity-80 rounded-full transition-all duration-500"
            style={{
              width: `${((step - 1) / (totalSteps - 1)) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="w-full max-w-md mt-2 md:mt-4">
        {step === 1 && (
          <PersonalDataStep
            onNext={handleNext}
            updateData={updateData}
            initialData={formData}
          />
        )}

        {step === 2 && (
          <AddressDataStep
            onNext={handleNext}
            onBack={handleBack}
            updateData={updateData}
            initialData={formData}
          />
        )}

        {step === 3 && (
          <WorkDataStep
            onNext={handleNext}
            onBack={handleBack}
            updateData={updateData}
            initialData={formData}
          />
        )}

        {step === 4 && (
          <DocumentUploadStep
            onNext={handleNext}
            onBack={handleBack}
            updateData={updateData}
            initialData={formData}
          />
        )}

        {step === 5 && (
          <Card className="shadow-lg border border-blue-100 p-6 bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-blue-700 flex items-center gap-2">
                <span>📝</span> Rezumat final
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-left space-y-2">
                <p>
                  <b className="text-blue-700">Nume:</b> {formData.fullName}
                </p>
                <p>
                  <b className="text-blue-700">CNP:</b> {formData.cnp}
                </p>
                <p>
                  <b className="text-blue-700">Email:</b> {formData.email}
                </p>
                <p>
                  <b className="text-blue-700">Adresă:</b> {formData.address},{" "}
                  {formData.city}, {formData.county}
                </p>
                <p>
                  <b className="text-blue-700">Telefon:</b> {formData.phone}
                </p>

                <hr className="my-3" />

                <p>
                  <b className="text-blue-700">Companie:</b> {formData.company}
                </p>
                <p>
                  <b className="text-blue-700">Funcție:</b> {formData.position}
                </p>
                <p>
                  <b className="text-blue-700">Venit NET:</b>{" "}
                  {`${formData.income} RON`}
                </p>
                <p>
                  <b className="text-blue-700">Experiență:</b>{" "}
                  {formData.experience} ani
                </p>

                <hr className="my-3" />

                <p>
                  <b className="text-blue-700">Documente încărcate:</b>
                </p>
                <ul className="list-disc ml-5 text-sm text-gray-700">
                  {formData.documents.idCard && <li>Act identitate</li>}
                  {formData.documents.incomeProof && <li>Dovadă venit</li>}
                  {formData.documents.otherDocs.length > 0 && (
                    <li>
                      {formData.documents.otherDocs.length} alte documente
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row justify-between mt-6 gap-3">
                <button
                  onClick={() => setStep(4)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md w-full flex items-center justify-center gap-2"
                >
                  <span>📁</span> Modifică documente
                </button>

                <button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md w-full"
                >
                  Trimite cererea
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
