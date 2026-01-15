import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApplications } from "../../hooks/ApplicationsContext";

interface Application {
  id: number;
  name: string;
  amount: string;
  date: string;
  status: 'nou' | 'in-lucru' | 'aprobat' | 'respins';
  phone?: string;
  email?: string;
  cnp?: string;
  address?: string;
}

const ApplicationsTable = () => {
  // ✅ Citește din Context
  const { applications: contextApps, updateStatus: updateContextStatus } = useApplications();

  const [selectedStatus, setSelectedStatus] = useState<string>('toate');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  
  // ✅ TRANSFORMĂ datele din Context în format local - NU mai e useState
  const applications = useMemo(() => 
    contextApps.map((app, index) => ({
      id: index + 1,
      name: app.client,
      amount: `${app.creditAmount} RON`,
      date: new Date().toLocaleDateString('ro-RO'),
      status: app.status === 'manual_review' ? 'in-lucru' as const : 
              app.status === 'pending' ? 'nou' as const :
              app.status === 'approved' ? 'aprobat' as const : 
              app.status === 'rejected' ? 'respins' as const : 'nou' as const,
      phone: app.contact?.phone,
      email: app.contact?.email,
      cnp: undefined,
      address: undefined,
    })),
    [contextApps] // ✅ Re-calculează când contextApps se schimbă
  );

  const statusColors = {
    'nou': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    'in-lucru': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    'aprobat': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    'respins': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
  };

  const statusLabels = {
    'nou': 'Nou',
    'in-lucru': 'În lucru',
    'aprobat': 'Aprobat',
    'respins': 'Respins'
  };

  const filteredApplications = applications.filter(app => {
    if (selectedStatus === 'toate') return true;
    return app.status === selectedStatus;
  });

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentApplications = filteredApplications.slice(startIndex, endIndex);

  React.useEffect(() => {
    setCurrentPage(1);
    setSelectedIds([]);
    setShowCheckboxes(false);
  }, [selectedStatus]);

  const toggleSelection = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (showCheckboxes && selectedIds.length === currentApplications.length) {
      setSelectedIds([]);
    } else {
      setShowCheckboxes(true);
      setSelectedIds(currentApplications.map(app => app.id));
    }
  };

  const toggleCheckboxMode = () => {
    if (showCheckboxes) {
      setShowCheckboxes(false);
      setSelectedIds([]);
    } else {
      setShowCheckboxes(true);
    }
  };

  const openClientDetails = (app: Application) => {
    setSelectedClient(app);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedClient(null), 300);
  };

  const selectedApps = applications.filter(app => selectedIds.includes(app.id));
  const canApprove = selectedApps.some(app => app.status === 'nou' || app.status === 'in-lucru');
  const canReject = selectedApps.some(app => app.status === 'nou' || app.status === 'in-lucru');
  const canReview = selectedApps.some(app => app.status === 'in-lucru');

  // ✅ Funcții bulk - folosesc DOAR Context
  const handleBulkApprove = () => {
    if (selectedIds.length === 0) {
      alert('Selectează cel puțin o aplicație');
      return;
    }
    
    const eligibleIds = selectedIds.filter(id => {
      const app = applications.find(a => a.id === id);
      return app && (app.status === 'nou' || app.status === 'in-lucru');
    });

    if (eligibleIds.length === 0) {
      alert('Nicio aplicație selectată nu poate fi aprobată');
      return;
    }
    
    if (confirm(`Ești sigur că vrei să aprobi ${eligibleIds.length} aplicații?`)) {
      eligibleIds.forEach(id => {
        const originalApp = contextApps[id - 1];
        if (originalApp?.id) {
          updateContextStatus(originalApp.id, 'approved');
        }
      });
      
      setSelectedIds([]);
      setShowCheckboxes(false);
      alert(`${eligibleIds.length} aplicații au fost aprobate!`);
    }
  };

  const handleBulkReject = () => {
    if (selectedIds.length === 0) {
      alert('Selectează cel puțin o aplicație');
      return;
    }
    
    const eligibleIds = selectedIds.filter(id => {
      const app = applications.find(a => a.id === id);
      return app && (app.status === 'nou' || app.status === 'in-lucru');
    });

    if (eligibleIds.length === 0) {
      alert('Nicio aplicație selectată nu poate fi respinsă');
      return;
    }
    
    if (confirm(`Ești sigur că vrei să respingi ${eligibleIds.length} aplicații?`)) {
      eligibleIds.forEach(id => {
        const originalApp = contextApps[id - 1];
        if (originalApp?.id) {
          updateContextStatus(originalApp.id, 'rejected');
        }
      });
      
      setSelectedIds([]);
      setShowCheckboxes(false);
      alert(`${eligibleIds.length} aplicații au fost respinse!`);
    }
  };

  const handleBulkReview = () => {
    if (selectedIds.length === 0) {
      alert('Selectează cel puțin o aplicație');
      return;
    }
    
    const eligibleIds = selectedIds.filter(id => {
      const app = applications.find(a => a.id === id);
      return app && app.status === 'in-lucru';
    });

    if (eligibleIds.length === 0) {
      alert('Nicio aplicație selectată nu poate fi revizuită');
      return;
    }
    
    if (confirm(`Ești sigur că vrei să revizuiești ${eligibleIds.length} aplicații?`)) {
      eligibleIds.forEach(id => {
        const originalApp = contextApps[id - 1];
        if (originalApp?.id) {
          updateContextStatus(originalApp.id, 'pending');
        }
      });
      
      setSelectedIds([]);
      setShowCheckboxes(false);
      alert(`${eligibleIds.length} aplicații au fost trimise la revizuire!`);
    }
  };

  // ✅ Funcții individuale - folosesc DOAR Context
  const handleApprove = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const originalApp = contextApps[id - 1];
    if (originalApp?.id) {
      updateContextStatus(originalApp.id, 'approved');
    }
  };

  const handleReject = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const originalApp = contextApps[id - 1];
    if (originalApp?.id) {
      updateContextStatus(originalApp.id, 'rejected');
    }
  };

  const handleReturnToReview = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const originalApp = contextApps[id - 1];
    if (originalApp?.id) {
      updateContextStatus(originalApp.id, 'pending');
    }
  };

  const resetFilters = () => {
    setSelectedStatus('toate');
    setSelectedIds([]);
    setShowCheckboxes(false);
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      setSelectedIds([]);
      setShowCheckboxes(false);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      setSelectedIds([]);
      setShowCheckboxes(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 p-4 sm:p-6 lg:p-8">
      <Card className="bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Tabel Aplicații</h1>

          {/* Filtru Status */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-4 sm:mb-6">
            <div className="flex-1">
              <label className="text-gray-900 dark:text-white text-sm font-medium mb-2 block">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600 text-gray-900 dark:text-white w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-700 border-gray-300 dark:border-slate-600">
                  <SelectItem value="toate" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-600">Toate</SelectItem>
                  <SelectItem value="nou" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-600">Nou</SelectItem>
                  <SelectItem value="in-lucru" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-600">În lucru</SelectItem>
                  <SelectItem value="aprobat" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-600">Aprobat</SelectItem>
                  <SelectItem value="respins" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-slate-600">Respins</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={resetFilters}
              className="bg-blue-600 hover:bg-blue-700 text-white sm:mt-6 w-full sm:w-auto"
            >
              Resetează filtre
            </Button>
          </div>

          {/* Acțiuni în masă */}
          {selectedIds.length > 0 && (
            <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-lg mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-gray-200 dark:border-slate-600">
              <div className="flex items-center gap-4">
                <span className="text-gray-900 dark:text-white font-medium">
                  {selectedIds.length} selectate
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                {canApprove && (
                  <Button 
                    onClick={handleBulkApprove}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex-1 sm:flex-none"
                    size="sm"
                  >
                    Aprobă
                  </Button>
                )}
                {canReject && (
                  <Button 
                    onClick={handleBulkReject}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex-1 sm:flex-none"
                    size="sm"
                  >
                    Respinge
                  </Button>
                )}
                {canReview && (
                  <Button 
                    onClick={handleBulkReview}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex-1 sm:flex-none"
                    size="sm"
                  >
                    Revizuiește
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Tabel - Desktop */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th className="text-left p-4 text-gray-600 dark:text-slate-300 font-medium w-12">
                    <Checkbox 
                      checked={showCheckboxes && selectedIds.length === currentApplications.length && currentApplications.length > 0}
                      onCheckedChange={toggleSelectAll}
                      onClick={toggleCheckboxMode}
                      className="border-gray-400 dark:border-white data-[state=checked]:bg-blue-600"
                    />
                  </th>
                  <th className="text-left p-4 text-gray-600 dark:text-slate-300 font-medium">Nume</th>
                  <th className="text-left p-4 text-gray-600 dark:text-slate-300 font-medium">Sumă</th>
                  <th className="text-left p-4 text-gray-600 dark:text-slate-300 font-medium">Data</th>
                  <th className="text-left p-4 text-gray-600 dark:text-slate-300 font-medium">Status</th>
                  <th className="text-left p-4 text-gray-600 dark:text-slate-300 font-medium">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {currentApplications.map((app) => {
                  const isNew = app.status === 'nou';
                  const isInProgress = app.status === 'in-lucru';
                  
                  return (
                    <tr 
                      key={app.id} 
                      onClick={() => openClientDetails(app)}
                      className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/30 cursor-pointer transition-colors"
                    >
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        {showCheckboxes && (
                          <Checkbox 
                            checked={selectedIds.includes(app.id)}
                            onCheckedChange={() => toggleSelection(app.id, {} as React.MouseEvent)}
                            onClick={(e) => e.stopPropagation()}
                            className="border-gray-400 dark:border-white data-[state=checked]:bg-blue-600"
                          />
                        )}
                      </td>
                      <td className="p-4 text-gray-900 dark:text-white font-medium">{app.name}</td>
                      <td className="p-4 text-gray-900 dark:text-white">{app.amount}</td>
                      <td className="p-4 text-gray-900 dark:text-white">{app.date}</td>
                      <td className="p-4">
                        <span className={`${statusColors[app.status]} px-4 py-2 rounded-full text-sm font-medium inline-block`}>
                          {statusLabels[app.status]}
                        </span>
                      </td>
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex gap-2">
                          {(isNew || isInProgress) && (
                            <>
                              <Button 
                                onClick={(e) => handleApprove(app.id, e)}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                size="sm"
                              >
                                Aprobă
                              </Button>
                              <Button 
                                onClick={(e) => handleReject(app.id, e)}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                size="sm"
                              >
                                Respinge
                              </Button>
                            </>
                          )}
                          {isInProgress && (
                            <Button 
                              onClick={(e) => handleReturnToReview(app.id, e)}
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                              size="sm"
                            >
                              Revizuiește
                            </Button>
                          )}
                          <Button 
                            onClick={(e) => {
                              e.stopPropagation();
                              openClientDetails(app);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            size="sm"
                          >
                            Detalii
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Cards - Mobile/Tablet */}
          <div className="lg:hidden space-y-4">
            {/* Select All Checkbox */}
            <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-lg flex items-center gap-3 border border-gray-200 dark:border-slate-600">
              <Checkbox 
                checked={showCheckboxes && selectedIds.length === currentApplications.length && currentApplications.length > 0}
                onCheckedChange={toggleSelectAll}
                onClick={toggleCheckboxMode}
                className="border-gray-400 dark:border-white data-[state=checked]:bg-blue-600"
              />
              <span className="text-gray-900 dark:text-white font-medium">Selectează toate</span>
            </div>

            {currentApplications.map((app) => {
              const isNew = app.status === 'nou';
              const isInProgress = app.status === 'in-lucru';
              
              return (
                <div 
                  key={app.id} 
                  onClick={() => openClientDetails(app)}
                  className="bg-white dark:bg-slate-700 rounded-lg p-4 space-y-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-650 transition-colors border border-gray-200 dark:border-slate-600 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      {showCheckboxes && (
                        <Checkbox 
                          checked={selectedIds.includes(app.id)}
                          onCheckedChange={() => toggleSelection(app.id, {} as React.MouseEvent)}
                          onClick={(e) => e.stopPropagation()}
                          className="border-gray-400 dark:border-white data-[state=checked]:bg-blue-600 mt-1"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-gray-900 dark:text-white font-semibold text-lg">{app.name}</h3>
                        <p className="text-gray-600 dark:text-slate-300 text-sm">{app.amount}</p>
                      </div>
                    </div>
                    <span className={`${statusColors[app.status]} px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap`}>
                      {statusLabels[app.status]}
                    </span>
                  </div>
                  
                  <div className="text-gray-600 dark:text-slate-300 text-sm">
                    <span className="font-medium">Data:</span> {app.date}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2" onClick={(e) => e.stopPropagation()}>
                    {(isNew || isInProgress) && (
                      <>
                        <Button 
                          onClick={(e) => handleApprove(app.id, e)}
                          className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                          size="sm"
                        >
                          Aprobă
                        </Button>
                        <Button 
                          onClick={(e) => handleReject(app.id, e)}
                          className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                          size="sm"
                        >
                          Respinge
                        </Button>
                      </>
                    )}
                    {isInProgress && (
                      <Button 
                        onClick={(e) => handleReturnToReview(app.id, e)}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                        size="sm"
                      >
                        Revizuiește
                      </Button>
                    )}
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        openClientDetails(app);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                      size="sm"
                    >
                      Detalii
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Paginare */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="text-gray-600 dark:text-slate-400 text-sm">
              Pagina {currentPage} din {totalPages} ({filteredApplications.length} total)
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Prev
              </Button>
              <Button 
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal Custom - Responsive */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-4 sm:p-6 flex items-center justify-between z-10">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Detalii Client</h2>
              <button
                onClick={closeModal}
                className="bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 p-2 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-900 dark:text-white" />
              </button>
            </div>

            {/* Content */}
            {selectedClient && (
              <div className="p-4 sm:p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="text-gray-600 dark:text-slate-400 text-sm font-medium">Nume complet</label>
                    <p className="text-gray-900 dark:text-white text-base sm:text-lg font-semibold">{selectedClient.name}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-600 dark:text-slate-400 text-sm font-medium">Status</label>
                    <div className="flex items-center">
                      <span className={`${statusColors[selectedClient.status]} px-3 py-1 rounded-full text-xs font-medium inline-block`}>
                        {statusLabels[selectedClient.status]}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-600 dark:text-slate-400 text-sm font-medium">Sumă solicitată</label>
                    <p className="text-gray-900 dark:text-white text-base sm:text-lg font-semibold">{selectedClient.amount}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-600 dark:text-slate-400 text-sm font-medium">Data aplicației</label>
                    <p className="text-gray-900 dark:text-white text-base sm:text-lg">{selectedClient.date}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-600 dark:text-slate-400 text-sm font-medium">Telefon</label>
                    <p className="text-gray-900 dark:text-white text-base sm:text-lg">{selectedClient.phone}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-600 dark:text-slate-400 text-sm font-medium">Email</label>
                    <p className="text-gray-900 dark:text-white text-base sm:text-lg break-all">{selectedClient.email}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-gray-600 dark:text-slate-400 text-sm font-medium">CNP</label>
                    <p className="text-gray-900 dark:text-white text-base sm:text-lg font-mono">{selectedClient.cnp}</p>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-gray-600 dark:text-slate-400 text-sm font-medium">Adresă</label>
                    <p className="text-gray-900 dark:text-white text-base sm:text-lg">{selectedClient.address}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-slate-700">
                  {(selectedClient.status === 'nou' || selectedClient.status === 'in-lucru') && (
                    <>
                      <Button 
                        onClick={() => {
                          handleApprove(selectedClient.id);
                          closeModal();
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                      >
                        Aprobă
                      </Button>
                      <Button 
                        onClick={() => {
                          handleReject(selectedClient.id);
                          closeModal();
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                      >
                        Respinge
                      </Button>
                    </>
                  )}
                  {selectedClient.status === 'in-lucru' && (
                    <Button 
                      onClick={() => {
                        handleReturnToReview(selectedClient.id);
                        closeModal();
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                    >
                      Revizuiește
                    </Button>
                  )}
                  <Button 
                    onClick={closeModal}
                    className="bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-900 dark:text-white flex-1"
                  >
                    Închide
                  </Button>

                  
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsTable;
