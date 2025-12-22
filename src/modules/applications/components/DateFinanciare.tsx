import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type StepProps } from "../types";

function DateFinanciare({ register, errors }: StepProps) {
  return (
    <>
      <div>
        <Label htmlFor='venitLunar' className='dark:text-[#c7d5ff]'>
          Venit lunar <span className='text-red-500'>*</span>
        </Label>
        <Input
          type='number'
          {...register("venitLunar", {
            valueAsNumber: true,
          })}
          placeholder='2500'
          id='venitLunar'
        />
        <p className='mt-1 text-sm text-red-500'>
          {errors.venitLunar?.message}
        </p>
      </div>
      <div>
        <Label htmlFor='angajator' className='dark:text-[#c7d5ff]'>
          Angajator <span className='text-red-500'>*</span>
        </Label>
        <Input
          type='text'
          {...register("angajator")}
          placeholder='S.C. ANGAJATOR S.A.'
          id='angajator'
        />
        <p className='mt-1 text-sm text-red-500'>{errors.angajator?.message}</p>
      </div>
      <div>
        <Label htmlFor='ocupatie' className='dark:text-[#c7d5ff]'>
          Ocupatie <span className='text-red-500'>*</span>
        </Label>
        <Input
          type='text'
          {...register("ocupatie")}
          placeholder='Inginer'
          id='ocupatie'
        />
        <p className='mt-1 text-sm text-red-500'>{errors.ocupatie?.message}</p>
      </div>
      <div>
        <Label htmlFor='vechimeInMunca' className='dark:text-[#c7d5ff]'>
          VechimeInMunca <span className='text-red-500'>*</span>
        </Label>
        <Input
          type='number'
          min={1}
          {...register("vechimeInMunca", {
            valueAsNumber: true,
          })}
          placeholder='10'
          id='vechimeInMunca'
        />
        <p className='mt-1 text-sm text-red-500'>
          {errors.vechimeInMunca?.message}
        </p>
      </div>
    </>
  );
}

export default DateFinanciare;
