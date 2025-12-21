interface Props {
  icon?: React.ReactNode;
  label: string;
  value: number | string;
}
export default function UiCard({ icon, label, value }: Props) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col gap-2 items-center justify-center text-center min-h-[110px]">
      <div className="text-blue-600 text-2xl flex-shrink-0">{icon}</div>
      <div className="flex flex-col w-full">
        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
          {label}
        </div>
        <div className="text-xl sm:text-xl font-semibold text-gray-800 dark:text-gray-100 trubcate">
          {value}
        </div>
      </div>
    </div>
  );
}
