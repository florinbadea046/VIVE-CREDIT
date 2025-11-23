import type { ReactNode } from "react";

interface CardWrapperProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  rightSection?: ReactNode;
}

export default function CardWrapper({
  title,
  icon,
  children,
  rightSection,
}: CardWrapperProps) {
  return (
    <div className="bg-white border border-blue-100 shadow-lg rounded-2xl p-5 sm:p-6 transition-all">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="text-blue-600 flex items-center">{icon}</div>
          )}
          <h2 className="text-blue-700 text-xl font-semibold tracking-tight">
            {title}
          </h2>
        </div>

        {rightSection && (
          <div className="flex-shrink-0 flex items-center">{rightSection}</div>
        )}
      </div>

      <div className="text-gray-700 text-sm sm:text-base">{children}</div>
    </div>
  );
}
