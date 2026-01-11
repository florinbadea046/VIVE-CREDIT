import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function IncomeStep({ data, updateData, onNext }: any) {
  return (
    <Card className="dark:bg-slate-800">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-semibold text-blue-700 dark:text-blue-400">
          Venituri lunare
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-2">
          <Label className="dark:text-slate-300">Salariu Net (Ron)</Label>
          <Input
            type="number"
            placeholder="Ex: 5500"
            value={data.income.salaryNet}
            onChange={(e) => {
              if (e.target.value === '') {
                updateData({
                  income: { ...data.income, salaryNet: '' },
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
                income: { ...data.income, salaryNet: +e.target.value },
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
            Alte venituri (Ron){' '}
            <span className="text-slate-600 text-[10px] ">(Opțional)</span>
          </Label>
          <Input
            type="number"
            placeholder="Ex: 2000"
            value={data.income.otherIncome}
            onChange={(e) => {
              if (e.target.value === '') {
                updateData({
                  income: { ...data.income, otherIncome: '' },
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
                income: { ...data.income, otherIncome: +e.target.value },
              });
            }}
            className="bg-white dark:bg-slate-900
                  text-gray-900 dark:text-white
                  border [&::-webkit-inner-spin-button]:appearance-none
        [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
        <div className="flex justify-end">
          <Button
            onClick={onNext}
            disabled={!data.income.salaryNet}
            className="px-6 text-white bg-blue-600 hover:bg-blue-700"
          >
            Următorul
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
