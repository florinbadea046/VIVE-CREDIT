import {useState } from "react";
import { useTheme } from "@/context/ThemeContext";

interface GeneralSettingsProps {}

function GeneralSettings({} : GeneralSettingsProps) {
    const [companyName, setCompanyName] = useState('');
    const [timezone, setTimezone] = useState('UTC');
    const [isSaved, setIsSaved] = useState(false);
    
    const handleSave = () => {
        setIsSaved(true);
        alert('General Settings saved successfully!');
        // Revert button color after 3 seconds
        setTimeout(() => setIsSaved(false), 3000);
    };
    const { theme } = useTheme();

    const handleCancel = () => {
        setCompanyName('');
        setTimezone('UTC');
    };
    
    

    return (
        <div className="space-y-4 lg:space-y-6">
            <div>
                <label className={`block text-xs lg:text-sm font-medium ${theme === 'dark' ? 'dark:text-[#c7d5ff]' : 'text-gray-900'} px-3 py-2 rounded mb-2`}>
                    Company Name
                </label>
                <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className={`w-full px-3 lg:px-4 py-2 text-sm lg:text-base border border-gray-300 rounded-lg text-gray-900 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark' ? 'bg-[#0c1324] dark:text-[#c7d5ff]' : 'bg-white'}`}
                    placeholder="Enter company name"
                />
            </div>
            <div>
                <label className={`block text-xs lg:text-sm font-medium ${theme === 'dark' ? 'dark:text-[#c7d5ff]' : 'text-gray-900'} px-3 py-2 rounded mb-2`}>
                    Timezone
                </label>
                <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className={`w-full px-3 lg:px-4 py-2 text-sm lg:text-base border border-gray-300 rounded-lg text-gray-900 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent ${theme === 'dark' ? 'bg-[#0c1324] dark:text-[#c7d5ff]' : 'bg-white'}`}
                    >
                    <option value="UTC">UTC</option>
                    <option value="PST">PST (Pacific Standard Time)</option>
                    <option value="EST">EST (Eastern Standard Time)</option>
                    <option value="CET">CET (Central European Time)</option>
                </select>
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
export default GeneralSettings;