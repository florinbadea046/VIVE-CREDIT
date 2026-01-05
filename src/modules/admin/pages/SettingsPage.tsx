import { useState } from 'react';
import GeneralSettings from '../components/GeneralSettings';
import LendingSettings from '../components/LendingSettings';
import NotificationSettings from '../components/NotificationSettings';

function SettingsPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isDark] = useState(false);

  const toggleSection = (section: string | null) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  
  return(
    <div className="flex-column" style={{ marginLeft: '25px' }}>
          {/* Left: Buttons */}
          <div className="flex flex-row gap-10 w-40" style={{ marginBottom: '20px', marginTop: '20px',marginLeft: '250px' }}>
            <button
              onClick={() => toggleSection('general')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              General
            </button>
            <button
              onClick={() => toggleSection('lending')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Lending
            </button>
            <button
              onClick={() => toggleSection('notification')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Notification
            </button>
          </div>

          {/* Right: Components */}
          <div className="flex-1" style={{ marginLeft: '250px' }}>
            {/* General Settings */}
            {expandedSection === 'general' && (
              <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`} style={{width:'700px'}}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>General Settings</h2>
                  <button
                    onClick={() => toggleSection('general')}
                    className={`text-2xl hover:opacity-70 transition ${isDark ? 'text-gray-300' : 'text-gray-500'}`}
                  >
                    ✕
                  </button>
                </div>
                <GeneralSettings isDark={isDark} />
              </div>
            )}

            {/* Lending Settings */}
            {expandedSection === 'lending' && (
              <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`} style={{width:'700px'}}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Lending Settings</h2>
                  <button
                    onClick={() => toggleSection('lending')}
                    className={`text-2xl hover:opacity-70 transition ${isDark ? 'text-gray-300' : 'text-gray-500'}`}
                  >
                    ✕
                  </button>
                </div>
                <LendingSettings isDark={isDark} />
              </div>
            )}

            {/* Notification Settings */}
            {expandedSection === 'notification' && (
              <div className={`rounded-lg p-6 ${isDark ? 'bg-gray-800' : 'bg-white'}`} style={{width:'700px'}}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Notification Settings</h2>
                  <button
                    onClick={() => toggleSection('notification')}
                    className={`text-2xl hover:opacity-70 transition ${isDark ? 'text-gray-300' : 'text-gray-500'}`}
                  >
                    ✕
                  </button>
                </div>
                <NotificationSettings />
              </div>
            )}

            {/* Empty state when nothing is selected */}
            {!expandedSection && (
              <div className={`rounded-lg p-6  text-center ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-500'}`} style={{width:'700px'}}>
                <p className="text-lg">Select a section from the left to view details</p>
              </div>
            )}
          </div>
        </div>
      
    
  );
}
export default SettingsPage;
  


  