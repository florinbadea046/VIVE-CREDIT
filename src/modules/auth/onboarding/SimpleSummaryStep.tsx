import type { OnboardingFormData } from "../pages/OnboardingWizardPage";

interface Props {
  data: OnboardingFormData;
}

const SimpleSummaryStep = ({ data }: Props) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
        Rezumat date
      </h2>

      <p className="text-slate-500 dark:text-slate-300 mb-8">
        Verifică informațiile înainte de confirmare
      </p>

      <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-slate-500">Prenume</span>
          <span className="font-medium text-slate-900 dark:text-white">
            {data.firstName}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Nume</span>
          <span className="font-medium text-slate-900 dark:text-white">
            {data.lastName}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Telefon</span>
          <span className="font-medium text-slate-900 dark:text-white">
            {data.phone}
          </span>
        </div>

        <hr className="border-slate-200 dark:border-slate-700" />

        <div className="flex justify-between">
          <span className="text-slate-500">Oraș</span>
          <span className="font-medium text-slate-900 dark:text-white">
            {data.city}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Stradă</span>
          <span className="font-medium text-slate-900 dark:text-white">
            {data.street}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-500">Cod poștal</span>
          <span className="font-medium text-slate-900 dark:text-white">
            {data.postalCode}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SimpleSummaryStep;
