import { Button } from "@/components/ui/button";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  ApplicationFormSchema,
  type FieldName,
  type Inputs,
  type Pas,
} from "../types";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Consimtamant from "./Consimtamant";
import DateFinanciare from "./DateFinanciare";
import DatePersonale from "./DatePersonale";
import DetaliiCredit from "./DetaliiCredit";
import Documente from "./Documente";
import Rezumat from "./Rezumat";

const pasi: Pas[] = [
  {
    id: "Pasul 1",
    titlu: "Date personale",
    campuri: ["nume", "prenume", "cnp", "adresa", "adresaEmail", "telefon"],
  },
  {
    id: "Pasul 2",
    titlu: "Date financiare",
    campuri: ["venitLunar", "angajator", "ocupatie", "vechimeInMunca"],
  },
  {
    id: "Pasul 3",
    titlu: "Detalii credit",
    campuri: ["tipProdus", "sumaCeruta", "durata"],
  },
  {
    id: "Pasul 4",
    titlu: "Documente",
    campuri: ["buletin", "fluturasSalariu"],
  },
  {
    id: "Pasul 5",
    titlu: "Consimțământ",
    campuri: ["benerificarReal", "termeniSiConditii", "oferte"],
  },
  {
    id: "Pasul 6",
    titlu: "Rezumat",
  },
];

function ApplicationForm() {
  // const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [rezumatData, setRezumatData] = useState<Inputs | null>(null);
  const navigate = useNavigate();

  const form = useForm<Inputs>({
    defaultValues: {
      nume: "",
      prenume: "",
      cnp: "",
      adresa: {
        judet: "",
        localitate: "",
        adresa1: "",
        adresa2: "",
        codPostal: "",
      },
      adresaEmail: "",
      telefon: "",
      venitLunar: 0,
      angajator: "",
      vechimeInMunca: 1,
      ocupatie: "",
      tipProdus: "",
      sumaCeruta: 3000,
      durata: 6,
      buletin: undefined,
      fluturasSalariu: undefined,
      benerificarReal: false,
      termeniSiConditii: false,
      oferte: false,
    },

    resolver: zodResolver(ApplicationFormSchema),
  });

  const {
    register,
    handleSubmit,
    control,
    formState,
    trigger,
    watch,
    getValues,
  } = form;
  const { errors } = formState;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data, "Form submitted");
    const applicationId = "VC-" + Date.now();
    navigate("/onboarding/success", {
      state: {
        applicationId,
        fullName: rezumatData?.nume,
      },
    });
  };

  const next = async () => {
    const fields = pasi[currentStep - 1].campuri;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    console.log(output);
    if (!output) return;

    if (currentStep - 1 < pasi.length - 1) {
      // setPreviousStep(currentStep);
      if (currentStep - 1 < pasi.length - 2) {
        setRezumatData(getValues());
      }
      setCurrentStep((prev) => prev + 1);
    } else {
      await handleSubmit(onSubmit)();
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      // setPreviousStep(currentStep);
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className='w-full max-w-2xl mx-auto'>
      <div className='w-full max-w-2xl mb-6'>
        <div className='hidden md:flex justify-between items-center mb-5'>
          {pasi.map((pas, index) => {
            const current = index + 1;
            const isActive = current === currentStep;
            const isCompleted = current < currentStep;

            return (
              <div key={index} className='flex flex-col items-center flex-1'>
                <div
                  className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                  ${
                    isCompleted
                      ? "bg-blue-600 border-blue-600 text-white dark:bg-blue-700 dark:border-blue-700"
                      : isActive
                      ? "bg-blue-300 border-blue-400 text-blue-900 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200"
                      : "bg-blue-100 border-blue-300 text-blue-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                  }
                `}
                >
                  {isCompleted ? <Check size={18} /> : current}
                </div>

                <span className='text-xs mt-2 text-blue-700 dark:text-blue-300 text-center'>
                  {pas.titlu}
                </span>
              </div>
            );
          })}
        </div>

        <div className='flex md:hidden justify-between items-start mb-4 w-full px-1 gap-1'>
          {pasi.map((pas, index) => {
            const current = index + 1;
            const isActive = current === currentStep;
            const isCompleted = current < currentStep;

            return (
              <div
                key={index}
                className='flex flex-col items-center'
                style={{ width: "20%" }}
              >
                <div
                  className={`
                  flex items-center justify-center w-7 h-7 rounded-full border-[2px] text-xs transition
                  ${
                    isCompleted
                      ? "bg-blue-600 border-blue-600 text-white dark:bg-blue-700 dark:border-blue-700"
                      : isActive
                      ? "bg-blue-200 border-blue-400 text-blue-900 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200"
                      : "bg-blue-100 border-blue-300 text-blue-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                  }
                `}
                >
                  {isCompleted ? <Check size={14} /> : current}
                </div>

                <span className='text-[10px] mt-1 text-blue-700 dark:text-blue-300 leading-tight text-center'>
                  {pas.titlu}
                </span>
              </div>
            );
          })}
        </div>

        <div className='relative w-full h-3 bg-blue-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner'>
          <div
            className='absolute top-0 left-0 h-full bg-blue-600 dark:bg-blue-700 rounded-full transition-all duration-500'
            style={{
              width: `${((currentStep - 1) / (pasi.length - 1)) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* formular */}
      <Card
        className='
          w-full max-w-md mx-auto
          shadow-lg 
          border border-blue-100 dark:border-[#1f2e44]
          bg-white dark:bg-[#162233]
          text-gray-900 dark:text-[#c7d5ff]
        '
      >
        <CardHeader>
          <CardTitle className='text-2xl font-semibold text-blue-700 dark:text-blue-400'>
            {currentStep !== 6 ? (
              <>
                Pasul {currentStep} — {pasi[currentStep - 1].titlu}
              </>
            ) : (
              ""
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete='off'>
            {currentStep === 1 && (
              <DatePersonale register={register} errors={errors} />
            )}
            {currentStep === 2 && (
              <DateFinanciare register={register} errors={errors} />
            )}
            {currentStep === 3 && (
              <DetaliiCredit
                register={register}
                errors={errors}
                watch={watch}
                control={control}
              />
            )}
            {currentStep === 4 && (
              <Documente
                register={register}
                errors={errors}
                watch={watch}
                control={control}
              />
            )}
            {currentStep === 5 && (
              <Consimtamant
                register={register}
                errors={errors}
                control={control}
                watch={watch}
              />
            )}
            {currentStep === 6 && (
              <Rezumat data={rezumatData} setCurrentStep={setCurrentStep} />
            )}
          </form>
        </CardContent>

        {/* Dev tool */}
        <DevTool control={control} />

        {/* butoane */}
        <CardFooter>
          <div className='flex w-full justify-between'>
            {currentStep !== 6 && (
              <>
                <Button
                  variant='secondary'
                  disabled={currentStep === 1}
                  onClick={prev}
                >
                  Pasul anterior
                </Button>
                <Button
                  variant='default'
                  onClick={next}
                  className='
                  px-6 text-white
                  bg-blue-600 hover:bg-blue-700
                  dark:bg-blue-800 dark:hover:bg-blue-900
                '
                >
                  Pasul urmator
                </Button>
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ApplicationForm;
