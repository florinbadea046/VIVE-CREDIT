import {useState} from "react";

interface LendingSettingsProps {
    isDark: boolean;
}

function LendingSettings({ isDark }: LendingSettingsProps) {
    const [minAmount, setMinAmount] = useState(1000);
    const [maxAmount, setMaxAmount] = useState(50000);
    const [interest, setInterest] = useState(5.0);

    const handleSave = () => {
        alert('Lending Settings saved successfully!');
    };

    const handleCancel = () => {
        setMinAmount(1000);
        setMaxAmount(50000);
        setInterest(5.0);
    };

    return (
        <div className="space-y-6">
            <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} px-3 py-2 rounded mb-2`}>
                    Minimum Loan Amount
                </label>
                <input
                    type="number"
                    value={minAmount}
                    onChange={(e) => setMinAmount(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter minimum loan amount"
                />
            </div>
            <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} px-3 py-2 rounded mb-2`}>
                    Maximum Loan Amount
                </label>
                <input
                    type="number"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter maximum loan amount"
                />
            </div>
            <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} px-3 py-2 rounded mb-2`}>
                    Interest Rate: {interest}(%)
                </label>
                <input
                    type="range"
                    min='0'
                    max='30'
                    value={interest}
                    onChange={(e) => setInterest(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter interest rate"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>30%</span>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button 
                    onClick={handleCancel}
                    className='px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition'
                >
                    Anuleaza
                </button>
                <button 
                    onClick={handleSave}
                    className='px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-md'
                >
                    Salveaza 
                </button>
            </div>
        </div>
    )
}
export default LendingSettings;