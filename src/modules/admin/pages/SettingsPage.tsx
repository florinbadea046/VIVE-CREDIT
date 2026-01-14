import { useState } from 'react';
import GeneralSettings from '../components/GeneralSettings';
import LendingSettings from '../components/LendingSettings';
import NotificationSettings from '../components/NotificationSettings';
import AdminDashboardLayout from '../components/AdminDashboardLayout';
import { useTheme } from '@/context/ThemeContext';

interface SettingsPageProps {}


function SettingsPage({}: SettingsPageProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { theme, toggleTheme:_toogleTheme } = useTheme();
  const sun = theme === 'dark';
  

  const toggleSection = (section: string | null) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  
  return(
    <AdminDashboardLayout>
    <div className="flex flex-col gap-6 p-4 lg:p-6">
          {/* Buttons */}
          <div className="flex flex-row gap-2 w-full">
            <button
              onClick={() => toggleSection('general')}
              className={`flex-1 lg:flex-none px-3 lg:px-4 py-2 rounded-lg font-medium transition text-sm lg:text-base ${
                expandedSection === 'general' 
                  ? 'bg-blue-700 dark:text-[#c7d5ff]' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              General
            </button>
            <button
              onClick={() => toggleSection('lending')}
              className={`flex-1 lg:flex-none px-3 lg:px-4 py-2 rounded-lg font-medium transition text-sm lg:text-base ${
                expandedSection === 'lending' 
                  ? 'bg-blue-700 dark:text-[#c7d5ff]' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Lending
            </button>
            <button
              onClick={() => toggleSection('notification')}
              className={`flex-1 lg:flex-none px-3 lg:px-4 py-2 rounded-lg font-medium transition text-sm lg:text-base ${
                expandedSection === 'notification' 
                  ? 'bg-blue-700 dark:text-[#c7d5ff]' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Notification
            </button>
          </div>

          {/* Components */}
          <div className="w-full">
            {/* General Settings */}
            {expandedSection === 'general' && (
              <div className={`rounded-lg p-4 lg:p-6 w-full lg:max-w-2xl ${sun ? 'bg-gray-800' : 'bg-white'}`} 
              style={{boxShadow:'0 4px 6px rgba(0, 0, 0, 0.5)'}}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-xl font-bold ${sun ? 'dark:text-[#c7d5ff]' : 'text-gray-900'}`}>General Settings</h2>
                  <button
                    onClick={() => toggleSection('general')}
                    className={`text-2xl hover:opacity-70 transition ${sun ? 'text-gray-300' : 'text-gray-500'}`}
                  >
                    ✕
                  </button>
                </div>
                <GeneralSettings />
              </div>
            )}

            {/* Lending Settings */}
            {expandedSection === 'lending' && (
              <div className={`rounded-lg p-4 lg:p-6 w-full lg:max-w-2xl ${sun ? 'bg-gray-800' : 'bg-white'}`} 
              style={{boxShadow:'0 4px 6px rgba(0, 0, 0, 0.5)'}}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-xl font-bold ${sun ? 'dark:text-[#c7d5ff]' : 'text-gray-900'}`}>Lending Settings</h2>
                  <button
                    onClick={() => toggleSection('lending')}
                    className={`text-2xl hover:opacity-70 transition ${sun ? 'text-gray-300' : 'text-gray-500'}`}
                  >
                    ✕
                  </button>
                </div>
                <LendingSettings />
              </div>
            )}

            {/* Notification Settings */}
            {expandedSection === 'notification' && (
              <div className={`rounded-lg p-4 lg:p-6 w-full lg:max-w-2xl ${sun ? 'bg-gray-800' : 'bg-white'}`} 
              style={{boxShadow:'0 4px 6px rgba(0, 0, 0, 0.5)'}}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-xl font-bold ${sun ? 'dark:text-[#c7d5ff]' : 'text-gray-900'}`}>Notification Settings</h2>
                  <button
                    onClick={() => toggleSection('notification')}
                    className={`text-2xl hover:opacity-70 transition ${sun ? 'text-gray-300' : 'text-gray-500'}`}
                  >
                    ✕
                  </button>
                </div>
                <NotificationSettings />
              </div>
            )}

            {/* Empty state when nothing is selected */}
            {!expandedSection && (
              <div className={`rounded-lg p-4 lg:p-6 text-center w-full lg:max-w-2xl ${sun ? 'bg-gray-800 dark:text-[#c7d5ff]' : 'bg-white text-gray-500'}`} 
              style={{boxShadow:'0 4px 6px rgba(0, 0, 0, 0.5)'}}>
                <p className="text-lg">Select a section from the left to view details</p>
              </div>
            )}
          </div>
        </div>
    </AdminDashboardLayout>
      
    
  );
}
export default SettingsPage;
  


  