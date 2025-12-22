import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { z } from "zod";

export const ApplicationFormSchema = z.object({
  nume: z.string().min(1, "Acest camp este obligatoriu"),
  prenume: z.string().min(1, "Acest camp este obligatoriu"),
  cnp: z.string().length(13, "Acest camp trebuie sa aiba sa contina 13 cifre"),
  adresa: z.object({
    judet: z.string().min(1, "Acest camp este obligatoriu"),
    localitate: z.string().min(1, "Acest camp este obligatoriu"),
    adresa1: z.string().min(1, "Acest camp este obligatoriu"),
    adresa2: z.string().optional(),
    codPostal: z.string().optional(),
  }),
  adresaEmail: z
    .string()
    .min(1, "Acest camp este obligatoriu")
    .email("Adresa de email este invalida"),
  telefon: z.string().regex(/^07\d{8}$/, {
    message: "Numarul de telefon trebuie sa inceapa cu 07 si sa aiba 10 cifre",
  }),
  venitLunar: z.coerce
    .number({ invalid_type_error: "Introdu o valoare numerica" })
    .pipe(z.number().min(2500, "Venitul lunar trebuie sa fie cel putin 2500")),
  angajator: z.string().min(1, "Acest camp este obligatoriu"),
  ocupatie: z.string().min(1, "Acest camp este obligatoriu"),
  vechimeInMunca: z
    .number()
    .nonnegative("Vechimea in munca trebuie sa fie mai mare ca 0"),
  tipProdus: z.string().min(1, "Acest camp este obligatoriu"),
  sumaCeruta: z
    .number()
    .nonnegative("Suma ceruta trebuie sa fie pozitiva")
    .gte(3000, "Suma ceruta trebuie sa fie mai mare sau egala cu 3000"),
  durata: z
    .number()
    .min(6, "Durata trebuie sa fie de cel putin 6 luni")
    .max(60, "Durata maxima este de 60 luni"),
  buletin: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      "Încarcă un fișier"
    )
    .transform((files) => files[0])
    .refine(
      (file) =>
        ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
      "Fișierul trebuie să fie PDF sau imagine (jpg, png)"
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Documentul trebuie sa aiba maxim 5MB"
    ),
  fluturasSalariu: z
    .any()
    .refine(
      (files) => files instanceof FileList && files.length > 0,
      "Încarcă un fișier"
    )
    .transform((files) => files[0])
    .refine(
      (file) =>
        ["application/pdf", "image/jpeg", "image/png"].includes(file.type),
      "Fișierul trebuie să fie PDF sau imagine (jpg, png)"
    )
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Documentul trebuie sa aiba maxim 5MB"
    ),
  benerificarReal: z.boolean().refine((val) => val === true, {
    message: "Trebuie să confirmați că sunteți beneficiarul real",
  }),
  termeniSiConditii: z.boolean().refine((val) => val === true, {
    message: "Trebuie să acceptați termenii și condițiile",
  }),
  oferte: z.boolean().optional(),
});

export type Inputs = z.infer<typeof ApplicationFormSchema>;
export type FieldName = keyof Inputs;

export type Pas = {
  id: string;
  titlu: string;
  campuri?: string[];
};

export type StepProps = {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
};

export type StepPropsWithWatch = StepProps & {
  watch: UseFormWatch<Inputs>;
  control: Control<Inputs>;
};
