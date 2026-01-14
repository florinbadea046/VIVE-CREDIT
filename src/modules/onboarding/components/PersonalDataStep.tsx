import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import type { OnboardingData } from "@/modules/onboarding/types/onboarding";

interface PersonalDataStepProps {
  onNext: () => void;
  updateData: (data: Partial<OnboardingData>) => void;
  initialData: OnboardingData;
}

export default function PersonalDataStep({
  onNext,
  updateData,
  initialData,
}: PersonalDataStepProps) {
  const { t } = useTranslation("onboarding");

  const [formData, setFormData] = useState({
    fullName: initialData.fullName || "",
    cnp: initialData.cnp || "",
    email: initialData.email || "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    cnp: "",
    email: "",
  });

  const [isValid, setIsValid] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "fullName") {
      if (!value.trim()) error = t("personalData.errors.fullName");
    }

    if (name === "cnp") {
      if (!/^\d{13}$/.test(value.trim())) error = t("personalData.errors.cnp");
    }

    if (name === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
        error = t("personalData.errors.email");
    }

    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const newError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: newError }));
  };

  useEffect(() => {
    const noErrors =
      !errors.fullName &&
      !errors.cnp &&
      !errors.email &&
      formData.fullName.trim() !== "" &&
      formData.cnp.trim() !== "" &&
      formData.email.trim() !== "";

    setIsValid(noErrors);
  }, [errors, formData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    updateData({
      fullName: formData.fullName.trim(),
      cnp: formData.cnp.trim(),
      email: formData.email.trim(),
    });

    onNext();
  };

  return (
    <div className="w-full p-4 bg-transparent">
      <Card
        className="
          w-full max-w-md mx-auto
          shadow-lg 
          border border-blue-100 dark:border-[#1f2e44]
          bg-white dark:bg-[#162233]
          text-gray-900 dark:text-[#c7d5ff]
        "
      >
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
            {t("personalData.title")}
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fullName" className="dark:text-[#c7d5ff]">
                {t("personalData.fields.fullName.label")}
              </Label>

              <Input
                id="fullName"
                name="fullName"
                placeholder={t("personalData.fields.fullName.placeholder")}
                value={formData.fullName}
                onChange={handleChange}
                className={`
                  bg-white dark:bg-[#0c1324]
                  text-gray-900 dark:text-[#c7d5ff]
                  border
                  ${
                    errors.fullName
                      ? "border-red-500 dark:border-red-400"
                      : "border-gray-300 dark:border-[#243247]"
                  }
                `}
              />

              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="cnp" className="dark:text-[#c7d5ff]">
                {t("personalData.fields.cnp.label")}
              </Label>

              <Input
                id="cnp"
                name="cnp"
                placeholder={t("personalData.fields.cnp.placeholder")}
                maxLength={13}
                value={formData.cnp}
                onChange={handleChange}
                className={`
                  bg-white dark:bg-[#0c1324]
                  text-gray-900 dark:text-[#c7d5ff]
                  border
                  ${
                    errors.cnp
                      ? "border-red-500 dark:border-red-400"
                      : "border-gray-300 dark:border-[#243247]"
                  }
                `}
              />

              {errors.cnp && (
                <p className="text-red-500 text-sm mt-1">{errors.cnp}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="dark:text-[#c7d5ff]">
                {t("personalData.fields.email.label")}
              </Label>

              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t("personalData.fields.email.placeholder")}
                value={formData.email}
                onChange={handleChange}
                className={`
                  bg-white dark:bg-[#0c1324]
                  text-gray-900 dark:text-[#c7d5ff]
                  border
                  ${
                    errors.email
                      ? "border-red-500 dark:border-red-400"
                      : "border-gray-300 dark:border-[#243247]"
                  }
                `}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              disabled={!isValid}
              className={`
                px-6 text-white
                ${
                  isValid
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-500 dark:bg-gray-700 cursor-not-allowed"
                }
              `}
            >
              {t("personalData.continueButton")}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
