import React, { useEffect, useState } from 'react';
import type {RiskConfiguration, ScoreRule, IncomeThreshold, DebtThreshold} from '../../../types/global';

type TabType = 'configurations' | 'scoreRules' | 'incomeThresholds' | 'debtThresholds' | 'score-rules' | 'income-thresholds' | 'debt-thresholds';
export const RiskConfigPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('score-rules');
    const [configurations, setConfigurations] = useState<RiskConfiguration[]>([]);
    const [selectedConfig, setSelectedConfig] = useState<RiskConfiguration | null>(null);
    const [scoreRules, setScoreRules] = useState<ScoreRule[]>([]);
    const [_loading, setLoading] = useState(false);
    const [incomeThresholds, setIncomeThresholds] = useState<IncomeThreshold[]>([]);
    const [debtThresholds, setDebtThresholds] = useState<DebtThreshold[]>([]);
    const [showConfigModal, setShowConfigModal] = useState(false);
    const [showRuleModal, setShowRuleModal] = useState(false);
    const [showIncomeModal, setShowIncomeModal] = useState(false);
    const [showDebtModal, setShowDebtModal] = useState(false);

    const [configForm, setConfigForm] = useState({
        name: '',
        description: '',
        isActive: false
    });
    const [ruleForm, setRuleForm] = useState<Partial<ScoreRule>>({
        name: '',
        description: '',
        condition: '',
        scoreImpact: 0,
        weight: 1,
        category: 'income' as ScoreRule['category'],
        isActive: true,
    })
    const [incomeForm, setIncomeForm] = useState<Partial<IncomeThreshold>>({
        minIncome: 0,
        maxIncome: 0,
        riskLevel: 'medium',
        approvalRequired: false,
    });
    const [debtForm, setDebtForm] = useState<Partial<DebtThreshold>>({
        maxDebtToIncomeRatio: 0,
        riskLevel: 'medium',
        approvalRequired: false,
        description: '',
    })
    useEffect(()=>{
        loadConfigurations();
    },[]);
    useEffect(() => {
        if (selectedConfig) {
            loadScoreRules(selectedConfig.id);
            loadIncomeThresholds(selectedConfig.id);
            loadDebtThresholds(selectedConfig.id);
        }
    }, [selectedConfig]);

    const loadConfigurations = () => {
        setLoading(true);
        try {
            const savedConfigs = localStorage.getItem('vive-risk-configs');
            if (savedConfigs) {
                const configs = JSON.parse(savedConfigs);
                setConfigurations(configs);
                if (configs.length > 0 && !selectedConfig) {
                    setSelectedConfig(configs[0]);
                }
            } else{
                const initialConfig: RiskConfiguration = {
                    id: '1',
                    name: 'Configurație Standard',
                    description: 'Configurație inițială pentru evaluarea riscurilor',
                    scoreRules: [],
                    incomeThresholds: [],
                    debtThresholds: [],
                    isActive: true,
                    created: new Date().toISOString(),
                    updated: new Date().toISOString(),
                };
                setConfigurations([initialConfig]);
                setSelectedConfig(initialConfig);
                localStorage.setItem('vive-risk-configs', JSON.stringify([initialConfig]));
            }
        } catch (error) {
            console.error('Error loading configurations:', error);
        } finally {
            setLoading(false);
        }
    };
    const loadScoreRules = (configId: string) => {
        try {
            const savedRules = localStorage.getItem(`vive-score-rules-${configId}`);
            if (savedRules) {
                const rules = JSON.parse(savedRules);
                setScoreRules(rules);
            } else {
                setScoreRules([]);
            }
        } catch (error) {
            console.error('Error loading score rules:', error);
        }
    }
    const loadIncomeThresholds = (configId: string) => {
        try {
            const savedThresholds = localStorage.getItem(`vive-income-thresholds-${configId}`);
            if (savedThresholds) {
                const thresholds = JSON.parse(savedThresholds);
                setIncomeThresholds(thresholds);
            } else {
                setIncomeThresholds([]);
            }
        } catch (error) {
            console.error('Error loading income thresholds:', error);
        }
    }
    const loadDebtThresholds = (configId: string) => {
        try {
            const savedThresholds = localStorage.getItem(`vive-debt-thresholds-${configId}`);
            if (savedThresholds) {
                const thresholds = JSON.parse(savedThresholds);
                setDebtThresholds(thresholds);
            } else {
                setDebtThresholds([]);
            }
        } catch (error) {
            console.error('Error loading debt thresholds:', error);
        }
    }
    const handleCreateConfig = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newConfig: RiskConfiguration = {
                id: Date.now().toString(),
                ...configForm,
                scoreRules: [],
                incomeThresholds: [],
                debtThresholds: [],
                isActive: true,
                created: new Date().toISOString(),
                updated: new Date().toISOString(),
            }
            const updatedConfigs = [...configurations, newConfig];
            setConfigurations(updatedConfigs);
            localStorage.setItem('vive-risk-configs', JSON.stringify(updatedConfigs));
            setShowConfigModal(false);
            setConfigForm({
                name: '',
                description: '',
                isActive: false
            });
        } catch (error) {
            console.error('Error creating configuration:', error);
        } finally {
            setLoading(false);
        }
    }
    const handleCreateRule = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedConfig) return;
        setLoading(true);
        try {
            const newRule: ScoreRule = {
                id: Date.now().toString(),
                name: ruleForm.name!,
                description: ruleForm.description!,
                condition: ruleForm.condition!,
                scoreImpact: ruleForm.scoreImpact!,
                weight: ruleForm.weight!,
                category: ruleForm.category!,
                isActive: ruleForm.isActive!,
            }
            const updatedRules = [...scoreRules, newRule];
            setScoreRules(updatedRules);
            localStorage.setItem(`vive-score-rules-${selectedConfig.id}`, JSON.stringify(updatedRules));
            setShowRuleModal(false);
            setRuleForm({
                name: '',
                description: '',
                condition: '',
                scoreImpact: 0,
                weight: 1,
                category: 'income',
                isActive: true,
            });
        }
        catch (error) {
            console.error('Error creating score rule:', error);
        } finally {
            setLoading(false);
        }
    }
    const handleCreateIncome = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedConfig) return;
        setLoading(true);
        try {
            const newIncome: IncomeThreshold = {
                id: Date.now().toString(),
                minIncome: incomeForm.minIncome!,
                maxIncome: incomeForm.maxIncome!,
                riskLevel: incomeForm.riskLevel!,
                approvalRequired: incomeForm.approvalRequired!,
                maxLoanAmount: incomeForm.maxLoanAmount,
            }
            const updatedIncomes = [...incomeThresholds, newIncome];
            setIncomeThresholds(updatedIncomes);
            localStorage.setItem(`vive-income-thresholds-${selectedConfig.id}`, JSON.stringify(updatedIncomes));
            setShowIncomeModal(false);
            setIncomeForm({
                minIncome: 0,
                maxIncome: 0,
                riskLevel: 'medium',
                approvalRequired: false,
            });
        }
        catch (error) {
            console.error('Error creating income threshold:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleCreateDebt = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedConfig) return;
        setLoading(true);
        try {
            const newDebt: DebtThreshold = {
                id: Date.now().toString(),
                maxDebtToIncomeRatio: debtForm.maxDebtToIncomeRatio!,
                riskLevel: debtForm.riskLevel!,
                approvalRequired: debtForm.approvalRequired!,
                description: debtForm.description!,
            }
            const updatedDebts = [...debtThresholds, newDebt];
            setDebtThresholds(updatedDebts);
            localStorage.setItem(`vive-debt-thresholds-${selectedConfig.id}`, JSON.stringify(updatedDebts));
            setShowDebtModal(false);
            setDebtForm({
                maxDebtToIncomeRatio: 0,
                riskLevel: 'medium',
                approvalRequired: false,
                description: '',
            });
        }
        catch (error) {
            console.error('Error creating debt threshold:', error);
        } finally {
            setLoading(false);
        }
    };
    const getRiskBadge = (level: string) => {
        const colors = {
            low: 'bg-green-100 text-green-800',
            medium: 'bg-yellow-100 text-yellow-800',
            high: 'bg-red-100 text-red-800',
        }
        return colors[level as keyof typeof colors] || colors.medium;
    };
    return (
        <div className='p-6 min-h-screen bg-gray-100'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex justify-between items-center mb-6'>
                    <h1>Configurari Risk</h1>
                    <button onClick={() => setShowConfigModal(true)}
                        className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'>
                            Adauga Configuratie
                    </button>
                </div>
                <div className='mb-6 bg-white p-4 rounded-lg shadow'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Selecteaza Configurarea:
                    </label>
                    <select 
                        value={selectedConfig ?.id || ''}
                        onChange={(e) => {
                            const config = configurations.find(c => c.id === e.target.value);
                            setSelectedConfig(config || null);
                        }}
                        className='w-full px-3  py-2 border border-gray-300 rounded-md'
                    >
                        {configurations.map(config => (
                            <option key={config.id} value={config.id}>
                                {config.name} {config.isActive ? '(Activ)' : '(Inactiv)'}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='bg-white p-4 rounded-lg shadow mb-6'>
                    <div className='border-b border-gray-200 '>
                        <div className='flex space-x-8 px-6'>
                            <button
                                className={`px-1 py-4 border-b-2 font-medium text-sm
                                    ${activeTab === 'score-rules' 
                                        ? 'border-blue-500 text-white' : 
                                        'border-transparent text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('score-rules')}
                            >
                                Reguli Scor
                            </button>
                            <button
                                className={`px-1 py-4 border-b-2 font-medium text-sm
                                    ${activeTab === 'income-thresholds'
                                        ? 'border-blue-500 text-white' : 
                                        'border-transparent text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('income-thresholds')}
                            >
                                Praguri Venit
                            </button>
                            <button
                                className={`px-1 py-4 border-b-2 font-medium text-sm
                                    ${activeTab === 'debt-thresholds' 
                                        ? 'border-blue-500 text-white' :
                                        'border-transparent text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('debt-thresholds')}
                            >
                                Praguri Datorii
                            </button>
                        </div>
                    </div>
                    <div className='p-6'>
                        {activeTab === 'score-rules' &&(
                        <div>
                            <div className='flex justify-between items-center mb-4'>
                                <h3 className='text-lg font-semibold'>Reguli Scor</h3>
                                <button
                                    onClick={() => setShowRuleModal(true)}
                                    className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400'
                                    disabled={!selectedConfig}
                                >
                                    Adauga Regula
                                </button>
                            </div>
                            <div className='space-y-4'>
                                {scoreRules.map((rule) =>(
                                    <div key={rule.id} className='border p-4 rounded-lg '>
                                        <div className='flex justify-between items-start'>
                                            <div className='flex-1'>
                                                <div className='flex gap-2 items-center mb-2'>
                                                    <h4 className=' font-semibold'>{rule.name}</h4>
                                                    <span className={`text-sm px-2 py-1 rounded ${rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                        {rule.isActive ? 'Activ' : 'Inactiv'}
                                                    </span>
                                                    <span className='text-xs px-2 py-1 rounded bg-blue-100 text-blue-800'>
                                                        {rule.category}
                                                    </span>
                                                </div>
                                                <p className=' text-sm text-gray-600 mb-2'>{rule.description}</p>
                                                <div className='flex gap-4 text-sm'>
                                                <p>
                                                   <span> Condiție: <code className='bg-gray-100 px-2 py-1 rounded'>{rule.condition}</code></span>
                                                </p>
                                                <p>
                                                   <span> Impact Scor: <strong>{rule.scoreImpact > 0 ? '+' : ''}{rule.scoreImpact}</strong></span>
                                                </p>
                                                <p >
                                                   <span> Greutate: <strong>{rule.weight}</strong></span>
                                                </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>)}
                        {activeTab === 'income-thresholds' &&(
                            <div>
                                <div className='flex justify-between items-center mb-4'>
                                    <h3>Praguri Venit</h3>
                                    <button
                                        onClick={() => setShowIncomeModal(true)}
                                        className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400'
                                        disabled={!selectedConfig}
                                    >
                                        Adauga Prag Venit
                                    </button>
                                </div>
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Venit Min</th>
                                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Venit Max</th>
                                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Nivel Risc</th>
                                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Aprobare Necesara</th>
                                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>Suma Max Imprumutata</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {incomeThresholds.map((threshold)=> (
                                                <tr>
                                                    <td className='px-6 py-4 whitespace-nowrap'>{threshold.minIncome.toLocaleString()}RON</td>
                                                    <td className='px-6 py-4 whitespace-nowrap'>{threshold.maxIncome.toLocaleString()}RON</td>
                                                    <td className={`px-6 py-4 whitespace-nowrap`}>
                                                        <span className={`px-2 py-1 rounded ${getRiskBadge(threshold.riskLevel)}`}>
                                                            {threshold.riskLevel}
                                                        </span>
                                                    </td>
                                                    <td className='px-6 py-4 whitespace-nowrap'>
                                                        {threshold.approvalRequired ? 'Da' : 'Nu'}
                                                    </td>
                                                    <td className='px-6 py-4 whitespace-nowrap'>
                                                        {threshold.maxLoanAmount ? `${threshold.maxLoanAmount.toLocaleString()}RON` : '-'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                        {activeTab === 'debt-thresholds' &&(
                            <div>
                                <div className='flex justify-between items-center mb-4'>
                                    <h3 className='text-lg font-semibold'>Praguri Datorii</h3>
                                    <button
                                        onClick={() => setShowDebtModal(true)}
                                        className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400'
                                    >
                                        Adauga Prag Datorie
                                    </button>
                                </div>
                                <div className='space-y-4'>
                                    {debtThresholds.map((threshold) => (
                                        <div key={threshold.id} className='border p-4 rounded-lg'>
                                            <div className='flex justify-between items-center'>
                                                <div className='flex-1'>
                                                    <div className='flex gap-2 mb-2 items-center'>
                                                        <span className='font-semibold'>Raport Datorii/Venit: {threshold.maxDebtToIncomeRatio}%</span>
                                                        <span className={`px-2 py-1 text-xs rounded ${getRiskBadge(threshold.riskLevel)}`}>
                                                            {threshold.riskLevel}
                                                        </span>
                                                        {threshold.approvalRequired && (
                                                            <span className='px-2 py-1 text-xs rounded bg-red-100 text-red-800'>
                                                                Aprobare Necesara
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className='text-sm text-gray-600'>{threshold.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showConfigModal && (
                <div className='fixed inset-0 bg-gray-800 bg-opacity-50 ovwerflow-y-auto h-full w-full z-50'>
                    < div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
                        <h3 className='text-lg font-medium mb-4'>Configurare Risc Noua</h3>
                        <form onSubmit={handleCreateConfig} >
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Nume</label>
                                <input
                                    type='text'
                                    value={configForm.name}
                                    onChange={(e) => setConfigForm({ ...configForm, name: e.target.value })}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Descriere</label>
                                <textarea
                                    value={configForm.description}
                                    onChange={(e) => setConfigForm({ ...configForm, description: e.target.value })}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                    rows={3}
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='flex items-center'>
                                    <input
                                        type='checkbox'
                                        checked={configForm.isActive}
                                        onChange={(e) => setConfigForm({ ...configForm, isActive: e.target.checked })}
                                        className='mr-2'
                                    />
                                    <span className='text-sm'>Activeaza imediat</span>
                                </label>
                            </div>
                            <div>
                                <button
                                    type='button'
                                    onClick={() => setShowConfigModal(false)}
                                    className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 '
                                >
                                    Anuleaza
                                </button>
                                <button
                                    type='submit'
                                    className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ml-2'
                                >
                                    Creeaza
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showRuleModal && (
                <div className='fixed inset-0 bg-gray-800 bg-opacity-50 ovwerflow-y-auto h-full w-full z-50'>
                    <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
                        <h3>Regula Scor Noua</h3>
                        <form onSubmit={handleCreateRule}>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Nume</label>
                                <input
                                    type='text'
                                    value={ruleForm.name}
                                    onChange={(e) => setRuleForm({ ...ruleForm, name: e.target.value })}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Descriere</label>
                                <textarea
                                    value={ruleForm.description}
                                    onChange={(e) => setRuleForm({ ...ruleForm, description: e.target.value })}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                    rows={2}
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Condiție</label>
                                <input
                                    type='text'
                                    value={ruleForm.condition}
                                    onChange={(e) => setRuleForm({ ...ruleForm, condition: e.target.value })}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                    placeholder='ex: income > 3000'
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Impact Scor</label>
                                <input
                                    type='number'
                                    value={ruleForm.scoreImpact}
                                    onChange={(e) => setRuleForm({ ...ruleForm, scoreImpact: Number(e.target.value) })}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Greutate</label>
                                <input
                                    type='number'
                                    required
                                    step='0.1'
                                    value={ruleForm.weight}
                                    onChange={(e) => setRuleForm({ ...ruleForm, weight: Number(e.target.value) })}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Categorie</label>
                                <select
                                    value={ruleForm.category}
                                    onChange={(e) => setRuleForm({ ...ruleForm, category: e.target.value as ScoreRule['category'] })}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                >
                                    <option value='income'>Venit</option>
                                    <option value='credit_history'>Istoric Credit</option>
                                    <option value='debt'>Datorii</option>
                                    <option value='employment'>Angajare</option>
                                    <option value='other'>Altele</option>
                                </select>
                            </div>
                            <div>
                                <button
                                    type='button'
                                    onClick={() => setShowRuleModal(false)}
                                    className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 '
                                >
                                    Anuleaza
                                </button>
                                <button
                                    type='submit'
                                    className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 '
                                >
                                    Creeaza
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showIncomeModal && (
                <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
                    <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
                        <h3 className='text-lg font-medium mb-4'>Prag Venit Nou</h3>
                        <form onSubmit={handleCreateIncome}>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Venit Min</label>
                                <input
                                    type='number'
                                    required
                                    value={incomeForm.minIncome}
                                    onChange={(e) => setIncomeForm({ ...incomeForm, minIncome: Number(e.target.value) })}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Venit Max</label>
                                <input
                                    type='number'
                                    required
                                    value={incomeForm.maxIncome}
                                    onChange={(e) => setIncomeForm({ ...incomeForm, maxIncome: Number(e.target.value) })}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Nivel Risc</label>
                                <select
                                    value={incomeForm.riskLevel}
                                    onChange={(e) => setIncomeForm({ ...incomeForm, riskLevel: e.target.value as IncomeThreshold['riskLevel'] })}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                >
                                    <option value='low'>Scazut</option>
                                    <option value='medium'>Mediu</option>
                                    <option value='high'>Ridicat</option>
                                </select>
                            </div>
                            <div className='mb-4'>
                                <label className='flex items-center my-4'>
                                    <input
                                        type='checkbox'
                                        checked={incomeForm.approvalRequired}
                                        onChange={(e) => setIncomeForm({ ...incomeForm, approvalRequired: e.target.checked })}
                                        className='mr-2'
                                    />
                                    <span className='text-sm'>Aprobare Necesara</span>
                                </label>
                            </div>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Suma Max Imprumutata (optional)</label>
                                <input
                                    type='number'
                                    value={incomeForm.maxLoanAmount}
                                    onChange={(e) => setIncomeForm({ ...incomeForm, maxLoanAmount: Number(e.target.value) })}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                />
                            </div>
                            <div>
                                <button
                                    type='button'
                                    onClick={() => setShowIncomeModal(false)}
                                    className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 '
                                >
                                    Anuleaza
                                </button>
                                <button
                                    type='submit'
                                    className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ml-2'
                                >
                                    Creeaza
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showDebtModal && (
                <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
                    <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
                        <h3 className='text-lg font-medium mb-4'>Prag Datorii Nou</h3>
                        <form>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Raport Max Datorii/Venit (%)</label>
                                <input
                                    type='number'
                                    required
                                    value={debtForm.maxDebtToIncomeRatio}
                                    onChange={(e) => setDebtForm({ ...debtForm, maxDebtToIncomeRatio: Number(e.target.value) })}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                />
                            </div>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Nivel Risc</label>
                                <select
                                    value={debtForm.riskLevel}
                                    onChange={(e) => setDebtForm({ ...debtForm, riskLevel: e.target.value as DebtThreshold['riskLevel'] })}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                >
                                    <option value='low'>Scazut</option>
                                    <option value='medium'>Mediu</option>
                                    <option value='high'>Ridicat</option>
                                </select>
                            </div>
                            <div className='mb-4'>
                                <label className='flex items-center my-4'>
                                    <input
                                        type='checkbox'
                                        checked={debtForm.approvalRequired}
                                        onChange={(e) => setDebtForm({ ...debtForm, approvalRequired: e.target.checked })}
                                        className='mr-2'
                                    />
                                    <span className='text-sm'>Aprobare Necesara</span>
                                </label>
                            </div>
                            <div className='mb-4'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Descriere</label>
                                <textarea
                                    value={debtForm.description}
                                    onChange={(e) => setDebtForm({ ...debtForm, description: e.target.value })}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md'
                                    rows={3}
                                />
                            </div>
                            <div>
                                <button
                                    type='button'
                                    onClick={() => setShowDebtModal(false)}
                                    className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400'
                                >
                                    Anuleaza
                                </button>
                                <button
                                    type='button'
                                    onClick={handleCreateDebt}
                                    className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 '
                                >
                                    Creeaza
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )

};