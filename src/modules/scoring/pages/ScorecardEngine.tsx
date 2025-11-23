import { useState } from 'react';
import '../style/scorecard.css';
import type { Variable } from '../types/Scorecard.types';
import { ScorecardVariablesModal } from '../components/scorecard-components/ScorecardVariablesModal';

export const ScorecardEngine: React.FC = () => {
  const [scoreValue, setScoreValue] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingVariable, setEditingVariable] = useState<Variable | null>(null);
  const [variables, setVariables] = useState<Variable[]>([]);

  const handleScoreValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      setError('');
      setScoreValue('');
      return;
    }

    if (value.length > 1 && value.startsWith('0')) {
      setError('Numărul nu poate începe cu 0!');
      return;
    }

    if (Number(value) > 1001) {
      return;
    }

    if (Number(value) < 0) {
      setError('Numărul trebuie să fie pozitiv!');
      return;
    }

    setError('');
    setScoreValue(value);
  };

  const handleAddOrUpdateVariable = (variable: Variable) => {
    if (editingVariable) {
      setVariables(variables.map((v) => (v.id === variable.id ? variable : v)));
    } else {
      setVariables([...variables, variable]);
    }
    setShowModal(false);
    setEditingVariable(null);
  };

  const handleEditVariable = (variable: Variable) => {
    setEditingVariable(variable);
    setShowModal(true);
  };

  const handleDeleteVariable = (id: string) => {
    setVariables(variables.filter((v) => v.id !== id));
  };

  const totalWeight = variables.reduce((sum, v) => sum + v.weight, 0);
  const isWeightValid = totalWeight.toFixed(2) === '1.00';

  return (
    <>
      <div className="bg-white mx-auto shadow-2xl rounded-xl p-6 max-w-3xl">
        <h1 className="text-md lg:text-lg font-bold text-center">
          Scorecard Engine Configuration
        </h1>
        <div className="flex flex-col md:flex-row gap-2 md:justify-between mt-8">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <label className="font-semibold">
                Scor Maxim Posibil (<span className="text-blue-600">0</span> -{' '}
                <span className="text-blue-600">1000</span>):{' '}
              </label>
              <input
                type="number"
                min="1"
                value={scoreValue}
                onChange={handleScoreValueChange}
                className="text-blue-600 ml-1 border border-gray-200 rounded-md text-center max-w-10 sm:max-w-20 font-semibold  no-spinner focus:outline-none focus:border-blue-300"
              />
            </div>
            {error && (
              <span className="text-red-500 text-[10px] text-end w-full">
                {error}
              </span>
            )}
          </div>
          <p className="font-semibold">
            Total ponderi:{' '}
            <span className="text-blue-600 border border-gray-200 rounded-md text-center max-w-10 sm:max-w-20 font-semibold   px-3 py-1">
              {totalWeight.toFixed(2)}
            </span>
          </p>
        </div>
        <div className="flex justify-between mt-10">
          <button
            onClick={() => setShowModal(true)}
            className="bg-white border border-gray-300 shadow-md px-4 py-2   rounded-lg hover:bg-gray-50"
          >
            Adaugă variabilă
          </button>
          <button
            disabled={variables.length === 0 || !isWeightValid}
            className="bg-blue-500 px-4 py-2 disabled:bg-gray-400 text-white rounded-lg shadow-md hover:bg-blue-500/90"
          >
            Salvează
          </button>
        </div>

        {variables.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Nicio variabilă definită încă.
          </p>
        ) : (
          <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden mt-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border-b">Nume variabilă</th>
                <th className="p-3 border-b">Tip</th>
                <th className="p-3 border-b">Pondere</th>
                <th className="p-3 border-b">Nr. reguli</th>
                <th className="p-3 border-b text-center">Activă</th>
                <th className="p-3 border-b text-center">Acțiuni</th>
              </tr>
            </thead>
            <tbody>
              {variables.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50 transition">
                  <td className="p-3 border-b font-medium">{v.name}</td>
                  <td className="p-3 border-b capitalize">{v.type}</td>
                  <td className="p-3 border-b">{v.weight.toFixed(2)}</td>
                  <td className="p-3 border-b">{v.rules.length}</td>
                  <td className="p-3 border-b text-center">
                    {v.active ? 'DA' : 'NU'}
                  </td>
                  <td className="p-3 border-b text-center space-x-2">
                    <button
                      onClick={() => handleEditVariable(v)}
                      className="border border-gray-400 rounded-md py-1 px-3 hover:text-gray-600 text-sm"
                    >
                      Editează
                    </button>
                    <button
                      onClick={() => handleDeleteVariable(v.id)}
                      className="text-red-600 border border-gray-400 rounded-md py-1 px-3 hover:text-red-400 text-sm"
                    >
                      Șterge
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showModal && (
        <ScorecardVariablesModal
          onClose={() => setShowModal(false)}
          onSave={(variable) => handleAddOrUpdateVariable(variable)}
        />
      )}
    </>
  );
};
