import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PersonalDataStep from "../components/PersonalDataStep";
import AddressDataStep from "../components/AddressDataStep";
import WorkDataStep from "../components/WorkDataStep";
import DocumentUploadStep from "../components/DocumentUploadStep";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

import type { OnboardingData } from "@/modules/onboarding/types/onboarding";
import { useTranslation } from "react-i18next";

export default function OnboardingPage() {
  const { t } = useTranslation("onboarding");
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
      uploadedLinks: [],
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
          uploadedLinks:
            newData.documents?.uploadedLinks ?? prev.documents.uploadedLinks,
        },
      })
    );
  };

  const steps = [
    t("onboardingPage.steps.personalData"),
    t("onboardingPage.steps.address"),
    t("onboardingPage.steps.workplace"),
    t("onboardingPage.steps.documents"),
    t("onboardingPage.steps.summary"),
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
      alert(t("onboardingPage.errors.requiredFields"));
      return;
    }

    if (!formData.phone.startsWith("+")) {
      alert(t("onboardingPage.errors.phonePrefix"));
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
    <div
      className="
      min-h-screen flex flex-col items-center relative px-4 pt-16 pb-10
      bg-gradient-to-b from-blue-50 to-white
      dark:bg-gradient-to-br dark:from-[#0b162f] dark:via-[#0f1c3d] dark:to-[#0a1124] dark:shadow-[0_0_80px_rgba(0,102,255,0.25)] dark:ring-1 dark:ring-blue-900/20
      transition-all duration-500
    "
    >
      <div className="absolute top-4 left-4 flex items-center gap-2 z-50">
        <button
          onClick={() => navigate(-1)}
          className="
      flex items-center justify-center rounded-md transition
      bg-blue-600 text-white hover:bg-blue-700
      dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200

      w-8 h-8 text-lg
      sm:w-10 sm:h-10 sm:text-xl
    "
        >
          ‹
        </button>

        <div className="scale-90 sm:scale-100">
          <ThemeToggle />
        </div>
      </div>

      <div className="w-full max-w-2xl mb-6">
        <div className="hidden md:flex justify-between items-center mb-5">
          {steps.map((label, index) => {
            const current = index + 1;
            const isActive = current === step;
            const isCompleted = current < step;

            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div
                  className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                  ${
                    isCompleted
                      ? "bg-blue-600 border-blue-600 text-white dark:bg-blue-700 dark:border-blue-700"
                      : isActive
                      ? "bg-blue-300 border-blue-400 text-blue-900 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200"
                      : "bg-blue-100 border-blue-300 text-blue-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                  }
                `}
                >
                  {isCompleted ? <Check size={18} /> : current}
                </div>

                <span className="text-xs mt-2 text-blue-700 dark:text-blue-300 text-center">
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex md:hidden justify-between items-start mb-4 w-full px-1 gap-1">
          {steps.map((label, index) => {
            const current = index + 1;
            const isActive = current === step;
            const isCompleted = current < step;

            return (
              <div
                key={index}
                className="flex flex-col items-center"
                style={{ width: "20%" }}
              >
                <div
                  className={`
                  flex items-center justify-center w-7 h-7 rounded-full border-[2px] text-xs transition
                  ${
                    isCompleted
                      ? "bg-blue-600 border-blue-600 text-white dark:bg-blue-700 dark:border-blue-700"
                      : isActive
                      ? "bg-blue-200 border-blue-400 text-blue-900 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200"
                      : "bg-blue-100 border-blue-300 text-blue-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                  }
                `}
                >
                  {isCompleted ? <Check size={14} /> : current}
                </div>

                <span className="text-[10px] mt-1 text-blue-700 dark:text-blue-300 leading-tight text-center">
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="relative w-full h-3 bg-blue-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
          <div
            className="absolute top-0 left-0 h-full bg-blue-600 dark:bg-blue-700 rounded-full transition-all duration-500"
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="w-full max-w-md mt-4">
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
          <Card
            className="shadow-lg border border-blue-100 dark:border-[#1f2e44]
             p-6 bg-white dark:bg-[#162233]
             text-gray-900 dark:text-[#c7d5ff] rounded-2xl"
          >
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                <span>📝</span> {t("onboardingPage.summary.title")}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-left space-y-3 text-gray-800 dark:text-[#c7d5ff]">
                <p>
                  <b className="text-blue-700 dark:text-blue-400">
                    {t("onboardingPage.summary.fields.name")}:
                  </b>{" "}
                  {formData.fullName}
                </p>
                <p>
                  <b className="text-blue-700 dark:text-blue-400">
                    {t("onboardingPage.summary.fields.cnp")}:
                  </b>{" "}
                  {formData.cnp}
                </p>
                <p>
                  <b className="text-blue-700 dark:text-blue-400">
                    {t("onboardingPage.summary.fields.email")}:
                  </b>{" "}
                  {formData.email}
                </p>
                <p>
                  <b className="text-blue-700 dark:text-blue-400">
                    {t("onboardingPage.summary.fields.address")}:
                  </b>{" "}
                  {formData.address}, {formData.city}, {formData.county}
                </p>
                <p>
                  <b className="text-blue-700 dark:text-blue-400">
                    {t("onboardingPage.summary.fields.phone")}:
                  </b>{" "}
                  {formData.phone}
                </p>

                <hr className="my-4 border-gray-300 dark:border-[#243247]" />

                <p>
                  <b className="text-blue-700 dark:text-blue-400">
                    {t("onboardingPage.summary.fields.company")}:
                  </b>{" "}
                  {formData.company}
                </p>
                <p>
                  <b className="text-blue-700 dark:text-blue-400">
                    {t("onboardingPage.summary.fields.position")}:
                  </b>{" "}
                  {formData.position}
                </p>
                <p>
                  <b className="text-blue-700 dark:text-blue-400">
                    {t("onboardingPage.summary.fields.income")}:
                  </b>{" "}
                  {formData.income} RON
                </p>
                <p>
                  <b className="text-blue-700 dark:text-blue-400">
                    {t("onboardingPage.summary.fields.experience")}:
                  </b>{" "}
                  {formData.experience}{" "}
                  {t("onboardingPage.summary.fields.years")}
                </p>

                <hr className="my-4 border-gray-300 dark:border-[#243247]" />

                <p>
                  <b className="text-blue-700 dark:text-blue-400">
                    {t("onboardingPage.summary.fields.documentsUploaded")}:
                  </b>
                </p>

                <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300">
                  {formData.documents.idCard && (
                    <li>{t("onboardingPage.summary.documentsList.idCard")}</li>
                  )}
                  {formData.documents.incomeProof && (
                    <li>
                      {t("onboardingPage.summary.documentsList.incomeProof")}
                    </li>
                  )}
                  {formData.documents.otherDocs.length > 0 && (
                    <li>
                      {t("onboardingPage.summary.documentsList.otherDocs", {
                        count: formData.documents.otherDocs.length,
                      })}
                    </li>
                  )}
                </ul>

                <div className="flex flex-col sm:flex-row justify-between mt-6 gap-3">
                  <button
                    onClick={() => setStep(4)}
                    className="
          bg-blue-600 hover:bg-blue-700 text-white
          dark:bg-blue-700 dark:hover:bg-blue-600
          px-6 py-2 rounded-md w-full flex items-center justify-center gap-2
        "
                  >
                    <span>📁</span>{" "}
                    {t("onboardingPage.summary.buttons.editDocuments")}
                  </button>

                  <button
                    onClick={handleSubmit}
                    className="
          bg-green-600 hover:bg-green-700 text-white
          dark:bg-green-700 dark:hover:bg-green-600
          px-6 py-2 rounded-md w-full
        "
                  >
                    {t("onboardingPage.summary.buttons.finalize")}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
