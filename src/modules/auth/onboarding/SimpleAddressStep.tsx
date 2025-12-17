import { useState, useEffect } from "react";
import type { OnboardingFormData } from "../pages/OnboardingWizardPage";

interface Props {
  data: OnboardingFormData;
  onChange: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
}

const SimpleAddressStep = ({ data, onChange }: Props) => {
  const [touched, setTouched] = useState({
    city: false,
    street: false,
    postalCode: false,
  });

  const [errors, setErrors] = useState({
    city: "",
    street: "",
    postalCode: "",
  });

  useEffect(() => {
    const nextErrors = {
      city: "",
      street: "",
      postalCode: "",
    };

    if (touched.city && data.city.trim().length < 2) {
      nextErrors.city = "Orașul trebuie să aibă minim 2 caractere.";
    }

    if (touched.street && data.street.trim().length < 1) {
      nextErrors.street = "Introduceți strada.";
    }

    if (touched.postalCode && !/^[0-9]{6}$/.test(data.postalCode.trim())) {
      nextErrors.postalCode = "Cod poștal invalid (6 cifre).";
    }

    setErrors(nextErrors);
  }, [data, touched]);

  const inputClass = (hasError: boolean) =>
    `w-full rounded-lg px-4 py-3
     bg-white dark:bg-slate-900
     text-slate-900 dark:text-white
     border ${
       hasError
         ? "border-red-500 focus:ring-red-500"
         : "border-slate-300 dark:border-slate-700 focus:ring-blue-600"
     }
     focus:outline-none focus:ring-2`;

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
        Adresă
      </h2>

      <p className="text-slate-500 dark:text-slate-300 mb-8">
        Spune-ne unde locuiești
      </p>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Oraș
          </label>
          <input
            type="text"
            value={data.city}
            onBlur={() => setTouched((t) => ({ ...t, city: true }))}
            onChange={(e) =>
              onChange((prev) => ({ ...prev, city: e.target.value }))
            }
            className={inputClass(!!errors.city)}
          />
          {errors.city && (
            <p className="text-sm text-red-500 mt-1">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Stradă
          </label>
          <input
            type="text"
            value={data.street}
            onBlur={() => setTouched((t) => ({ ...t, street: true }))}
            onChange={(e) =>
              onChange((prev) => ({ ...prev, street: e.target.value }))
            }
            className={inputClass(!!errors.street)}
          />
          {errors.street && (
            <p className="text-sm text-red-500 mt-1">{errors.street}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Cod poștal
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={data.postalCode}
            onBlur={() => setTouched((t) => ({ ...t, postalCode: true }))}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                postalCode: e.target.value.replace(/\D/g, ""),
              }))
            }
            className={inputClass(!!errors.postalCode)}
          />
          {errors.postalCode && (
            <p className="text-sm text-red-500 mt-1">{errors.postalCode}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleAddressStep;
