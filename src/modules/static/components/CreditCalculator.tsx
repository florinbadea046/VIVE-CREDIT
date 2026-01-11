import { useState, useEffect } from "react";
import { Calculator, CircleCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

const CreditCalculator = () => {
  const { t } = useTranslation("landing");
  const [amount, setAmount] = useState(5000);
  const [months, setMonths] = useState(12);

  const annualInterest = 24;

  const [monthlyRate, setMonthlyRate] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [dae, setDae] = useState("0");

  useEffect(() => {
    const monthlyInterest = annualInterest / 12 / 100;

    const P = amount;
    const n = months;
    const i = monthlyInterest;

    const rate = (P * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);

    setMonthlyRate(rate);
    setTotalCost(rate * n);

    const approx = ((rate * n - amount) / amount) * 100;
    setDae(approx.toFixed(2));
  }, [amount, months]);

  return (
    <section className="mt-20 bg-white dark:bg-slate-900 px-6 py-12 rounded-2xl shadow-md border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-8">
        <Calculator className="w-7 h-7 text-blue-600 dark:text-blue-400" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {t("calculator.title")}
        </h2>
      </div>

      <div className="mb-10">
        <p className="font-medium text-slate-700 dark:text-slate-300 mb-2">
          {t("calculator.amountLabel")}:
          <span className="font-bold text-blue-600 dark:text-blue-400 ml-1">
            {amount.toLocaleString("ro-RO")} {t("calculator.currency")}
          </span>
        </p>

        <input
          type="range"
          min="500"
          max="20000"
          step="100"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      <div className="mb-10">
        <p className="font-medium text-slate-700 dark:text-slate-300 mb-2">
          {t("calculator.periodLabel")}:
          <span className="font-bold text-blue-600 dark:text-blue-400 ml-1">
            {months} {t("calculator.monthsUnit")}
          </span>
        </p>

        <input
          type="range"
          min="3"
          max="60"
          step="1"
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="p-5 rounded-xl bg-blue-50 dark:bg-slate-800 border dark:border-slate-700 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("calculator.results.monthlyRate")}
          </p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {monthlyRate.toFixed(2)} {t("calculator.currency")}
          </p>
        </div>

        <div className="p-5 rounded-xl bg-blue-50 dark:bg-slate-800 border dark:border-slate-700 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("calculator.results.totalCost")}
          </p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {totalCost.toFixed(2)} {t("calculator.currency")}
          </p>
        </div>

        <div className="p-5 rounded-xl bg-blue-50 dark:bg-slate-800 border dark:border-slate-700 shadow-sm">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {t("calculator.results.dae")}
          </p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {dae}%
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <CircleCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        {t("calculator.disclaimer")}
      </div>
    </section>
  );
};

export default CreditCalculator;
