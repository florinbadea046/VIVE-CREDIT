import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
}

const WizardNavigation = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  canProceed,
}: Props) => {
  const isLastStep = currentStep === totalSteps;
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (currentStep === 1) {
      setShowExitConfirm(true);
    } else {
      onBack();
    }
  };

  const confirmExit = () => {
    setShowExitConfirm(false);
    navigate("/login");
  };

  return (
    <>
      <div
        className="flex flex-col-reverse sm:flex-row gap-4
                   justify-between items-stretch sm:items-center mt-10"
      >
        <button
          onClick={handleBackClick}
          className="w-full sm:w-auto px-6 py-3 rounded-lg
                     border border-slate-300 dark:border-slate-700
                     text-slate-700 dark:text-slate-300
                     hover:bg-slate-100 dark:hover:bg-slate-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     transition"
        >
          Înapoi
        </button>

        <button
          onClick={onNext}
          disabled={!canProceed}
          className="w-full sm:w-auto px-8 py-3 rounded-lg
                     bg-blue-600 text-white font-semibold
                     hover:bg-blue-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition"
        >
          {isLastStep ? "Confirmă" : "Continuă"}
        </button>
      </div>

      {showExitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowExitConfirm(false)}
          />

          <div
            className="relative w-full max-w-md rounded-2xl p-6
                       bg-white dark:bg-slate-800
                       shadow-2xl"
          >
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
              Ești sigur că vrei să ieși?
            </h3>

            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Datele completate până acum nu vor fi salvate.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="px-5 py-2.5 rounded-lg
                           border border-slate-300 dark:border-slate-700
                           text-slate-700 dark:text-slate-300
                           hover:bg-slate-100 dark:hover:bg-slate-700
                           transition"
              >
                Rămân
              </button>

              <button
                onClick={confirmExit}
                className="px-5 py-2.5 rounded-lg
                           bg-red-600 text-white font-semibold
                           hover:bg-red-700
                           transition"
              >
                Ieși
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WizardNavigation;
