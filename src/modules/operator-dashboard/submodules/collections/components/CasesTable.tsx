interface Props {
  data: any[];
  onView: (row: any) => void;
  onDocs: (row: any) => void;
  onReminder?: (row: any) => void;
}

// Funcție pentru color coding la hover
const getRowHoverColorClass = (daysLate: number): string => {
  if (daysLate <= 30) {
    return 'hover:bg-green-50 dark:hover:bg-green-900/20';
  }
  if (daysLate <= 60) {
    return 'hover:bg-yellow-50 dark:hover:bg-yellow-900/20';
  }
  return 'hover:bg-red-50 dark:hover:bg-red-900/20';
};

// Funcție pentru culori status
const getStatusColorClass = (status: string): string => {
  const statusLower = status.toLowerCase();
  
  if (statusLower.includes('întârziere') || statusLower.includes('intarziere')) {
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
  }
  if (statusLower.includes('ptp activ')) {
    return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
  }
  if (statusLower.includes('ptp rupt')) {
    return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
  }
  if (statusLower.includes('închis') || statusLower.includes('inchis')) {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
  }
  
  return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
};

export default function CasesTable({ data, onView, onDocs, onReminder }: Props) {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <th className="p-3 text-left text-sm font-semibold text-gray-900 dark:text-white">ID</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Client</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Suma Restanta</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Zile întârziere</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Agent</th>
            <th className="p-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Acțiuni</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr 
              key={row.id} 
              className={`border-b border-gray-200 dark:border-gray-700 transition-colors duration-200 ${getRowHoverColorClass(row.daysLate)}`}
            >
              <td className="p-3 text-sm text-gray-900 dark:text-white">{row.id}</td>
              <td className="p-3 text-sm text-gray-900 dark:text-white">{row.client}</td>
              <td className="p-3 text-sm text-gray-900 dark:text-white font-medium">{row.amount} RON</td>
              <td className="p-3 text-sm text-gray-900 dark:text-white font-semibold">{row.daysLate} zile</td>

              <td className="p-3">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColorClass(row.status)}`}>
                  {row.status}
                </span>
              </td>

              <td className="p-3 text-sm text-gray-900 dark:text-white">{row.agent ?? "N/A"}</td>

              <td className="p-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onView(row)}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View
                  </button>
                
                  <button 
                    onClick={() => onDocs(row)}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Docs
                  </button>

                  {onReminder && (
                    <button 
                      onClick={() => onReminder(row)}
                      className="px-3 py-1.5 bg-blue-500 text-white text-xs font-medium rounded-md hover:bg-blue-600 transition-colors flex items-center gap-1"
                      title="Trimite reminder"
                    >
                      <span>📤</span>
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}