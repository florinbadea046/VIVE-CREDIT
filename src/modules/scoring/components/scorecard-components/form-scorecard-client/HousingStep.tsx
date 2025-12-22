import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function HousingStep({ data, updateData, onNext, onBack }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Situație locuință</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-center gap-8 md:gap-16">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={data.housingStatus === 'owner'}
              onChange={() => updateData({ housingStatus: 'owner' })}
              className="accent-blue-600 w-4 h-4"
            />{' '}
            Proprietar
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={data.housingStatus === 'tenant'}
              onChange={() => updateData({ housingStatus: 'tenant' })}
              className="accent-blue-600 w-4 h-4"
            />{' '}
            Chiriaș
          </label>
        </div>
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={onBack}
            className="px-6 dark:border-[#243247] dark:text-[#c7d5ff]"
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
