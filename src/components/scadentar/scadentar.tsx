// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table.tsx";
// import { useState } from "react";
// // import Validari from "@/components/scadentar/validari.tsx";
// // import { Reset } from "@/components/scadentar/Reset";

// // Descriere erori:
// // 1. nu exista erori in formular:
// //  errors = {}
// // 2. ai eroare in primul input care contine un numar negativ sau egal cu 0
// //  errors = {
// //      value:"Must be greater than 0"}
// // 3.primul input nu contine nimic
// //  errors = {
// //      value : "Required"}
// // 3.primul input nu contine nimic, al 2-lea input nu contine nimic
// //  errors = {
// //      value: "Required",
// //      dobanda: "Required"}

// export interface ErrorState {
//   value?: string | number;
//   time?: string | number;
//   interest?: string | number;
//   commision?: string | number;
//   anualInterest?: string | number;
//   penalty?: string | number;
// }

// interface ScadentarRaw {
//   index: number;
//   principal: number;
//   interest: number;
//   rata: number;
//   sold: number;
// }

// function Scadentar() {
//   const [errors, setErrors] = useState<ErrorState>({});
//   const [rows, setRows] = useState<ScadentarRaw[]>([]);
//   const [displayScadentar, setDisplayScadentar] = useState(false);

//   // <Reset />;

//   const handleReset = () => {
//     setRows([]);
//     setDisplayScadentar(false);
//     setErrors({});
//   };

//   // ---- Validari ----
//   const handleSubmit = (e: {
//     preventDefault: () => void;
//     currentTarget: HTMLFormElement | undefined;
//   }) => {
//     e.preventDefault();

//     const data = new FormData(e.currentTarget);

//     setErrors({}); //reseteaza erorile

//     const principal = Number(data.get("value"));
//     const time = Number(data.get("time"));
//     const anualInterest = Number(data.get("anulInterest"));
//     const commision = Number(data.get("commision"));

//     const monthlyInterestRate = anualInterest / 10 / 12;
//     const principalPerMonth = principal / time;

//     let sold = principal;
//     const newRows: ScadentarRaw[] = [];

//     for (let i = 0; i <= time; i++) {
//       const interest = sold + monthlyInterestRate;
//       const rata = principalPerMonth + interest;

//       sold -= principalPerMonth;

//       newRows.push({
//         index: i,
//         principal: principalPerMonth,
//         interest,
//         rata,
//         sold: Math.max(sold, 0),
//       });
//     }

//     setRows(newRows);
//     setDisplayScadentar(true);

//     // preia data raw pentru validari
//     const value = data.get("value");
//     const principalIsValid = validatePrincipal(
//       typeof value === "string" ? value : ""
//     );

//     const timeRaw = data.get("time");
//     const timeIsValid = validateTime(
//       typeof timeRaw === "string" ? timeRaw : ""
//     );

//     const interest = data.get("anualInterest");
//     const dobandaIsValid = validateDobanda(
//       typeof interest === "string" ? interest : ""
//     );

//     const comisioaneIsValid = validateComisioane(
//       typeof commision === "string" ? commision : ""
//     );

//     const penaltyRaw = data.get("penalty");
//     // // pass penalty *as a string*, or "" if null
//     const penaltyInput = typeof penaltyRaw === "string" ? penaltyRaw : "";
//     const penaltyIsValid = validatePenalty(penaltyInput);

//     // verifica toate validarile
//     if (
//       principalIsValid === false ||
//       timeIsValid === false ||
//       dobandaIsValid === false ||
//       comisioaneIsValid === false ||
//       penaltyIsValid === false
//     )
//       return;
//     setDisplayScadentar(true);
//   };

//   //   ---- Validari -----
//   // <Validari />;
//   const validatePrincipal = (value: string) => {
//     if (value === "" || value.trim() === "") {
//       setErrors((prev) => ({
//         ...prev,
//         value: "Required",
//       }));
//       return false;
//     }

//     if (Number(value) <= 0) {
//       setErrors((prev) => ({
//         ...prev,
//         value: "Must be greater than 0",
//       }));
//       return false;
//     }
//     return true;
//   };

//   const validateTime = (time: string) => {
//     if (time === "" || time.trim() === "") {
//       setErrors((prev) => ({
//         ...prev,
//         time: "Required",
//       }));
//       return false;
//     }
//     if (Number(time) <= 0) {
//       setErrors((prev) => ({
//         ...prev,
//         time: "Must be greater than 0",
//       }));
//       return false;
//     }
//     return true;
//   };

//   const validateDobanda = (interest: number | string) => {
//     if (interest === "") {
//       setErrors((prev) => ({
//         ...prev,
//         interest: "Required",
//       }));
//       return false;
//     }

