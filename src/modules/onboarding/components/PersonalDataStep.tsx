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
      if (!value.trim()) error = "Introduceți un nume complet valid.";
    }

    if (name === "cnp") {
      if (!/^\d{13}$/.test(value.trim()))
        error = "CNP-ul trebuie să conțină exact 13 cifre.";
    }

    if (name === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
        error = "Introduceți o adresă de email validă.";
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
    <div className="w-full bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-md mx-auto shadow-lg border border-blue-100">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-blue-700">
            Pasul 1 — Date personale
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="fullName">Nume complet</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Ex: Popescu Andrei"
                value={formData.fullName}
                onChange={handleChange}
                className={errors.fullName ? "border-red-500" : ""}
                required
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="cnp">CNP</Label>
              <Input
                id="cnp"
                name="cnp"
                placeholder="Ex: 5010101223344"
                maxLength={13}
                value={formData.cnp}
                onChange={handleChange}
                className={errors.cnp ? "border-red-500" : ""}
                required
              />
              {errors.cnp && (
                <p className="text-red-500 text-sm mt-1">{errors.cnp}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="exemplu@email.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
                required
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
              className={`px-6 text-white ${
                isValid
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Continuă
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
