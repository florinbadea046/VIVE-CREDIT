import React, { useState } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  selectedCase: any;
}

function ReminderModal({ open, onClose, selectedCase }: Props) {
  const [reminderType, setReminderType] = useState<'sms' | 'email' | 'both'>('sms');
  const [customMessage, setCustomMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const getDefaultMessage = () => {
    const client = selectedCase?.client || 'Client';
    const amount = selectedCase?.amount || 0;
    const daysLate = selectedCase?.daysLate || 0;

    return `Bună ziua ${client},

Vă contactăm în legătură cu suma restantă de ${amount} RON, aflată în întârziere de ${daysLate} zile.

Vă rugăm să regularizați situația în cel mai scurt timp posibil.

Pentru detalii, vă rugăm să ne contactați.

Cu respect,
Echipa VIVE-CREDIT`;
  };

  React.useEffect(() => {
    if (open && selectedCase) {
      setCustomMessage(getDefaultMessage());
    }
  }, [open, selectedCase]);

  const handleSendReminder = async () => {
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert(`✅ Reminder trimis cu succes către ${selectedCase.client} prin ${
      reminderType === 'sms' ? 'SMS' : 
      reminderType === 'email' ? 'Email' : 
      'SMS și Email'
    }!`);
    
    setIsSending(false);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Trimite Reminder - {selectedCase?.client}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Info caz */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">ID Caz:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{selectedCase?.id}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Suma restantă:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{selectedCase?.amount} RON</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Zile întârziere:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{selectedCase?.daysLate} zile</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Status:</span>
                <span className="ml-2 text-gray-900 dark:text-white">{selectedCase?.status}</span>
              </div>
            </div>
          </div>

          {/* Tip reminder */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Tip Reminder
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setReminderType('sms')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition ${
                  reminderType === 'sms'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                📱 SMS
              </button>
              <button
                onClick={() => setReminderType('email')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition ${
                  reminderType === 'email'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                ✉️ Email
              </button>
              <button
                onClick={() => setReminderType('both')}
                className={`flex-1 py-3 px-4 rounded-lg border-2 transition ${
                  reminderType === 'both'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                📧 Ambele
              </button>
            </div>
          </div>

          {/* Mesaj */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mesaj Reminder
            </label>
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={10}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Introdu mesajul reminder..."
            />
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Caractere: {customMessage.length}
            </p>
          </div>

          {/* Buton Reset */}
          <div>
            <button
              onClick={() => setCustomMessage(getDefaultMessage())}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              🔄 Resetează la template implicit
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            disabled={isSending}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 
                     rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50"
          >
            Anulează
          </button>
          <button
            onClick={handleSendReminder}
            disabled={isSending || !customMessage.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                     transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSending ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Se trimite...
              </>
            ) : (
              <>📤 Trimite Reminder</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReminderModal;