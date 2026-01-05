import {useState} from "react";

interface GeneralSettingsProps {
    isDark: boolean;
}

function GeneralSettings({ isDark }: GeneralSettingsProps) {
    const [companyName, setCompanyName] = useState('');
    const [timezone, setTimezone] = useState('UTC');
    const handleSave = () => {
        alert('General Settings saved successfully!');
    };

    const handleCancel = () => {
        setCompanyName('');
        setTimezone('UTC');
    };
    
    

    return (
        <div className="space-y-6">
            <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} px-3 py-2 rounded mb-2`}>
                    Company Name
                </label>
                <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter company name"
                />
            </div>
            <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'} px-3 py-2 rounded mb-2`}>
                    Timezone
                </label>
                <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                    <option value="UTC">UTC</option>
                    <option value="PST">PST (Pacific Standard Time)</option>
                    <option value="EST">EST (Eastern Standard Time)</option>
                    <option value="CET">CET (Central European Time)</option>
                </select>
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
export default GeneralSettings;