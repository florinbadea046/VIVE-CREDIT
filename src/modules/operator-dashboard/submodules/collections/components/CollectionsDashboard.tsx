import React, { useState } from 'react';
import CasesTable from '../components/CasesTable';
import CaseViewModal from '../components/CaseViewModal';
import DocsModal from '../components/DocsModal';
import ReminderModal from '../components/ReminderModal';
import { mockDB } from '../../../data/mockDB';

const CollectionsDashboard: React.FC = () => {
  const transformMockToCollections = () => {
    return mockDB.map((app, index) => ({
      id: `CL-${index + 1}`,
      client: app.client,
      amount: app.creditAmount,
      daysLate: Math.floor(Math.random() * 90),
      status: app.status === 'approved' ? 'Închis' : 
              app.status === 'rejected' ? 'PTP rupt' :
              app.status === 'manual_review' ? 'În întârziere' : 
              'PTP activ',
      agent: `Agent ${Math.floor(Math.random() * 4) + 1}`,
    }));
  };

  const [allCases] = useState(transformMockToCollections());
  const [filteredCases, setFilteredCases] = useState(allCases);
  
  const [clientFilter, setClientFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [agentFilter, setAgentFilter] = useState('');
  const [daysLateFilter, setDaysLateFilter] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const casesPerPage = 8;

  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);

  React.useEffect(() => {
    let filtered = allCases;

    if (clientFilter) {
      filtered = filtered.filter(c => 
        c.client.toLowerCase().includes(clientFilter.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    if (agentFilter) {
      filtered = filtered.filter(c => c.agent === agentFilter);
    }

    if (daysLateFilter) {
      if (daysLateFilter === '0-30') {
        filtered = filtered.filter(c => c.daysLate >= 0 && c.daysLate <= 30);
      } else if (daysLateFilter === '31-60') {
        filtered = filtered.filter(c => c.daysLate >= 31 && c.daysLate <= 60);
      } else if (daysLateFilter === '60+') {
        filtered = filtered.filter(c => c.daysLate > 60);
      }
    }

    setFilteredCases(filtered);
    setCurrentPage(1);
  }, [clientFilter, statusFilter, agentFilter, daysLateFilter, allCases]);

  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = filteredCases.slice(indexOfFirstCase, indexOfLastCase);
  const totalPages = Math.ceil(filteredCases.length / casesPerPage);

  const handleViewCase = (caseData: any) => {
    setSelectedCase(caseData);
    setIsViewModalOpen(true);
  };

  const handleOpenDocs = (caseData: any) => {
    setSelectedCase(caseData);
    setIsDocsModalOpen(true);
  };

  const handleOpenReminder = (caseData: any) => {
    setSelectedCase(caseData);
    setIsReminderModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Collections Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Gestionare cazuri colectare - Total: {filteredCases.length} cazuri
        </p>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Caută Client / Telefon
            </label>
            <input
              type="text"
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              placeholder="Nume sau telefon..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Zile Întârziere
            </label>
            <select
              value={daysLateFilter}
              onChange={(e) => setDaysLateFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Toate perioadele</option>
              <option value="0-30"> 0-30 zile</option>
              <option value="31-60"> 31-60 zile</option>
              <option value="60+"> 60+ zile</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Stare
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Toate stările</option>
              <option value="În întârziere">În întârziere</option>
              <option value="PTP activ">PTP activ</option>
              <option value="PTP rupt">PTP rupt</option>
              <option value="Închis">Închis</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Agent
            </label>
            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Toți agenții</option>
              <option value="Agent 1">Agent 1</option>
              <option value="Agent 2">Agent 2</option>
              <option value="Agent 3">Agent 3</option>
              <option value="Agent 4">Agent 4</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 mb-6">
        <button
          onClick={() => {
            setClientFilter('');
            setStatusFilter('');
            setAgentFilter('');
            setDaysLateFilter('');
            setCurrentPage(1);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Resetează filtre
        </button>
      </div>

      <CasesTable
        data={currentCases}
        onView={handleViewCase}
        onDocs={handleOpenDocs}
        onReminder={handleOpenReminder}
      />

      {/* Paginare */}

       {totalPages > 1 && (
        <div className="flex justify-center gap-3 p-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg disabled:opacity-40"
          >
            Prev
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}



      {selectedCase && (
        <>
          <CaseViewModal
            open={isViewModalOpen}
            onClose={() => setIsViewModalOpen(false)}
            selectedCase={selectedCase}
          />
          
          <DocsModal
            open={isDocsModalOpen}
            onClose={() => setIsDocsModalOpen(false)}
            selectedCase={selectedCase}
          />

          <ReminderModal
            open={isReminderModalOpen}
            onClose={() => setIsReminderModalOpen(false)}
            selectedCase={selectedCase}
          />
        </>
      )}
    </div>
  );
};

export default CollectionsDashboard;