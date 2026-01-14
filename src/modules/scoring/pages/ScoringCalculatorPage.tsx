import React, { useState, useEffect } from 'react';
import { Calculator, History, BarChart3, TrendingUp } from 'lucide-react';
import { useScoringCalculator } from '../hooks/useScoringCalculator';
import { ScoringCalculator } from '../components/ScoringCalculator/ScoringCalculator';
import { ScoringHistoryCard } from '../components/ScoringCalculator/ScoringHistoryCard';
import type { ScoreRange } from '../types/scoringCalculator.types';
import { getScoreRangeLabel } from '../utils/scoringCalculator.utils';
import { useLocation } from 'react-router-dom';

type TabType = 'calculator' | 'history' | 'statistics';

export const ScoringCalculatorPage: React.FC = () => {
  const location = useLocation();
  const formDataFromScorecard = location.state?.formData;
  const [activeTab, setActiveTab] = useState<TabType>('calculator');

  const {
    isCalculating,
    result,
    history,
    statistics,
    isLoadingHistory,
    isLoadingStatistics,
    error,
    calculateScore,
    fetchHistory,
    fetchStatistics,
    resetResult,
  } = useScoringCalculator();

  // Încarcă datele la mount
  useEffect(() => {
    fetchHistory();
    fetchStatistics();
  }, [fetchHistory, fetchStatistics]);

  const tabs = [
    {
      id: 'calculator' as TabType,
      label: 'Calculator',
      icon: <Calculator className="w-4 h-4" />,
      description: 'Tool interactiv',
    },
    {
      id: 'history' as TabType,
      label: 'Istoric',
      icon: <History className="w-4 h-4" />,
      description: 'Calcule anterioare',
      badge: history.length,
    },
    {
      id: 'statistics' as TabType,
      label: 'Statistici',
      icon: <BarChart3 className="w-4 h-4" />,
      description: 'Analiză date',
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-16 h-16 bg-[#2e57e1] rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Calculator Scoring
              </h1>
              <p className="text-gray-500">
                Calculează și afișează scorul în timp real
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-colors whitespace-nowrap relative ${
                activeTab === tab.id
                  ? 'bg-white text-[#2e57e1] shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-[#2e57e1] text-white text-xs rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Calculator Tab */}
            {activeTab === 'calculator' && (
              <div>
                {/* Info Card */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calculator className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">
                        Tool Interactiv de Scoring
                      </h3>
                      <p className="text-sm text-blue-700">
                        Introduceți salariul, cheltuielile și datoriile pentru a
                        calcula scorul automat. Scorul este calculat pe baza
                        ratei de îndatorare: (cheltuieli + datorii) / salariu.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Calculator Component */}
                <ScoringCalculator
                  onCalculate={calculateScore}
                  isCalculating={isCalculating}
                  result={result}
                  error={error}
                  onReset={resetResult}
                  initialData={formDataFromScorecard}
                />
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <History className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-900 mb-1">
                        Istoric Calcule
                      </h3>
                      <p className="text-sm text-purple-700">
                        Toate calculele de scoring efectuate anterior. Click pe
                        un card pentru a vedea detalii.
                      </p>
                    </div>
                  </div>
                </div>

                {isLoadingHistory ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-[#2e57e1] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : history.length > 0 ? (
                  <div className="space-y-4">
                    {history.map((entry) => (
                      <ScoringHistoryCard key={entry.id} entry={entry} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500 bg-white border border-gray-200 rounded-xl">
                    <History className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Nu există istoric de calcule</p>
                  </div>
                )}
              </div>
            )}

            {/* Statistics Tab */}
            {activeTab === 'statistics' && (
              <div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900 mb-1">
                        Statistici și Analiză
                      </h3>
                      <p className="text-sm text-green-700">
                        Statistici globale despre toate calculele de scoring
                        efectuate.
                      </p>
                    </div>
                  </div>
                </div>

                {isLoadingStatistics ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-2 border-[#2e57e1] border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : statistics ? (
                  <div className="space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <p className="text-sm text-gray-500 mb-1">
                          Total calcule
                        </p>
                        <p className="text-3xl font-bold text-gray-800">
                          {statistics.totalCalculations}
                        </p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <p className="text-sm text-gray-500 mb-1">Scor mediu</p>
                        <p className="text-3xl font-bold text-gray-800">
                          {statistics.averageScore.toFixed(1)}
                        </p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <p className="text-sm text-gray-500 mb-1">
                          Rată eligibilitate
                        </p>
                        <p className="text-3xl font-bold text-green-600">
                          {statistics.eligibilityRate}%
                        </p>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-xl p-5">
                        <p className="text-sm text-gray-500 mb-1">DTI mediu</p>
                        <p className="text-3xl font-bold text-gray-800">
                          {(statistics.averageDebtRatio * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    {/* Distribution */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-800 mb-4">
                        Distribuție pe categorii
                      </h3>
                      <div className="space-y-3">
                        {Object.entries(statistics.distributionByRange).map(
                          ([range, count]) => {
                            const percentage =
                              (count / statistics.totalCalculations) * 100;
                            const colorClass =
                              range === 'VERY_HIGH' || range === 'HIGH'
                                ? 'bg-green-500'
                                : range === 'MEDIUM'
                                ? 'bg-yellow-500'
                                : 'bg-red-500';

                            return (
                              <div key={range}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-gray-700">
                                    {getScoreRangeLabel(range as ScoreRange)}
                                  </span>
                                  <span className="text-sm text-gray-600">
                                    {count} ({percentage.toFixed(1)}%)
                                  </span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full ${colorClass} transition-all`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Formula Card */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">
                📐 Formula Scoring
              </h3>
              <div className="space-y-2 text-xs">
                <div className="bg-white/50 rounded-lg p-3 font-mono">
                  <p className="text-gray-600 mb-1">Rata îndatorare:</p>
                  <p className="text-[#2e57e1] font-semibold">
                    (cheltuieli + datorii) / salariu
                  </p>
                </div>
                <div className="bg-white/50 rounded-lg p-2">
                  <p className="text-gray-700 font-medium mb-1">
                    Scor bazat pe rată:
                  </p>
                  <ul className="space-y-0.5 text-gray-600">
                    <li>• &lt; 30% → Scor 85</li>
                    <li>• 30-40% → Scor 70</li>
                    <li>• 40-50% → Scor 55</li>
                    <li>• 50-60% → Scor 40</li>
                    <li>• &gt; 60% → Scor 25</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Color Legend */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">
                🎨 Bară Colorată
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-gray-700">Roșu (0-40)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-gray-700">Galben (41-70)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-gray-700">Verde (71-100)</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            {result && (
              <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-xl p-5 text-white">
                <h3 className="font-semibold mb-3 text-sm">
                  ⚡ Ultimul Calcul
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="opacity-90">Scor:</span>
                    <span className="font-bold">{result.score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-90">Status:</span>
                    <span className="font-bold">
                      {result.eligibil ? '✓ Eligibil' : '✗ Neeligibil'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoringCalculatorPage;
