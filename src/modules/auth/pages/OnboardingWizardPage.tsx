import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "../onboarding/StepIndicator";
import SimplePersonalStep from "../onboarding/SimplePersonalStep";
import SimpleAddressStep from "../onboarding/SimpleAddressStep";
import SimpleSummaryStep from "../onboarding/SimpleSummaryStep";
import WizardNavigation from "../onboarding/WizardNavigation";

export interface OnboardingFormData {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  street: string;
  postalCode: string;
}

const OnboardingWizardPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<OnboardingFormData>({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    street: "",
    postalCode: "",
  });

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate("/onboarding/profile/success");
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const isStepValid = (): boolean => {
    if (currentStep === 1) {
      return (
        formData.firstName.trim() !== "" &&
        formData.lastName.trim() !== "" &&
        formData.phone.trim().length >= 10
      );
    }

    if (currentStep === 2) {
      return (
        formData.city.trim() !== "" &&
        formData.street.trim() !== "" &&
        formData.postalCode.trim() !== ""
      );
    }

    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center px-4">
      <div
        className="bg-white dark:bg-slate-800 rounded-2xl
                shadow-lg md:shadow-xl
                w-full max-w-2xl
                p-6 sm:p-8 md:p-10"
      >
        <StepIndicator current={currentStep} total={3} />

        <div key={currentStep} className="animate-fade-slide">
          {currentStep === 1 && (
            <SimplePersonalStep data={formData} onChange={setFormData} />
          )}

          {currentStep === 2 && (
            <SimpleAddressStep data={formData} onChange={setFormData} />
          )}

          {currentStep === 3 && <SimpleSummaryStep data={formData} />}
        </div>

        <WizardNavigation
          currentStep={currentStep}
          totalSteps={3}
          onNext={nextStep}
          onBack={prevStep}
          canProceed={isStepValid()}
        />
      </div>
    </div>
  );
};

export default OnboardingWizardPage;
