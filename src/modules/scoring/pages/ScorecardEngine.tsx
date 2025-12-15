import { useState } from 'react';
import '../style/scorecard.css';
import type { Variable } from '../types/Scorecard.types';
import { ScorecardVariablesModal } from '../components/scorecard-components/ScorecardVariablesModal';

export const ScorecardEngine: React.FC = () => {
  const [scoreValue, setScoreValue] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [variables, setVariables] = useState<Variable[]>([]);
  const [editingVariable, setEditingVariable] = useState<Variable | null>(null);
  const [openRow, setOpenRow] = useState<string | null>(null);

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

  const displayVariableName = (name: string) => {
    switch (name) {
      case 'venit':
        return 'Venit';
      case 'varsta':
        return 'Vârstă';
      case 'sector':
        return 'Sector';
      case 'istorice':
        return 'Istoric';
      case 'kyc':
        return 'KYC Flags';
      default:
        return name;
    }
  };

  const handleShowModalRules = (rowId: string) => {
    setOpenRow(openRow === rowId ? null : rowId);
  };

  const totalWeight = variables
    .filter((v) => v.active)
    .reduce((sum, v) => sum + v.weight, 0);
  const isWeightValid = totalWeight.toFixed(2) === '1.00';

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white dark:bg-slate-800 mx-auto shadow-2xl rounded-xl p-6 w-full max-w-3xl">
          <h1 className="text-md lg:text-lg font-bold text-center">
            Scorecard Engine Configuration
          </h1>
          <div className="flex flex-col md:flex-row gap-2 md:justify-between mt-8">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <label className="font-semibold">
                  Scor Maxim Posibil (
                  <span className="text-blue-600 dark:text-blue-400">0</span> -{' '}
                  <span className="text-blue-600 dark:text-blue-400">1000</span>
                  ):{' '}
                </label>
                <input
                  type="number"
                  min="1"
                  value={scoreValue}
                  onChange={handleScoreValueChange}
                  className="text-blue-600 dark:text-blue-400 ml-1 border border-gray-200 rounded-md text-center dark:bg-slate-800 max-w-10 sm:max-w-20 font-semibold  no-spinner focus:outline-none focus:border-blue-300"
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
              <span className="text-blue-600 dark:text-blue-400 border border-gray-200 rounded-md text-center max-w-10 sm:max-w-20 font-semibold   px-3 py-1">
                {totalWeight.toFixed(2)}
              </span>
            </p>
          </div>
          <div className="flex justify-between mt-10">
            <button
              onClick={() => setShowModal(true)}
              className="bg-white dark:bg-slate-800 hover:dark:bg-slate-700/60 border border-gray-300 shadow-md px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              Adaugă variabilă
            </button>
            <button
              disabled={!isWeightValid}
              className="bg-blue-500 px-4 py-2 disabled:bg-gray-400 disabled:dark:bg-gray-500 text-white rounded-lg shadow-md hover:bg-blue-500/90"
            >
              Salvează
            </button>
          </div>
          {variables.length !== 0 ? (
            <div>
              {/* Desktop */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left border border-gray-200 dark:border-slate-300 rounded-lg overflow-hidden mt-6">
                  <thead className="bg-blue-100 dark:bg-slate-600 ">
                    <tr>
                      <th className="p-3 border border-gray-300 dark:border-slate-400">
                        Nume variabilă
                      </th>
                      <th className="p-3 border border-gray-300 dark:border-slate-400">
                        Tip
                      </th>
                      <th className="p-3 border border-gray-300 dark:border-slate-400">
                        Pondere
                      </th>
                      <th className="p-3 border border-gray-300 dark:border-slate-400">
                        Nr. reguli
                      </th>
                      <th className="p-3 border border-gray-300 dark:border-slate-400 text-center">
                        Activă
                      </th>
                      <th className="p-3 border border-gray-300 dark:border-slate-400 text-center">
                        Acțiuni
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {variables.map((v) => (
                      <tr
                        key={v.id}
                        className={`hover:bg-blue-50/50 hover:dark:bg-slate-900  transition capitalize ${
                          !v.active ? 'bg-gray-100' : ''
                        }`}
                      >
                        <td className="p-3 border font-medium dark:border-slate-400 ">
                          {displayVariableName(v.name)}
                        </td>
                        <td className="p-3 border dark:border-slate-400 ">
                          {' '}
                          {v.type === 'boolean' ? (
                            <div className="flex flex-col ">
                              <span>{v.type}</span>
                              <span>
                                ({v.booleanV === 'true' ? 'Adevărat' : 'Fals'})
                              </span>
                            </div>
                          ) : (
                            <span>{v.type}</span>
                          )}
                        </td>
                        <td className="p-3 border dark:border-slate-400 text-center">
                          {v.weight.toFixed(2)}
                        </td>
                        <td className="p-3 border dark:border-slate-400 text-center relative">
                          {v.rules.length === 0 ? (
                            v.rules.length
                          ) : (
                            <div className="flex flex-col">
                              {v.rules.length}
                              <button
                                onClick={() => handleShowModalRules(v.id)}
                                className="text-xs border border-gray-300 hover:dark:bg-slate-700 rounded-md text-blue-500 font-bold hover:bg-gray-100 hover:text-blue-400"
                              >
                                Reguli
                              </button>
                              {openRow === v.id && (
                                <>
                                  <div
                                    onClick={() => setOpenRow(null)}
                                    className="fixed inset-0 z-0"
                                  ></div>

                                  <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="absolute bg-white dark:bg-slate-800 shadow-xl rounded-md border border-2 border-blue-400 px-4 py-2 overflow-y-auto max-h-28 max-w-48 z-10 mb-50 top-[-60%] left-1/2 transform -translate-x-1/2"
                                  >
                                    {v.rules.map((rule, i) => (
                                      <div
                                        key={i}
                                        className="flex justify-between dark:bg-slate-800 border border-blue-100 rounded-md px-2 py-1 bg-blue-50 mt-2 shadow-md"
                                      >
                                        <div className="flex flex-col">
                                          <p className="text-xs text-left">
                                            Condiție:
                                          </p>
                                          <p className="text-blue-500 dark:text-blue-400 text-xs text-left">
                                            {rule.condition}
                                          </p>
                                        </div>
                                        <div className="flex flex-col px-4 ">
                                          <p className="text-xs text-left">
                                            Scor:
                                          </p>
                                          <p className="text-blue-800 dark:text-blue-400 text-xs font-semibold text-left">
                                            {rule.score}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                    <button
                                      onClick={() => setOpenRow(null)}
                                      className="mt-2 text-xs font-bold bg-blue-100 dark:bg-slate-600 hover:dark:bg-slate-500/50 dark:text-blue-300 text-blue-500 hover:bg-blue-200/70 rounded px-2 py-1 w-full"
                                    >
                                      Închide
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="p-3 border dark:border-slate-400 text-center">
                          {v.active ? (
                            <span
                              style={{
                                backgroundColor: 'rgb(219, 234, 254)',
                                color: 'rgb(30, 64, 175)',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '14px',
                                fontWeight: 500,
                                display: 'inline-block',
                                width: 'auto',
                              }}
                            >
                              Da
                            </span>
                          ) : (
                            <span
                              style={{
                                backgroundColor: 'rgb(220, 252, 231)',
                                color: 'rgb(22, 101, 52)',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                fontSize: '14px',
                                fontWeight: 500,
                                display: 'inline-block',
                                width: 'auto',
                              }}
                            >
                              Nu
                            </span>
                          )}
                        </td>
                        <td className="p-3 border dark:border-slate-400 text-center space-x-2">
                          <button
                            className="border border-gray-400 rounded-md py-1 px-3 hover:text-gray-600 text-sm"
                            onClick={() => handleEditVariable(v)}
                          >
                            Editează
                          </button>

                          <button
                            className="text-red-600 border border-gray-400 rounded-md py-1 px-3 hover:text-red-400 text-sm"
                            onClick={() => handleDeleteVariable(v.id)}
                          >
                            Șterge
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile  */}

              <div className="block sm:hidden  flex flex-col gap-4 mt-6">
                {variables.map((v) => (
                  <div
                    key={v.id}
                    className={`border rounded-lg p-4 shadow-sm dark:border-slate-200 dark:bg-slate-800 flex flex-col gap-2 ${
                      !v.active ? 'bg-gray-100' : 'bg-white'
                    }`}
                  >
                    <div className="capitalize">
                      <span className="font-semibold">Nume variabilă: </span>
                      {displayVariableName(v.name)}
                    </div>
                    <div className="capitalize">
                      <span className="font-semibold">Tip: </span>
                      {v.type === 'boolean'
                        ? `${v.type} (${
                            v.booleanV === 'true' ? 'Adevărat' : 'Fals'
                          })`
                        : v.type}
                    </div>
                    <div>
                      <span className="font-semibold">Pondere: </span>
                      {v.weight.toFixed(2)}
                    </div>
                    <div className="flex gap-2">
                      <span className="font-semibold">Nr. reguli: </span>
                      <div className=" text-center relative">
                        {v.rules.length === 0 ? (
                          v.rules.length
                        ) : (
                          <div className="flex gap-2 ">
                            {v.rules.length}
                            <button
                              onClick={() => handleShowModalRules(v.id)}
                              className="text-xs px-2 py-1 border border-gray-300 rounded-md text-blue-500 font-bold hover:bg-gray-100 dark:hover:bg-slate-600 hover:text-blue-400"
                            >
                              Reguli
                            </button>
                            {openRow === v.id && (
                              <>
                                <div
                                  onClick={() => setOpenRow(null)}
                                  className="fixed inset-0 z-0"
                                ></div>

                                <div
                                  onClick={(e) => e.stopPropagation()}
                                  className="absolute bg-white dark:bg-slate-800 shadow-xl rounded-md border border-2 border-blue-200 px-4 py-2 overflow-y-auto max-h-28 max-w-30 z-10  top-[-160%] left-[150%] transform -translate-x-1/2"
                                >
                                  {v.rules.map((rule, i) => (
                                    <div
                                      key={i}
                                      className="flex justify-between dark:bg-slate-800 border border-blue-100 rounded-md px-2 py-1 bg-blue-50 mt-2 shadow-md"
                                    >
                                      <div className="flex flex-col  ">
                                        <p className="text-xs text-left">
                                          Condiție:
                                        </p>
                                        <p className="text-blue-500 text-xs text-left">
                                          {rule.condition}
                                        </p>
                                      </div>
                                      <div className="flex flex-col px-4 ">
                                        <p className="text-xs text-left">
                                          Scor:
                                        </p>
                                        <p className="text-blue-800 dark:text-blue-500 text-xs font-semibold text-left">
                                          {rule.score}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                  <button
                                    onClick={() => setOpenRow(null)}
                                    className="mt-2 text-xs bg-blue-500 text-white rounded px-2 py-1 w-full"
                                  >
                                    Închide
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold">Activă: </span>
                      {v.active ? 'Da' : 'Nu'}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        className="border border-gray-400 rounded-md py-1 px-3 hover:text-gray-600 text-sm"
                        onClick={() => handleEditVariable(v)}
                      >
                        Editează
                      </button>
                      <button
                        className="text-red-600 border border-gray-400 rounded-md py-1 px-3 hover:text-red-400 text-sm"
                        onClick={() => handleDeleteVariable(v.id)}
                      >
                        Șterge
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        {showModal && (
          <ScorecardVariablesModal
            onClose={() => setShowModal(false)}
            onSave={(variable) => handleAddOrUpdateVariable(variable)}
            initialVariable={editingVariable}
          />
        )}
      </div>
    </>
  );
};
