import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useState } from 'react';

export default function SummaryStep({ data, onBack }: any) {
  const [saveStatus, setSaveStatus] = useState<'saving' | 'saved' | ''>('');

  const totalIncome =
    (+data.income.salaryNet || 0) + (+data.income.otherIncome || 0);
  const totalExpenses =
    (+data.expenses.rent || 0) +
    (+data.expenses.utilities || 0) +
    (+data.expenses.existingRates || 0);

  const handleSave = () => {
    setSaveStatus('saving');

    setTimeout(() => {
      // Salvare finală - RĂMÂNE în localStorage
      localStorage.setItem('scoring-final', JSON.stringify(data));

      // Șterge doar draft-ul
      localStorage.removeItem('scoring-draft');

      setSaveStatus('saved');

      // Reîncarcă pagina după 2 secunde
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }, 500);
  };

  return (
    <Card className="bg-slate-800">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-semibold text-blue-700 dark:text-blue-400">
          Rezumat
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          Venit total: <b>{totalIncome} RON</b>
        </p>
        <p>
          Cheltuieli totale: <b>{totalExpenses} RON</b>
        </p>
        <p>
          Status locuință: <b>{data.housingStatus}</b>
        </p>

        {/* Indicator de salvare automată */}
        <div className="flex items-center justify-center min-h-[24px]">
          {saveStatus === 'saving' && (
            <p className="text-sm text-slate-400 animate-pulse">
              💾 Se salvează...
            </p>
          )}
          {saveStatus === 'saved' && (
            <p className="text-sm text-green-500 animate-in fade-in duration-300">
              ✓ Datele au fost salvate cu succes!
            </p>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={onBack}
            className="px-6 dark:border-[#243247] dark:bg-slate-900 dark:hover:bg-slate-900/80 dark:text-slate-300"
            disabled={saveStatus === 'saving'}
          >
            ⬅ Înapoi
          </Button>
          <Button
            onClick={handleSave}
            className="px-6 text-white bg-blue-600 hover:bg-blue-700"
            disabled={saveStatus === 'saving'}
          >
            Salvează
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
