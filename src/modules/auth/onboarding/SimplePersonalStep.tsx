import { useState, useEffect } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import type { OnboardingFormData } from "../pages/OnboardingWizardPage";

interface Props {
  data: OnboardingFormData;
  onChange: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
}

const SimplePersonalStep = ({ data, onChange }: Props) => {
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    phone: false,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  useEffect(() => {
    const nextErrors = {
      firstName: "",
      lastName: "",
      phone: "",
    };

    if (touched.firstName && data.firstName.trim().length < 2) {
      nextErrors.firstName = "Prenumele trebuie să aibă minim 2 caractere.";
    }

    if (touched.lastName && data.lastName.trim().length < 2) {
      nextErrors.lastName = "Numele trebuie să aibă minim 2 caractere.";
    }

    if (touched.phone) {
      if (!data.phone) {
        nextErrors.phone = "Introduceți un număr de telefon.";
      } else if (data.phone.startsWith("+40")) {
        if (!/^\+40[0-9]{9}$/.test(data.phone)) {
          nextErrors.phone = "Număr de telefon invalid.";
        }
      } else if (data.phone.length < 8) {
        nextErrors.phone = "Număr de telefon invalid.";
      }
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
        Informații personale
      </h2>

      <p className="text-slate-500 dark:text-slate-300 mb-8">
        Completează datele tale de bază
      </p>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Prenume
          </label>
          <input
            type="text"
            value={data.firstName}
            onBlur={() => setTouched((t) => ({ ...t, firstName: true }))}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
            className={inputClass(!!errors.firstName)}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Nume
          </label>
          <input
            type="text"
            value={data.lastName}
            onBlur={() => setTouched((t) => ({ ...t, lastName: true }))}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                lastName: e.target.value,
              }))
            }
            className={inputClass(!!errors.lastName)}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Telefon
          </label>

          <PhoneInput
            defaultCountry="ro"
            value={data.phone}
            onChange={(phone: string) =>
              onChange((prev) => ({ ...prev, phone }))
            }
            onFocus={() => setTouched((t) => ({ ...t, phone: true }))}
            className="w-full"
            inputClassName={`
              !w-full !px-4 !py-3 !rounded-lg
              !bg-white !text-slate-900
              !border ${errors.phone ? "!border-red-500" : "!border-slate-300"}
              focus:!ring-2 focus:!ring-blue-600
              dark:!bg-slate-900 dark:!text-white
              dark:!border-slate-700
            `}
            countrySelectorStyleProps={{
              buttonClassName:
                "!bg-white !border !border-slate-300 dark:!bg-slate-900 dark:!border-slate-700",
            }}
            placeholder="+40 XXXXXXXX"
          />

          {errors.phone && (
            <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimplePersonalStep;
