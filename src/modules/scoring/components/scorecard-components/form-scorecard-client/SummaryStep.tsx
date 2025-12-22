import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function SummaryStep({ data, onBack }: any) {
  const totalIncome =
    (+data.income.salaryNet || 0) + (+data.income.otherIncome || 0);
  const totalExpenses =
    (+data.expenses.rent || 0) +
    (+data.expenses.utilities || 0) +
    (+data.expenses.existingRates || 0);

  return (
    <Card>
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
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={onBack}
            className="px-6 dark:border-[#243247] dark:text-[#c7d5ff]"
          >
            ⬅ Înapoi
          </Button>
          <Button className="px-6 text-white bg-blue-600 hover:bg-blue-700">
            Salvează
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
