import {useState} from "react";
import { useTheme } from "@/context/ThemeContext";

interface NotificationSettingsProps {}


function NotificationSettings({}: NotificationSettingsProps) {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const { theme } = useTheme();
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        setIsSaved(true);
        alert('Notification Settings saved successfully!');
        // Revert button color after 3 seconds
        setTimeout(() => setIsSaved(false), 3000);
    };

    const handleCancel = () => {
        setEmailNotifications(true);
        setSmsNotifications(false);
    };

    return (
        <div className="space-y-4 lg:space-y-6">
            <div className={`flex flex-col lg:flex-row items-start lg:items-center justify-between p-3 lg:p-4 rounded-lg gap-3 lg:gap-0
                ${theme === 'dark' ? 'bg-[#0c1324] dark:text-[#c7d5ff]' : 'bg-gray-200'}`}>
                <div className="flex flex-col flex-1">
                    <span className="font-medium  text-sm lg:text-base">Email Notifications</span>
                    <span className=" text-xs lg:text-sm">Primesti actualizari prin email</span>
                </div>
                <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                     className={`w-14 h-8 relative inline-flex items-center rounded-full transition-colors flex-shrink-0 ${emailNotifications ? 'bg-blue-500' : 'bg-gray-300'}`}
                >
                    <span
                        className={`inline-block w-6 h-6 bg-white rounded-full shadow transform transition-transform ${emailNotifications ? 'translate-x-6' : 'translate-x-1'}`}
                    ></span>
                </button>
            </div>
            <div className={`flex flex-col lg:flex-row items-start lg:items-center justify-between p-3 lg:p-4 gap-3 lg:gap-0
            ${theme==='dark' ? 'bg-[#0c1324] dark:text-[#c7d5ff]' : 'bg-gray-200'} rounded-lg`}>
                <div className="flex flex-col flex-1">
                    <span className="font-medium text-sm lg:text-base">Notificari SMS</span>
                    <span className="text-xs lg:text-sm">Primeste alertari prin SMS</span>
                </div>
                <button
                    onClick={() => setSmsNotifications(!smsNotifications)}
                     className={`w-14 h-8 relative inline-flex items-center rounded-full transition-colors flex-shrink-0 ${smsNotifications ? 'bg-blue-500' : 'bg-gray-300'}`}
                >
                    <span
                        className={`inline-block w-6 h-6 bg-white rounded-full shadow transform transition-transform ${smsNotifications ? 'translate-x-6' : 'translate-x-1'}`}
                    ></span>
                </button>
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
export default NotificationSettings;