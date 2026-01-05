import {useState} from "react";



function NotificationSettings() {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);

    const handleSave = () => {
        alert('Notification Settings saved successfully!');
    };

    const handleCancel = () => {
        setEmailNotifications(true);
        setSmsNotifications(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col">
                    <span className="font-medium text-gray-900">Email Notifications</span>
                    <span className="text-gray-500 text-sm">Primesti actualizari prin email</span>
                </div>
                <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                     className={`w-14 h-8 relative inline-flex items-center rounded-full transition-colors ${emailNotifications ? 'bg-blue-500' : 'bg-gray-300'}`}
                >
                    <span
                        className={`inline-block w-6 h-6 bg-white rounded-full shadow transform transition-transform ${emailNotifications ? 'translate-x-6' : 'translate-x-1'}`}
                    ></span>
                </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-col">
                    <span className="font-medium text-gray-900">Notificari SMS</span>
                    <span className="text-gray-500 text-sm">Primeste alertari prin SMS</span>
                </div>
                <button
                    onClick={() => setSmsNotifications(!smsNotifications)}
                     className={`w-14 h-8 relative inline-flex items-center rounded-full transition-colors ${smsNotifications ? 'bg-blue-500' : 'bg-gray-300'}`}
                >
                    <span
                        className={`inline-block w-6 h-6 bg-white rounded-full shadow transform transition-transform ${smsNotifications ? 'translate-x-6' : 'translate-x-1'}`}
                    ></span>
                </button>
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
export default NotificationSettings;