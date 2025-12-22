import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { type StepPropsWithWatch } from "../types";

function DetaliiCredit({
  register,
  errors,
  watch,
  control,
}: StepPropsWithWatch) {
  const sumaCeruta = watch("sumaCeruta");
  return (
    <>
      <div>
        <Label htmlFor='tipProdus' className='dark:text-[#c7d5ff]'>
          Tip Credit <span className='text-red-500'>*</span>
        </Label>
        <Controller
          name='tipProdus'
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger id='tipProdus'>
                <SelectValue placeholder='Selecteaza produs' />
              </SelectTrigger>
              <SelectContent id='tipProdus'>
                <SelectItem value='nevoi-personale'>Nevoi Personale</SelectItem>
                <SelectItem value='auto'>Auto</SelectItem>
                <SelectItem value='ipotecar'>Ipotecar</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        <p className='mt-1 text-sm text-red-500'>{errors.tipProdus?.message}</p>
      </div>
      <div>
        <Label htmlFor='sumaCeruta' className='dark:text-[#c7d5ff]'>
          De cati bani ai nevoie? <span className='text-red-500'>*</span>
        </Label>
        <div className='flex items-center gap-4'>
          <span>{sumaCeruta}</span>
          <Input
            type='range'
            {...register("sumaCeruta", { valueAsNumber: true })}
            min={3000}
            max={25000}
            step={100}
            className='w-full'
          />
        </div>
        <p className='mt-1 text-sm text-red-500'>
          {errors.sumaCeruta?.message}
        </p>
      </div>
      <div>
        <Label htmlFor='durata' className='dark:text-[#c7d5ff]'>
          Durata <span className='text-red-500'>*</span>
        </Label>
        <Input
          type='number'
          min={6}
          max={60}
          {...register("durata", { valueAsNumber: true })}
          placeholder='6'
          id='durata'
        />
        <p className='mt-1 text-sm text-red-500'>{errors.durata?.message}</p>
      </div>
    </>
  );
}

export default DetaliiCredit;
