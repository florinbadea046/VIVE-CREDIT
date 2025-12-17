interface Props {
  current: number;
  total: number;
}

const StepIndicator = ({ current, total }: Props) => {
  return (
    <div className="flex justify-center gap-4 mb-10">
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isCompleted = step < current;

        return (
          <div
            key={step}
            className={`w-10 h-10 rounded-full flex items-center justify-center
                        font-semibold transition-all duration-200
              ${
                isCompleted
                  ? "bg-blue-600 text-white"
                  : isActive
                  ? "bg-blue-500 text-white ring-4 ring-blue-200 scale-105"
                  : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300"
              }`}
          >
            {step}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
