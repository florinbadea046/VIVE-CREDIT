import CardWrapper from "../../components/CardWrapper";
import { CreditCard } from "lucide-react";

type Credit = {
  id: number;
  totalAmount: number;
  remainingAmount: number;
  monthlyPayment: number;
};

export default function CreditsCard({ credits }: { credits: Credit[] }) {
  return (
    <CardWrapper title="Creditele mele" icon={<CreditCard size={22} />}>
      {credits.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">
          Nu ai credite active.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {credits.map((credit) => {
            const paid = credit.totalAmount - credit.remainingAmount;
            const progress = Math.round((paid / credit.totalAmount) * 100);

            return (
              <div
                key={credit.id}
                className="
                  p-5 rounded-xl 
                  border border-blue-100 dark:border-white/10 
                  bg-blue-50/40 dark:bg-[#2A3B55]/30
                  shadow-sm
                  space-y-3
                "
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-blue-900 dark:text-white">
                    Credit #{credit.id}
                  </p>

                  <CreditCard
                    size={18}
                    className="text-blue-700 dark:text-blue-300"
                  />
                </div>

                <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <p>
                    Suma totală:{" "}
                    <span className="font-medium">
                      {credit.totalAmount} RON
                    </span>
                  </p>

                  <p>
                    Rămas de plată:{" "}
                    <span className="font-medium">
                      {credit.remainingAmount} RON
                    </span>
                  </p>

                  <p>
                    Rata lunară:{" "}
                    <span className="font-medium">
                      {credit.monthlyPayment} RON
                    </span>
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>Progres plată</span>
                    <span>{progress}%</span>
                  </div>

                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 dark:bg-blue-400 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </CardWrapper>
  );
}
