import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function HousingStep({ data, updateData, onNext, onBack }: any) {
  return (
    <Card className="dark:bg-slate-800">
      <CardHeader>
        <CardTitle className="text-2xl text-center font-semibold text-blue-700 dark:text-blue-400">
          Situație locuință
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center items-center mt-4">
          <ul className="flex flex-col gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={data.housingStatus === 'Proprietar'}
                onChange={() => updateData({ housingStatus: 'Proprietar' })}
                className="accent-blue-600 w-4 h-4"
              />{' '}
              Proprietar
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={data.housingStatus === 'Chiriaș'}
                onChange={() => updateData({ housingStatus: 'Chiriaș' })}
                className="accent-blue-600 w-4 h-4"
              />{' '}
              Chiriaș
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={data.housingStatus === 'Locuiește cu familia'}
                onChange={() =>
                  updateData({ housingStatus: 'Locuiește cu familia' })
                }
                className="accent-blue-600 w-4 h-4"
              />{' '}
              Locuiește cu familia
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={data.housingStatus === 'Fără locuință'}
                onChange={() => updateData({ housingStatus: 'Fără locuință' })}
                className="accent-blue-600 w-4 h-4"
              />{' '}
              Fără locuință
            </label>
          </ul>
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
            className="px-6 text-white bg-blue-600 hover:bg-blue-700"
          >
            Următorul
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