//     if (Number(interest) <= 0) {
//       setErrors((prev) => ({
//         ...prev,
//         interest: "Must be greater than 0",
//       }));
//       return false;
//     }

//     return true;
//   };

//   const validateComisioane = (commision: number | string) => {
//     if (commision === "") {
//       setErrors((prev) => ({
//         ...prev,
//         commision: "Required",
//       }));
//       return false;
//     }

//     if (Number(commision) <= 0) {
//       setErrors((prev) => ({
//         ...prev,
//         commision: "Must be greater than 0",
//       }));
//       return false;
//     }
//     return true;
//   };

//   const validatePenalty = (penalty: number | string) => {
//     if (penalty === "") {
//       setErrors((prev) => ({
//         ...prev,
//         penalty: "Required",
//       }));
//       return false;
//     }

//     if (Number(penalty) <= 0) {
//       setErrors((prev) => ({
//         ...prev,
//         penalty: "Must be greater than 0",
//       }));
//       return false;
//     }
//     return true;
//   };

//   return (
//     <div>
//       {!displayScadentar ? (
//         <>
//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col gap-2 border-solid border border-slate-200 shadow-xl rounded-2xl p-8"
//           >
//             <div className=" text-slate700 font-medium">
//               <div className="flex gap-5">
//                 <label htmlFor="value" className=" gap-12">
//                   Valoare credit
//                 </label>
//                 {errors.value !== undefined ? (
//                   <p className="standard-input-error">{errors.value}</p>
//                 ) : null}
//                 <input
//                   className="border border-solid rounded-lg mb-2"
//                   type="number"
//                   name="value"
//                   id="number"
//                   placeholder="Valoare credit"
//                 ></input>
//               </div>
//               {/* <div className="flex gap-5">
//                 <label>Data</label>
//                 {errors.time !== undefined ? (
//                   <p className="standard-input-error">{errors.time}</p>
//                 ) : null}
//                 <input
//                   className="border border-solid rounded-lg mb-2"
//                   type="date"
//                   name="date"
//                   id="date"
//                   placeholder="Data"
//                 ></input>
//               </div> */}
//               <div className="flex gap-5">
//                 <label htmlFor="commision">Comision</label>
//                 {errors.commision && (
//                   <p className="standard-input-error">{errors.commision}</p>
//                 )}
//                 <input
//                   className="border border-solid rounded-lg mb-2"
//                   type="number"
//                   name="commision"
//                   id="commision"
//                   placeholder="Comision"
//                 ></input>
//               </div>
//               <div className="flex gap-5">
//                 <label className="">Durata credit</label>
//                 {errors.time !== undefined ? (
//                   <p className="standard-input-error">{errors.time}</p>
//                 ) : null}
//                 <input
//                   className="border border-solid rounded-lg mb-2"
//                   type="number"
//                   name="time"
//                   id="number"
//                   placeholder="luni"
//                 ></input>
//               </div>
//               <div className="flex gap-5">
//                 <label>Dobanda</label>
//                 {errors.anualInterest !== undefined ? (
//                   <p className="standard-input-error">{errors.anualInterest}</p>
//                 ) : null}
//                 <input
//                   className="border border-solid rounded-lg mb-2"
//                   type="number"
//                   name="anualInterest"
//                   id="number"
//                   placeholder="%"
//                 ></input>
//               </div>
//             </div>
//             <button
//               className="flex items-center justify-center text-white font-bold text-lg shadow mt-2 w-[100px] h-[30px] px-5 pl-5 bg-blue-600 border border-solid rounded-lg hover:text-white"
//               type="submit"
//             >
//               Submit
//             </button>
//           </form>
//         </>
//       ) : (
//         <div className="flex flex-col hide">
//           <div className="flex">
//             <Table className="mt-10 mx-4">
//               <TableHeader>
//                 <TableRow className="w-auto">
//                   <TableHead className="text-right w-5 font-semibold text-blue-900">
//                     Nr crt.
//                   </TableHead>
//                   {/* <TableHead className="text-right w-1/8 font-semibold text-blue-900">
//                     Data
//                   </TableHead> */}
//                   <TableHead className="text-right w-1/8 font-semibold text-blue-900">
//                     Principal
//                   </TableHead>
//                   <TableHead className="text-right w-1/8 font-semibold text-blue-900">
//                     Dobanda
//                   </TableHead>
//                   <TableHead className="text-right w-1/8 font-semibold text-blue-900">
//                     Rata
//                   </TableHead>
//                   <TableHead className="text-right w1/8 font-semibold text-blue-900">
//                     Sold
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {rows.map((row) => (
//                   <TableRow key={row.index}>
//                     <TableCell className="text-right">{row.index}</TableCell>
//                     <TableCell className="text-right">
//                       {row.principal.toFixed(2)}
//                     </TableCell>
//                     <TableCell className="text-right">
//                       {row.interest.toFixed(2)}
//                     </TableCell>
//                     <TableCell className="text-right">
//                       {row.rata.toFixed(2)}
//                     </TableCell>
//                     <TableCell className="text-right">
//                       {row.sold.toFixed(2)}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//           <div>
//             <label className="hide">Penalitati</label>
//             {errors.penalty !== undefined ? (
//               <p className="standard-input-error">{errors.penalty}</p>
//             ) : null}
//             <input
//               className="border border-solid rounded-lg mb-2"
//               id="number"
//               type="number"
//               name="penalty"
//               placeholder="penalitati"
//             ></input>
//           </div>
//           <button
//             className="flex items-center justify-center text-white font-bold text-lg shadow mt-2 w-[100px] h-[30px] px-5 pl-5 bg-blue-600 border border-solid rounded-lg hover:text-whiteg"
//             onClick={handleReset}
//           >
//             Reset
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Scadentar;

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { ErrorState, ScadentarRaw } from "./types";
import { validatePositive } from "./validation";
import { calculateScadentar } from "./calculation";

function Scadentar() {
  const [errors, setErrors] = useState<ErrorState>({});
  const [rows, setRows] = useState<ScadentarRaw[]>([]);
  const [displayScadentar, setDisplayScadentar] = useState(false);

  const handleReset = () => {
    setErrors({});
    setRows([]);
    setDisplayScadentar(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const newErrors: ErrorState = {
      value: validatePositive(String(data.get("value"))),
      time: validatePositive(String(data.get("time"))),
      anualInterest: validatePositive(String(data.get("anualInterest"))),
      commision: validatePositive(String(data.get("commision"))),
    };

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors);
      return;
    }

    const rows = calculateScadentar(
      Number(data.get("value")),
      Number(data.get("time")),
      Number(data.get("anualInterest")),
      Number(data.get("penalty")),
      Number(data.get("daysLate"))
    );

    setRows(rows);
    setDisplayScadentar(true);
  };

  return (
    <div>
      {!displayScadentar ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 border-solid border border-slate-200 shadow-xl rounded-2xl p-8"
        >
          <div className="text-slate700 font-medium">
            <div>
              <label>Valoare credit</label>
              {errors.value && <p className="error">{errors.value}</p>}
              <input
                className="border border-solid rounded-lg mb-2"
                name="value"
                type="number"
              />
            </div>

            <div>
              <label>Comision</label>
              {errors.commision && <p className="error">{errors.commision}</p>}
              <input
                className="border border-solid rounded-lg mb-2"
                name="commision"
                type="number"
              />
            </div>

            <div>
              <label>Durata (luni)</label>
              {errors.time && <p className="error">{errors.time}</p>}
              <input
                className="border border-solid rounded-lg mb-2"
                name="time"
                type="number"
              />
            </div>

            <div>
              <label>Dobanda anuala (%)</label>
              {errors.anualInterest && (
                <p className="error">{errors.anualInterest}</p>
              )}
              <input
                className="border border-solid rounded-lg mb-2"
                name="anualInterest"
                type="number"
              />
            </div>
            <div>
              <label>Rata penalizare %</label>
              {errors.penalty && <p>{errors.penalty}</p>}
              <input
                className="border border-solid rounded-lg mb-2"
                name="penalty"
                type="penalty"
              ></input>
            </div>

            <div>
              <label>Zile întârziere</label>
              {errors.daysLate && <p>{errors.daysLate}</p>}
              <input
                className="border border-solid rounded-lg mb-2"
                name="daysLate"
                type="number"
              />
            </div>
          </div>
          <button
            className="flex items-center justify-center text-white font-bold text-lg shadow mt-2 w-[100px] h-[30px] px-5 pl-5 bg-blue-600 border border-solid rounded-lg hover:text-white"
            type="submit"
          >
            Submit
          </button>
        </form>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nr</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Dobanda</TableHead>
                <TableHead>Rata</TableHead>
                <TableHead>Sold</TableHead>
                <TableHead>Penalitati</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.index}>
                  <TableCell>{row.index}</TableCell>
                  <TableCell>{row.principal.toFixed(2)}</TableCell>
                  <TableCell>{row.interest.toFixed(2)}</TableCell>
                  <TableCell>{row.rata.toFixed(2)}</TableCell>
                  <TableCell>{row.sold.toFixed(2)}</TableCell>
                  <TableCell>{row.penalty.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <button
            className="flex items-center justify-center text-white font-bold text-lg shadow mt-2 w-[100px] h-[30px] px-5 pl-5 bg-blue-600 border border-solid rounded-lg hover:text-white"
            onClick={handleReset}
          >
            Reset
          </button>
        </>
      )}
    </div>
  );
}

export default Scadentar;
