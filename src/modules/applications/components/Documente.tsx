import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type StepPropsWithWatch } from "../types";

function Documente({ register, errors }: StepPropsWithWatch) {
  // const buletin = watch("buletin");
  // const fluturas = watch("fluturasSalariu");
  // console.log(buletin[0]?.size);

  return (
    <>
      <div className='grid items-center gap-3'>
        <Label htmlFor='buletin' className='dark:text-[#c7d5ff]'>
          Încarcă buletinul (PDF sau imagine){" "}
          <span className='text-red-500'>*</span>
        </Label>
        <Input
          id='buletin'
          type='file'
          accept='application/pdf, image/png, image/jpeg'
          {...register("buletin")}
        />
        <p className='mt-1 text-sm text-red-500'>
          {errors.buletin?.message as string}
        </p>
      </div>
      <div className='grid items-center gap-3'>
        <Label htmlFor='fluturasSalariu' className='dark:text-[#c7d5ff]'>
          Fluturaș salariu <span className='text-red-500'>*</span>
        </Label>
        <Input
          id='fluturasSalariu'
          type='file'
          accept='application/pdf, image/png, image/jpeg'
          {...register("fluturasSalariu")}
        />
        <p className='mt-1 text-sm text-red-500'>
          {errors.fluturasSalariu?.message as string}
        </p>
      </div>
    </>
  );
}

export default Documente;
