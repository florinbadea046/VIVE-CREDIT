import { useEffect, useState } from 'react';
import type { ScoringFormData } from '../types/FormScorecard.types';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';
import { Check } from 'lucide-react';
import IncomeStep from '../components/scorecard-components/form-scorecard-client/IncomeStep';
import ExpensesStep from '../components/scorecard-components/form-scorecard-client/ExpensesStep';
import HousingStep from '../components/scorecard-components/form-scorecard-client/HousingStep';
import SummaryStep from '../components/scorecard-components/form-scorecard-client/SummaryStep';

export default function FormScorecardClient() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState<ScoringFormData>({
    income: { salaryNet: '', otherIncome: '' },
    expenses: { rent: '', utilities: '', existingRates: '' },
    housingStatus: '',
  });

  const updateData = (data: Partial<ScoringFormData>) =>
    setFormData((prev) => ({ ...prev, ...data }));

  // Auto-save
  useEffect(() => {
    localStorage.setItem('scoring-draft', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const saved = localStorage.getItem('scoring-draft');
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  const steps = ['Venituri', 'Cheltuieli', 'Locuință', 'Rezumat'];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 pt-16 pb-10 bg-gradient-to-b from-blue-50 to-white dark:from-[#0b162f] dark:to-[#0a1124]">
      <div className="absolute top-4 left-4 flex gap-2">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 bg-blue-600 text-white rounded"
        >
          ‹
        </button>
        <ThemeToggle />
      </div>

      {/* Steps header + progress */}
      <div className="w-full max-w-2xl mb-6">
        <div className="flex justify-between mb-4">
          {steps.map((label, i) => {
            const current = i + 1;
            const completed = current < step;
            return (
              <div key={label} className="flex flex-col items-center flex-1">
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-full border ${
                    completed ? 'bg-blue-600 text-white' : 'bg-blue-100'
                  }`}
                >
                  {completed ? <Check size={16} /> : current}
                </div>
                <span className="text-xs mt-1">{label}</span>
              </div>
            );
          })}
        </div>
        <div className="h-2 bg-blue-100 rounded">
          <div
            className="h-2 bg-blue-600 rounded transition-all"
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>

      <div className="w-full max-w-md">
        {step === 1 && (
          <IncomeStep
            data={formData}
            updateData={updateData}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <ExpensesStep
            data={formData}
            updateData={updateData}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <HousingStep
            data={formData}
            updateData={updateData}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}
        {step === 4 && (
          <SummaryStep data={formData} onBack={() => setStep(3)} />
        )}
      </div>
    </div>
  );
}
