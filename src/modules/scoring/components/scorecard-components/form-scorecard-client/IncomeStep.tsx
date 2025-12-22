import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function IncomeStep({ data, updateData, onNext }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-center font-semibold text-blue-700 dark:text-blue-400">
          Venituri lunare
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-2">
          <Label className="dark:text-[#c7d5ff]">Salariu Net (Ron)</Label>
          <Input
            type="number"
            placeholder="Ex: 5500"
            value={data.income.salaryNet}
            onChange={(e) =>
              updateData({
                income: { ...data.income, salaryNet: +e.target.value },
              })
            }
            className="bg-white dark:bg-[#0c1324]
                  text-gray-900 dark:text-[#c7d5ff]
                  border"
          />
        </div>
        <div className="mb-6 space-y-2">
          <Label className="dark:text-[#c7d5ff]">Alte venituri (Ron)</Label>
          <Input
            type="number"
            placeholder="Ex: 2000"
            value={data.income.otherIncome}
            onChange={(e) =>
              updateData({
                income: { ...data.income, otherIncome: +e.target.value },
              })
            }
            className="bg-white dark:bg-[#0c1324]
                  text-gray-900 dark:text-[#c7d5ff]
                  border"
          />
        </div>
        <div className="flex justify-end">
          <Button
            onClick={onNext}
            className="px-6 text-white bg-blue-600 hover:bg-blue-700"
          >
            Următorul
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
