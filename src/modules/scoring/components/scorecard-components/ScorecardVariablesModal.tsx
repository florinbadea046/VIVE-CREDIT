import '../../style/scorecard.css';
import { useEffect, useState } from 'react';
import {
  typesOptions,
  variableOptions,
  type PropsModal,
  type Rule,
  type Variable,
} from '../../types/Scorecard.types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

export const ScorecardVariablesModal: React.FC<PropsModal> = ({
  onClose,
  onSave,
  initialVariable = null,
}) => {
  const [name, setName] = useState('');
  const [typeModal, setTypeModal] = useState('');
  const [booleanValue, setBooleanValue] = useState<'true' | 'false' | ''>('');
  const [weight, setWeight] = useState<number>(0);
  const [error, setError] = useState({ name: '', typeModal: '', weight: '' });
  const [active, setActive] = useState(false);
  const [rules, setRules] = useState<Rule[]>([]);

  useEffect(() => {
    if (initialVariable) {
      setName(initialVariable.name);
      setTypeModal(initialVariable.type);
      setWeight(initialVariable.weight);
      setActive(initialVariable.active);
      setRules(initialVariable.rules);
      setBooleanValue(initialVariable?.booleanV ?? '');
    } else {
      setName('');
      setTypeModal('');
      setWeight(0);
      setActive(true);
      setRules([]);
    }
  }, [initialVariable]);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      setWeight(NaN);
      setError((prev) => ({ ...prev, weight: '' }));
      return;
    }

    if (!/^\d*\.?\d{0,2}$/.test(value)) {
      return;
    }
    const num = parseFloat(value);

    if (isNaN(num)) {
      setError((prev) => ({ ...prev, weight: 'Valoarea nu este validă.' }));
      return;
    }

    if (num < 0) {
      setError((prev) => ({
        ...prev,
        weight: 'Valoarea nu poate fi negativă.',
      }));
      return;
    }

    if (num > 1) {
      setError((prev) => ({
        ...prev,
        weight: 'Valoarea trebuie să fie ≤ 1.00.',
      }));
      return;
    }

    setWeight(num);
    setError((prev) => ({ ...prev, weight: '' }));
  };

  const handleWeightBlur = () => {
    if (isNaN(weight)) return;

    let formatted = Math.min(Math.max(weight, 0), 1);

    if (formatted < 1) {
      formatted = Number(formatted.toFixed(2));
    }
    setWeight(formatted);
  };

  const addRules = () => {
    setRules([...rules, { condition: '', score: 0 }]);
  };

  const updateRules = <K extends keyof Rule>(
    index: number,
    field: K,
    value: Rule[K]
  ) => {
    const newRule = [...rules];
    newRule[index] = {
      ...newRule[index],
      [field]: value,
    };
    setRules(newRule);
  };

  const removeRule = (index: number) => {
    const newRules = [...rules];
    newRules.splice(index, 1);
    setRules(newRules);
  };

  const handleSave = () => {
    if (!name) {
      setError((prev) => ({ ...prev, name: 'Alege o variabilă!' }));
      return;
    }

    if (!typeModal) {
      setError((prev) => ({ ...prev, typeModal: 'Alege un tip!' }));
      return;
    }

    const newVariable: Variable = {
      id: initialVariable?.id || Date.now().toString(),
      name: name as (typeof variableOptions)[number],
      type: typeModal as (typeof typesOptions)[number],
      weight,
      active,
      rules,
      booleanV:
        typeModal === 'boolean' && booleanValue !== ''
          ? booleanValue
          : undefined,
    };

    onSave(newVariable);
  };

  const isEditing = !!initialVariable;
  return (
    <div className="fixed inset-0 bg-black/30  backdrop-blur-md flex justify-center z-50 p-6 overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 mx-auto w-full max-w-md shadow-2xl rounded-xl p-6 my-auto">
        <h1 className="text-lg lg:text-xl font-bold text-center">
          {isEditing ? 'Editează variabilă' : 'Adaugă variabilă'}
        </h1>

        {/* Variabila */}

        <div className="flex flex-col gap-6 mt-12">
          <div className="flex flex-col md:flex-row gap-2 ">
            <label className="text-md font-semibold w-full ">
              Nume variabilă
            </label>
            <Select
              value={name}
              onValueChange={(val) => {
                setName(val as (typeof variableOptions)[number]);
                setError((prev) => ({ ...prev, name: '' }));
              }}
            >
              <SelectTrigger className="w-full border-blue-300 text-blue-950 dark:!text-white  focus:outline-none focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Alege variabila" />
              </SelectTrigger>

              <SelectContent className="rounded-b-md ">
                {variableOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt === 'venit'
                      ? 'Venit'
                      : opt === 'varsta'
                      ? 'Vârstă'
                      : opt === 'sector'
                      ? 'Sector'
                      : opt === 'istorice'
                      ? 'Istoric'
                      : opt === 'kyc'
                      ? 'KYC Flags'
                      : opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {error.name && (
            <span className="text-red-500 dark:text-red-400 text-[10px] text-end w-full">
              {error.name}
            </span>
          )}

          {/* Tip */}

          <div className="flex flex-col md:flex-row gap-2">
            <label className="text-md font-semibold w-full">Tip</label>
            <Select
              value={typeModal}
              onValueChange={(val) => {
                setTypeModal(val as (typeof typesOptions)[number]);
                setError((prev) => ({ ...prev, typeModal: '' }));
              }}
            >
              <SelectTrigger className="w-full border-blue-300 text-blue-950 dark:!text-white  focus:outline-none focus:ring-0 focus:ring-offset-0 data-[state=open]:ring-0 data-[state=open]:outline-none">
                <SelectValue placeholder="Selectează tipul" />
              </SelectTrigger>
              <SelectContent className="rounded-b-md">
                {typesOptions.map((opt) => (
                  <SelectItem value={opt} key={opt}>
                    {opt === 'numeric'
                      ? 'Numeric'
                      : opt === 'enum'
                      ? 'Enum'
                      : opt === 'boolean'
                      ? 'Boolean'
                      : opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {typeModal === 'boolean' ? (
            <div className="flex flex-col md:flex-row gap-2">
              <label className="w-full text-blue-700 dark:!text-white">
                Este adevărat sau fals?
              </label>
              <Select
                value={booleanValue}
                onValueChange={(val) =>
                  setBooleanValue(val as 'true' | 'false')
                }
              >
                <SelectTrigger className="w-full border-blue-300 text-blue-950 dark:!text-white focus:outline-none focus:ring-0 focus:ring-offset-0 data-[state=open]:ring-0 data-[state=open]:outline-none">
                  <SelectValue placeholder="Selectează o opțiune" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Adevărat</SelectItem>
                  <SelectItem value="false">Fals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : (
            ''
          )}

          {error.typeModal && (
            <span className="text-red-500 dark:text-red-400 text-[10px] text-end w-full">
              {error.typeModal}
            </span>
          )}

          {/* Pondere */}

          <div className="flex flex-col md:flex-row gap-2">
            <label className="text-md font-semibold w-full">Pondere</label>
            <input
              type="number"
              placeholder="Pondere (0.00 - 1.00)"
              value={weight}
              onChange={handleWeightChange}
              onBlur={handleWeightBlur}
              className="w-full border border-blue-300 text-blue-950 dark:text-white dark:bg-slate-800 px-4 py-1 rounded-md no-spinner  focus:outline-none focus:ring-0 focus:ring-offset-0 data-[state=open]:ring-0 data-[state=open]:outline-none"
            />
          </div>
          {error.weight && (
            <span className="text-red-500 dark:text-red-400 text-[10px] text-end w-full">
              {error.weight}
            </span>
          )}
        </div>

        {/* isActive */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-20 mt-6 ">
          <label className="text-md font-semibold w-58">Este activă?</label>

          <Checkbox
            checked={active}
            onCheckedChange={() => setActive(!active)}
            className=" rounded-md w-10 h-8 border-2 border-blue-400 data-[state=checked]:dark:bg-blue-400 md:ml-5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 "
          />
        </div>

        {/* Rules */}
        <div className="flex flex-col md:flex-row gap-2 mt-6 ">
          <label className="text-md font-semibold w-full">Reguli</label>
          <button
            onClick={addRules}
            className="bg-blue-50/30 border border-blue-300 dark:bg-slate-800 hover:dark:bg-slate-700/50 px-4 py-1 w-full rounded-lg hover:bg-gray-50 focus:outline-none "
          >
            Adaugă regulă
          </button>
        </div>
        <div>
          {rules.map((rule, i) => (
            <div key={i} className="flex justify-between items-center mt-6">
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Ex: >5000 sau [2000,5000]"
                  value={rule.condition}
                  onChange={(e) => updateRules(i, 'condition', e.target.value)}
                  className="flex-1 dark:bg-slate-800 dark:border-slate-300 border w-52 md:w-60 rounded-lg p-2 focus:outline-none focus:border-blue-300"
                />
                <input
                  type="number"
                  value={rule.score}
                  onChange={(e) =>
                    updateRules(i, 'score', parseInt(e.target.value))
                  }
                  className="w-16 border dark:bg-slate-800 dark:border-slate-300 rounded-lg p-2 no-spinner focus:outline-none focus:border-blue-300 self-end md:self-auto"
                />
              </div>
              <button
                onClick={() => removeRule(i)}
                className="px-2 py-2 bg-blue-100 dark:bg-red-600 dark:text-white hover:dark:bg-red-600/90 text-blue-500 rounded-md hover:bg-blue-200"
              >
                Șterge
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-2 mt-14 center md:justify-between ">
          <button
            onClick={onClose}
            className="bg-blue-50/30 dark:bg-slate-800 hover:dark:bg-slate-700/50 border border-blue-300 px-4 py-1 rounded-lg hover:bg-gray-50 focus:outline-none "
          >
            Anulează
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 px-4 py-1 disabled:bg-gray-400 text-white rounded-lg shadow-md hover:bg-blue-500/90"
          >
            Salvează
          </button>
        </div>
      </div>
    </div>
  );
};
