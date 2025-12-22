import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { StepProps } from "../types";

function DatePersonale({ register, errors }: StepProps) {
  return (
    <>
      <div>
        <Label htmlFor='nume' className='dark:text-[#c7d5ff]'>
          Nume <span className='text-red-500'>*</span>
        </Label>
        <Input type='text' {...register("nume")} placeholder='Nume' id='nume' />
        <p className='mt-1 text-sm text-red-500'>{errors.nume?.message}</p>
      </div>
      <div>
        <Label htmlFor='prenume' className='dark:text-[#c7d5ff]'>
          Prenume <span className='text-red-500'>*</span>
        </Label>
        <Input
          type='text'
          {...register("prenume")}
          placeholder='Prenume'
          id='prenume'
        />
        <p className='mt-1 text-sm text-red-500'>{errors.prenume?.message}</p>
      </div>
      <div>
        <Label htmlFor='prenume' className='dark:text-[#c7d5ff]'>
          CNP <span className='text-red-500'>*</span>
        </Label>
        <Input
          type='text'
          {...register("cnp")}
          placeholder='1901012123456'
          id='cnp'
        />
        <p className='mt-1 text-sm text-red-500'>{errors.cnp?.message}</p>
      </div>
      {/* Adresa */}
      <div>
        <Label htmlFor='judet' className='dark:text-[#c7d5ff]'>
          Judet <span className='text-red-500'>*</span>
        </Label>
        <Input
          type='text'
          {...register("adresa.judet")}
          placeholder='Hunedoara'
          id='judet'
        />
        <p className='mt-1 text-sm text-red-500'>
          {errors.adresa?.judet?.message}
        </p>
      </div>
      <div>
        <Label htmlFor='localitate' className='dark:text-[#c7d5ff]'>
          Localitate <span className='text-red-500'>*</span>
        </Label>
        <Input
          type='text'
          {...register("adresa.localitate")}
          placeholder='Deva'
          id='localitate'
        />
        <p className='mt-1 text-sm text-red-500'>
          {errors.adresa?.localitate?.message}
        </p>
      </div>
      <div>
        <Label htmlFor='adresa1' className='dark:text-[#c7d5ff]'>
          Adresa 1 <span className='text-red-500'>*</span>
        </Label>
        <Input
          type='text'
          {...register("adresa.adresa1")}
          placeholder='Str. Lalelelor, nr. 2'
          id='adresa1'
        />
        <p className='mt-1 text-sm text-red-500'>
          {errors.adresa?.adresa1?.message}
        </p>
      </div>
      <div>
        <Label htmlFor='adresa2' className='dark:text-[#c7d5ff]'>
          Adresa 2
        </Label>
        <Input
          type='text'
          {...register("adresa.adresa2")}
          placeholder='Deva'
          id='adresa2'
        />
      </div>
      <div>
        <Label htmlFor='codPostal' className='dark:text-[#c7d5ff]'>
          Cod Postal
        </Label>
        <Input
          type='text'
          {...register("adresa.codPostal")}
          placeholder='Deva'
          id='codPostal'
        />
      </div>
      {/* End adresa */}
      <div>
        <Label htmlFor='adresaEmail' className='dark:text-[#c7d5ff]'>
          Adresa Email <span className='text-red-500'>*</span>
        </Label>
        <Input
          type='email'
          {...register("adresaEmail")}
          placeholder='example@info.com'
          id='adresaEmail'
        />
        <p className='mt-1 text-sm text-red-500'>
          {errors.adresaEmail?.message}
        </p>
      </div>
      <div>
        <Label htmlFor='telefon' className='dark:text-[#c7d5ff]'>
          Telefon <span className='text-red-500'>*</span>
        </Label>
        <Input
          type='text'
          {...register("telefon")}
          placeholder='0777888222'
          id='adresaEmail'
        />
        <p className='mt-1 text-sm text-red-500'>{errors.telefon?.message}</p>
      </div>
    </>
  );
}

export default DatePersonale;
