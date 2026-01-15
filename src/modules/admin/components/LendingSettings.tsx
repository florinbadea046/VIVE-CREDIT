import {useState} from "react";
import { useTheme } from "@/context/ThemeContext";

interface LendingSettingsProps {}

function LendingSettings({}: LendingSettingsProps) {
    const [minAmount, setMinAmount] = useState(1000);
    const [maxAmount, setMaxAmount] = useState(50000);
    const [interest, setInterest] = useState(5.0);
    const { theme } = useTheme();
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        setIsSaved(true);
        alert('Lending Settings saved successfully!');
        // Revert button color after 3 seconds
        setTimeout(() => setIsSaved(false), 3000);
    };

    const handleCancel = () => {
        setMinAmount(1000);
        setMaxAmount(50000);
        setInterest(5.0);
    };

    return (
        <div className="space-y-4 lg:space-y-6">
            <div>
                <label className={`block text-xs lg:text-sm font-medium ${theme === 'dark' ? 'dark:text-[#c7d5ff]' : 'text-gray-900'} px-3 py-2 rounded mb-2`}>
                    Minimum Loan Amount
                </label>
                <input
                    type="number"
                    value={minAmount}
                    onChange={(e) => setMinAmount(Number(e.target.value))}
                    className={`w-full px-3 lg:px-4 py-2 text-sm lg:text-base border border-gray-300 rounded-lg text-gray-900 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark' ? 'bg-[#0c1324] dark:text-[#c7d5ff]' : 'bg-white'}`}
                    placeholder="Enter minimum loan amount"
                />
            </div>
            <div>
                <label className={`block text-xs lg:text-sm font-medium ${theme === 'dark' ? 'dark:text-[#c7d5ff]' : 'text-gray-900'} px-3 py-2 rounded mb-2`}>
                    Maximum Loan Amount
                </label>
                <input
                    type="number"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(Number(e.target.value))}
                    className={`w-full px-3 lg:px-4 py-2 text-sm lg:text-base border border-gray-300 rounded-lg text-gray-900 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark' ? 'bg-[#0c1324] dark:text-[#c7d5ff]' : 'bg-white'}`}
                    placeholder="Enter maximum loan amount"
                />
            </div>
            <div>
                <label className={`block text-xs lg:text-sm font-medium ${theme === 'dark' ? 'dark:text-[#c7d5ff]' : 'text-gray-900'} px-3 py-2 rounded mb-2`}>
                    Interest Rate: {interest}(%)
                </label>
                <input
                    type="range"
                    min='0'
                    max='30'
                    value={interest}
                    onChange={(e) => setInterest(Number(e.target.value))}
                    className="w-full px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter interest rate"
                />
                <div className="flex justify-between text-xs lg:text-sm text-gray-500 mt-1">
                    <span>0%</span>
                    <span>30%</span>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-3 pt-4 border-t border-gray-200">
                <button 
                    onClick={handleCancel}
                    className='w-full lg:w-auto px-4 lg:px-6 py-2 text-sm lg:text-base bg-blue-600 dark:text-[#c7d5ff] rounded-lg font-medium hover:bg-gray-300 transition'
                >
                    Anuleaza
                </button>
                <button 
                    onClick={handleSave}
                    className={`w-full lg:w-auto px-4 lg:px-6 py-2 text-sm lg:text-base rounded-lg font-medium transition shadow-md ${
                        isSaved 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-800 hover:bg-blue-700'
                    }`}
                >
                    {isSaved ? '✓ Salvat' : 'Salveaza'}
                </button>
            </div>
        </div>
    )
}
export default LendingSettings;