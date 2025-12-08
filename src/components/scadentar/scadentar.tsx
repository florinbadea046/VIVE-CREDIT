import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { useState } from "react";
import type { FormEvent } from "react";

// Descriere erori:
// 1. nu exista erori in formular:
//  errors = {}
// 2. ai eroare in primul input care contine un numar negativ sau egal cu 0
//  errors = {
//      value:"Must be greater than 0"}
// 3.primul input nu contine nimic
//  errors = {
//      value : "Required"}
// 3.primul input nu contine nimic, al 2-lea input nu contine nimic
//  errors = {
//      value: "Required",
//      dobanda: "Required"}

interface ErrorState {
  value?: string | number;
  time?: string | number;
  interest?: string | number;
  commision?: string | number;
  anualInterest?: string | number;
  penalty?: string | number;
}

interface TotalResult {
  rata: number;
  total: number;
  totalWithPenalty: number;
}

const initialTotalResult = {
  rata: 0,
  total: 0,
  totalWithPenalty: 0,
};

function Scadentar() {
  const [selectedTotal, setSelectedTotal] = useState(0);
  const [errors, setErrors] = useState("" as unknown as ErrorState);
  const [totalResult, setTotalResult] =
    useState<TotalResult>(initialTotalResult);
  const [displayScadentar, setDisplayScadentar] = useState(false);

  const handleTotal = (newTotal: number): void => {
    setTotalResult({
      ...totalResult,
      total: newTotal,
    });
  };

  const handleRaport = () => {
    setSelectedTotal(selectedTotal);
  };

  const handleReset = () => {
    setTotalResult(initialTotalResult);
    setErrors({});
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);

    setErrors({}); //reseteaza erorile

    setDisplayScadentar(true);

    const value = data.get("value");
    const principalIsValid = validatePrincipal(
      typeof value === "string" ? value : ""
    );

    const interest = data.get("anualInterest");
    const dobandaIsValid = validateDobanda(
      typeof interest === "string" ? interest : ""
    );

    const commision = data.get("commision");
    const comisioaneIsValid = validateComisioane(
      typeof commision === "string" ? commision : ""
    );

    const penaltyRaw = data.get("penalty");
    // pass penalty *as a string*, or "" if null
    const penaltyInput = typeof penaltyRaw === "string" ? penaltyRaw : "";
    const penaltyIsValid = validatePenalty(penaltyInput);

    // const penaltyRaw = data.get("penalty") ?? "";
    // const penaltyIsValid = validatePenalty(penaltyRaw);

    // if (!penaltyIsValid) return;
    // const penalty = Number(penaltyRaw);

    if (
      principalIsValid === false ||
      dobandaIsValid === false ||
      comisioaneIsValid === false ||
      penaltyIsValid === false
    )
      return;

    //calculeaza rata si total
    const principal = Number(data.get("value"));
    const time = Number(data.get("time"));
    const comision = Number(data.get("commision"));
    const interestRate =
      (Number(data.get("anualInterest")) / 100 / 12) * principal;
    const penalty = Number(data.get("penalty"));
    const rata = principal + interestRate;
    const total = rata * time + comision;
    const totalWithPenalty = total * penalty;

    setTotalResult({ rata, total, totalWithPenalty });

    console.log("Rata lunara: ", rata);
    console.log("Total de plata: ", total);
  };

  //   ---- Validari -----
  const validatePrincipal = (value: number | string) => {
    if (value === " ") {
      setErrors((prev) => ({
        ...prev,
        value: "Requierd",
      }));
      return false;
    }

    if (Number(value) <= 0) {
      setErrors((prev) => ({
        ...prev,
        value: "Must be greater than 0",
      }));
      return false;
    }

    setErrors((prev) => ({
      ...prev,
      value: undefined,
    }));

    // return true;
  };

  const validateDobanda = (interest: number | string) => {
    if (interest === "") {
      setErrors((prev) => ({
        ...prev,
        interest: "Requierd",
      }));
      return false;
    }

    if (Number(interest) <= 0) {
      setErrors((prev) => ({
        ...prev,
        interest: "Must be greater than 0",
      }));
      return false;
    }

    setErrors((prev) => ({
      ...prev,
      interest: undefined,
    }));

    // return true;
  };

  const validateComisioane = (commision: number | string) => {
    if (commision === "") {
      setErrors((prev) => ({
        ...prev,
        commision: "Requierd",
      }));
      return false;
    }

    if (Number(commision) <= 0) {
      setErrors((prev) => ({
        ...prev,
        commision: "Must be greater than 0",
      }));
      return false;
    }

    setErrors((prev) => ({
      ...prev,
      commision: undefined,
    }));

    // return true;
  };

  const validatePenalty = (penalty: number | string) => {
    if (penalty === "") {
      setErrors((prev) => ({
        ...prev,
        penalty: "Requierd",
      }));
      return false;
    }

    if (Number(penalty) <= 0) {
      setErrors((prev) => ({
        ...prev,
        penalty: "Must be greater then 0",
      }));
      return false;
    }

    setErrors((prev) => ({
      ...prev,
      penalty: undefined,
    }));

    // return true;
  };

  return (
    <div>
      {displayScadentar === false ? (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <div>
              <div>
                <label htmlFor="value">Valoare credit</label>
                {errors.value !== undefined ? (
                  <p className="standard-input-error">{errors.value}</p>
                ) : null}
                <input
                  className="border border-solid rounded-lg mb-2"
                  type="number"
                  name="value"
                  id="number"
                  placeholder="Valoare credit"
                ></input>
              </div>
              <div>
                <label htmlFor="commision">Comision</label>
                {errors.value !== undefined ? (
                  <p className="standard-input-error">{errors.value}</p>
                ) : null}
                <input
                  className="border border-solid rounded-lg mb-2"
                  type="number"
                  name="commision"
                  id="commision"
                  placeholder="Comision"
                ></input>
              </div>
              <div>
                <label className="">Durata credit</label>
                {errors.time !== undefined ? (
                  <p className="standard-input-error">{errors.time}</p>
                ) : null}
                <br />
                <input
                  className="border border-solid rounded-lg mb-2"
                  type="number"
                  name="time"
                  id="number"
                  placeholder="luni"
                ></input>
              </div>
              <br />
              <div>
                <label>Dobanda</label>
                {errors.anualInterest !== undefined ? (
                  <p className="standard-input-error">{errors.anualInterest}</p>
                ) : null}
                <br />
                <input
                  className="border border-solid rounded-lg mb-2"
                  type="number"
                  name="anualInterest"
                  id="number"
                  placeholder="%"
                ></input>
              </div>
              <div>
                <label>Penalitati</label>
                {errors.penalty !== undefined ? (
                  <p className="standard-input-error">{errors.penalty}</p>
                ) : null}
                <input
                  className="border border-solid rounded-lg mb-2"
                  id="number"
                  type="number"
                  name="penalty"
                  placeholder="penalitati"
                ></input>
              </div>
            </div>
          </form>
          <button
            className="flex mt-2 px-2 bg-blue-300 hover:text-white border border-solid rounded-lg"
            onClick={() => handleTotal(totalResult.total)}
          >
            Total
          </button>
          <input
            className="border border-solid rounded-lg"
            type="number"
            name="total"
            id="number"
            placeholder="Total"
            // onChange={handleTotal}
            // value={totalResult.total}
          ></input>
          <button
            className="flex mt-2 px-2 bg-blue-300 hover:text-white border border-solid rounded-lg"
            onClick={() => handleRaport()}
            // onChange={handleRaport}
            // value={totalResult.total}
          >
            Afisare scadentar
          </button>
        </>
      ) : (
        <div className="flex flex-col hide">
          <div>
            <Table className="mt-10 mx-4 border border-solid rounded-xl">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right w-[1px]">Nr crt</TableHead>
                  <TableHead className="text-right w-[20px]">Data</TableHead>
                  <TableHead className="text-right w-[20px]">
                    Principal
                  </TableHead>
                  <TableHead className="text-right w-[20px]">Dobanda</TableHead>
                  <TableHead className="text-right w-[20px] ">Rata</TableHead>
                  <TableHead className="text-right w-[20px]">
                    Comisioane
                  </TableHead>
                  <TableHead className="text-right w-[20px]">Total</TableHead>
                  <TableHead className="text-right w-[20px]">
                    Sold Credit
                  </TableHead>
                  <TableHead className="text-right w-[20px]">
                    Penalitati
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-right">001</TableCell>
                  <TableCell className="text-right">zz-ll-aaaa</TableCell>
                  <TableCell className="text-right">suma</TableCell>
                  <TableCell className="text-right">9.5%</TableCell>
                  <TableCell className="text-right">p+d</TableCell>
                  <TableCell className="text-right">comisioane</TableCell>
                  <TableCell className="text-right">p+d+r+c</TableCell>
                  <TableCell className="text-right">sold</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <button
            className="flex mt-2 px-2 bg-blue-300 hover:text-white border border-solid rounded-lg"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}

export default Scadentar;
