import type { Dispatch, SetStateAction } from "react";
import type { Inputs } from "../types";
import SummaryField from "./SummaryField";

function Rezumat({
  data,
  setCurrentStep,
}: {
  data: Inputs | null;
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) {
  if (!data)
    return (
      <p className=''>
        Din pacate datele tale nu au fost prelucrate. Te rugam sa incerci din
        nou!
      </p>
    );
  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-semibold text-blue-700 dark:text-blue-400'>
        📝 Rezumat final
      </h2>
      <div className='text-left space-y-3 text-gray-800 dark:text-[#c7d5ff]'>
        <SummaryField label='Nume' value={data.nume} />
        <SummaryField label='Prenume' value={data.prenume} />
        <SummaryField label='CNP' value={data.cnp} />
        <SummaryField label='Telefon' value={data.telefon} />
        <SummaryField label='Adresa Email' value={data.adresaEmail} />
        <hr className='my-4 border-gray-300 dark:border-[#243247]' />
        <SummaryField
          label='Venit Lunar'
          value={`${data.venitLunar.toString()}RON`}
        />
        <SummaryField label='Angajator' value={data.angajator} />
        <SummaryField label='Ocupatie' value={data.ocupatie} />
        <SummaryField label='Tip produs' value={data.tipProdus} />
        <SummaryField
          label='Suma cerută'
          value={`${data.sumaCeruta.toString()}RON`}
        />
        <SummaryField label='Durata' value={`${data.durata.toString()} luni`} />
        <hr className='my-4 border-gray-300 dark:border-[#243247]' />
      </div>
      <h4 className='mt-4 text-lg font-semibold'>Documente</h4>
      <p>Buletin: {data.buletin[0].name}</p>
      <p>Fluturaș salariu: {data.fluturasSalariu[0].name}</p>
      <div className='flex flex-col sm:flex-row justify-between mt-6 gap-3'>
        <button
          className='
          bg-blue-600 hover:bg-blue-700 text-white
          dark:bg-blue-700 dark:hover:bg-blue-600
          px-6 py-2 rounded-md w-full flex items-center justify-center gap-2
        '
          onClick={() => setCurrentStep(4)}
        >
          <span>📁</span> Modifică documente
        </button>

        <button
          className='
          bg-green-600 hover:bg-green-700 text-white
          dark:bg-green-700 dark:hover:bg-green-600
          px-6 py-2 rounded-md w-full
        '
        >
          Finalizează aplicația
        </button>
      </div>
    </div>
  );
}

export default Rezumat;
