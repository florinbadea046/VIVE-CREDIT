import "../../style/scorecard.css";
import { useEffect, useState } from "react";
import {
  variableOptions,
  type PropsModal,
  type Rule,
  type Variable,
} from "../../types/Scorecard.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export const ScorecardVariablesModal: React.FC<PropsModal> = ({
  onClose,
  onSave,
  initialVariable = null,
}) => {
  const [name, setName] = useState<(typeof variableOptions)[number] | "">("");
  const [type, setType] = useState<"numeric" | "enum" | "boolean" | "">("");
  const [weight, setWeight] = useState<number>(0);
  const [error, setError] = useState("");
  const [active, setActive] = useState(false);
  const [rules, setRules] = useState<Rule[]>([]);

  useEffect(() => {
    if (initialVariable) {
      setName(initialVariable.name);
      setType(initialVariable.type);
      setWeight(initialVariable.weight);
      setActive(initialVariable.active);
      setRules(initialVariable.rules);
    } else {
      setName("");
      setType("numeric");
      setWeight(0);
      setActive(true);
      setRules([]);
    }
  }, [initialVariable]);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setWeight(0);
      setError("");
      return;
    }

    const regex = /^([01])(\.\d{0,2})?$/;
    if (!regex.test(value)) {
      return;
    }

    const num = parseFloat(value);

    if (isNaN(num)) {
      setError("Valoarea nu este validă.");
      return;
    }

    if (num < 0) {
      setError("Valoarea nu poate fi negativă.");
      return;
    }

    if (num > 1) {
      setError("Valoarea trebuie să fie ≤ 1.00.");
      return;
    }

    setWeight(num);
    setError("");
  };

  const handleWeightBlur = () => {
    if (isNaN(weight)) return;

    const formatted = Number(weight.toFixed(2));
    setWeight(formatted);
  };

  const addRule = () => {
    setRules([...rules, { condition: "", score: 0 }]);
  };

  const updateRule = (
    index: number,
    field: keyof Rule,
    value: string | number
  ) => {
    const newRules = [...rules];
    if (field === "score") {
      newRules[index].score = Number(value);
    } else if (field === "condition") {
      newRules[index].condition = String(value);
    }
    setRules(newRules);
  };

  const handleSave = () => {
    if (!type) {
      alert("Trebuie să selectezi un tip!");
      return;
    }
    const newVariable: Variable = {
      id: initialVariable?.id || Date.now().toString(),
      name: name as (typeof variableOptions)[number],
      type,
      weight,
      active,
      rules,
    };
    onSave(newVariable);
  };

  const removeRule = (index: number) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  };

  const isBoolean = type === "boolean";
  const isEditing = !!initialVariable;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md  flex items-center justify-center z-50 p-6">
      <div className="bg-white mx-auto w-full max-w-md shadow-2xl rounded-xl p-6">
        <h1 className="text-lg lg:text-xl font-bold text-center">
          {isEditing ? "Editează variabilă" : "Adaugă variabilă"}
        </h1>

        {/* Variabila */}

        <div className="flex flex-col gap-6 mt-12">
          <div className="flex flex-col md:flex-row gap-2 ">
            <label className="text-md font-semibold w-full ">
              Nume variabilă
            </label>
            <Select
              value={name}
              onValueChange={(val) =>
                setName(val as (typeof variableOptions)[number])
              }
            >
              <SelectTrigger className="w-full border-blue-300 text-blue-950 shadow-md shadow-indigo-500/50 focus:outline-none focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Alege variabila" />
              </SelectTrigger>

              <SelectContent className="rounded-b-md">
                {variableOptions.map((opt, index) => (
                  <SelectItem
                    key={opt}
                    value={opt}
                    className={`hover:bg-blue-200 ${
                      index === variableOptions.length - 1 ? "rounded-b-md" : ""
                    }`}
                  >
                    {opt === "varsta"
                      ? "Vârstă"
                      : opt === "venit"
                      ? "Venit"
                      : opt === "sector"
                      ? "Sector"
                      : opt === "istorice"
                      ? "Istorice plăți"
                      : opt === "kyc"
                      ? "KYC Flags"
                      : opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Tip */}

          <div className="flex flex-col md:flex-row gap-2">
            <label className="text-md font-semibold w-full">Tip</label>
            <Select
              value={type}
              onValueChange={(val) =>
                setType(val as "numeric" | "enum" | "boolean")
              }
            >
              <SelectTrigger className="w-full border-blue-300 text-blue-950 shadow-md shadow-indigo-500/50  focus:outline-none focus:ring-0 focus:ring-offset-0 data-[state=open]:ring-0 data-[state=open]:outline-none">
                <SelectValue placeholder="Selectează tipul" />
              </SelectTrigger>
              <SelectContent className="rounded-b-md">
                <SelectItem value="numeric" className="hover:bg-blue-200">
                  Numeric
                </SelectItem>
                <SelectItem value="enum" className="hover:bg-blue-200">
                  Enum
                </SelectItem>
                <SelectItem value="boolean" className="hover:bg-blue-200">
                  Boolean
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Pondere */}

          <div className="flex flex-col md:flex-row gap-2">
            <label className="text-md font-semibold w-full">Pondere</label>
            <input
              type="number"
              placeholder="Pondere (0.00 - 1.00)"
              value={weight}
              onChange={handleWeightChange}
              onBlur={handleWeightBlur}
              className="w-full border border-blue-300 text-blue-950 px-4 py-1 rounded-md shadow-md shadow-indigo-500/50 no-spinner  focus:outline-none focus:ring-0 focus:ring-offset-0 data-[state=open]:ring-0 data-[state=open]:outline-none"
            />
          </div>
          {error && (
            <span className="text-red-500 text-[10px] text-end w-full">
              {error}
            </span>
          )}
        </div>

        {/* isActive */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-20 mt-6 ">
          <label className="text-md font-semibold w-58">Este activă?</label>

          <Checkbox
            checked={active}
            onCheckedChange={() => setActive(!active)}
            className=" rounded-md w-10 h-8 border-blue-400 md:ml-8 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 shadow-md shadow-indigo-500/50"
          />
        </div>

        {/* Rules */}

        <div className="flex flex-col md:flex-row gap-2 mt-6">
          <label className="text-md font-semibold w-full ">Reguli</label>

          {!(isBoolean && rules.length >= 2) && (
            <button
              onClick={addRule}
              className="bg-white border border-blue-300 px-4 py-1 w-full rounded-lg hover:bg-gray-50 shadow-md shadow-indigo-500/50"
            >
              Adaugă regulă
            </button>
          )}
        </div>

        {rules.length === 0 ? (
          ""
        ) : (
          <div className="space-y-2 mt-4">
            {rules.map((rule, i) => (
              <div key={i} className="flex gap-2 items-center">
                {isBoolean ? (
                  <select
                    value={rule.condition}
                    onChange={(e) => updateRule(i, "condition", e.target.value)}
                    className="flex-1 border rounded-lg p-2 bg-gray-50"
                  >
                    <option value="">Selectează Valoare</option>
                    <option value="true">Adevărat (True)</option>
                    <option value="false">Fals (False)</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    placeholder={
                      type === "numeric"
                        ? "Ex: >5000 sau [2000,5000]"
                        : "Ex: >5000 sau [2000,5000]"
                    }
                    value={rule.condition}
                    onChange={(e) => updateRule(i, "condition", e.target.value)}
                    className="flex-1 border rounded-lg p-2"
                  />
                )}
                <input
                  type="number"
                  placeholder="Scor"
                  value={rule.score}
                  onChange={(e) =>
                    updateRule(i, "score", parseInt(e.target.value) || 0)
                  }
                  className="w-24 border rounded-lg p-2"
                />

                <button
                  onClick={() => removeRule(i)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Șterge
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300"
          >
            Anulează
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white"
          >
            Salvează
          </button>
        </div>
      </div>
    </div>
  );
};
