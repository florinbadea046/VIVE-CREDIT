import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ExpensesStep({
  data,
  updateData,
  onNext,
  onBack,
}: any) {
  return (
    <Card
      className="w-full max-w-md mx-auto
          shadow-lg 
          border border-blue-100 dark:border-[#1f2e44]
          bg-white dark:bg-slate-800
          text-gray-900 dark:text-[#c7d5ff]"
    >
      <CardHeader>
        <CardTitle className="text-2xl text-center font-semibold text-blue-700 dark:text-blue-400">
          Cheltuieli lunare
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-2">
          <Label className="dark:text-slate-300">
            Chirie{' '}
            <span className="text-slate-600 text-[10px] ">(Opțional)</span>
          </Label>
          <Input
            type="number"
            placeholder="Ex: 1000 Ron"
            value={data.expenses.rent}
            onChange={(e) => {
              if (e.target.value === '') {
                updateData({
                  expenses: { ...data.expenses, rent: '' },
                });
                return;
              }
              if (
                e.target.value.startsWith('0') ||
                e.target.value.startsWith('-')
              ) {
                return;
              }
              updateData({
                expenses: { ...data.expenses, rent: +e.target.value },
              });
            }}
            className="bg-white dark:bg-slate-900
                  text-gray-900 dark:text-white
                  border [&::-webkit-inner-spin-button]:appearance-none
        [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
        <div className="mb-6 space-y-2">
          <Label className="dark:text-slate-300">Utilități</Label>
          <Input
            type="number"
            placeholder="Ex: 500 Ron"
            value={data.expenses.utilities}
            onChange={(e) => {
              if (e.target.value === '') {
                updateData({
                  expenses: { ...data.expenses, utilities: '' },
                });
                return;
              }
              if (
                e.target.value.startsWith('0') ||
                e.target.value.startsWith('-')
              ) {
                return;
              }
              updateData({
                expenses: { ...data.expenses, utilities: +e.target.value },
              });
            }}
            className="bg-white dark:bg-slate-900
                  text-gray-900 dark:text-white
                  border [&::-webkit-inner-spin-button]:appearance-none
        [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
        <div className="mb-6 space-y-2">
          <Label className="dark:text-slate-300">
            Rate Existente{' '}
            <span className="text-slate-600 text-[10px] ">(Opțional)</span>
          </Label>
          <Input
            type="number"
            placeholder="Ex: 1100 Ron"
            value={data.expenses.existingRates}
            onChange={(e) => {
              if (e.target.value === '') {
                updateData({
                  expenses: { ...data.expenses, existingRates: '' },
                });
                return;
              }
              if (
                e.target.value.startsWith('0') ||
                e.target.value.startsWith('-')
              ) {
                return;
              }
              updateData({
                expenses: { ...data.expenses, existingRates: +e.target.value },
              });
            }}
            className="bg-white dark:bg-slate-900
                  text-gray-900 dark:text-white
                  border [&::-webkit-inner-spin-button]:appearance-none
        [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={onBack}
            className="px-6 dark:border-[#243247] dark:bg-slate-900 dark:hover:bg-slate-900/80 dark:text-slate-300"
          >
            ⬅ Înapoi
          </Button>
          <Button
            onClick={onNext}
            disabled={!data.expenses.utilities}
            className="px-6 text-white bg-blue-600 hover:bg-blue-700"
          >
            Următorul
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
