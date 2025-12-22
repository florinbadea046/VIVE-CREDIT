import React, { useState, useMemo } from 'react';
import { Search, Users, UserCheck, UserX, Mail, Phone, Eye, X, Edit2 } from 'lucide-react';

interface Client {
  id: number;
  nume: string;
  email: string;
  telefon: string;
  statusKYC: 'Verified' | 'Pending' | 'Rejected' | 'Activ' | 'Inactiv';
  activ: boolean;
  dataInregistrare: string;
  actiuni: string;
}

const initialClients: Client[] = [
  {
    id: 1,
    nume: 'Ion Popescu',
    email: 'ion.popescu@email.com',
    telefon: '+40 702 345 678',
    statusKYC: 'Verified',
    activ: true,
    dataInregistrare: '15.12.2024',
    actiuni: 'Ultima actualizare: 15.12.2024'
  },
  {
    id: 2,
    nume: 'Maria Ionescu',
    email: 'maria.ionescu@email.com',
    telefon: '+40 723 456 789',
    statusKYC: 'Activ',
    activ: true,
    dataInregistrare: '14.12.2024',
    actiuni: 'Ultima actualizare: 14.12.2024'
  },
  {
    id: 3,
    nume: 'Andrei Gheorghe',
    email: 'andrei.gheorghe@email.com',
    telefon: '+40 734 567 890',
    statusKYC: 'Pending',
    activ: false,
    dataInregistrare: '13.12.2024',
    actiuni: 'Ultima actualizare: 13.12.2024'
  },
  {
    id: 4,
    nume: 'Elena Dumitrescu',
    email: 'elena.dumitrescu@email.com',
    telefon: '+40 745 678 901',
    statusKYC: 'Activ',
    activ: true,
    dataInregistrare: '12.12.2024',
    actiuni: 'Ultima actualizare: 12.12.2024'
  },
  {
    id: 5,
    nume: 'Mihai Stanciu',
    email: 'mihai.stanciu@email.com',
    telefon: '+40 756 789 012',
    statusKYC: 'Inactiv',
    activ: false,
    dataInregistrare: '10.12.2024',
    actiuni: 'Ultima actualizare: 10.12.2024'
  },
  {
    id: 6,
    nume: 'Ana Popa',
    email: 'ana.popa@email.com',
    telefon: '+40 767 890 123',
    statusKYC: 'Verified',
    activ: true,
    dataInregistrare: '09.12.2024',
    actiuni: 'Ultima actualizare: 09.12.2024'
  },
  {
    id: 7,
    nume: 'Constantin Radu',
    email: 'constantin.radu@email.com',
    telefon: '+40 778 901 234',
    statusKYC: 'Pending',
    activ: false,
    dataInregistrare: '08.12.2024',
    actiuni: 'Ultima actualizare: 08.12.2024'
  },
  {
    id: 8,
    nume: 'Cristina Marin',
    email: 'cristina.marin@email.com',
    telefon: '+40 789 012 345',
    statusKYC: 'Activ',
    activ: true,
    dataInregistrare: '07.12.2024',
    actiuni: 'Ultima actualizare: 07.12.2024'
  }
];

const ITEMS_PER_PAGE = 5;

const ClientManagementPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('Toate');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Form state
  const [editForm, setEditForm] = useState({
    nume: '',
    email: '',
    telefon: '',
    statusKYC: 'Activ' as Client['statusKYC'],
    activ: true
  });

  const stats = useMemo(() => {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const clientiNoi = clients.filter(c => {
      const clientDate = new Date(c.dataInregistrare.split('.').reverse().join('-'));
      return clientDate >= sevenDaysAgo;
    }).length;

    return {
      total: clients.length,
      activi: clients.filter(c => c.activ).length,
      inactivi: clients.filter(c => !c.activ).length,
      noi: clientiNoi
    };
  }, [clients]);

  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const matchesSearch = 
        client.nume.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.telefon.includes(searchTerm);

      let matchesFilter = false;
      
      if (filterStatus === 'Toate') {
        matchesFilter = true;
      } else if (filterStatus === 'Activi') {
        matchesFilter = client.activ;
      } else if (filterStatus === 'Inactivi') {
        matchesFilter = !client.activ;
      } else if (filterStatus === 'Verificat') {
        matchesFilter = client.statusKYC === 'Verified';
      } else if (filterStatus === 'În așteptare') {
        matchesFilter = client.statusKYC === 'Pending';
      } else if (filterStatus === 'Noi') {
        const today = new Date();
        const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const clientDate = new Date(client.dataInregistrare.split('.').reverse().join('-'));
        matchesFilter = clientDate >= sevenDaysAgo;
      }

      return matchesSearch && matchesFilter;
    });
  }, [clients, searchTerm, filterStatus]);

  const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE);
  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredClients.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredClients, currentPage]);

  const getKYCBadge = (status: Client['statusKYC']) => {
    const badges = {
      'Verified': { color: '#10B981', bg: '#D1FAE5', text: 'Verificat' },
      'Pending': { color: '#F59E0B', bg: '#FEF3C7', text: 'În așteptare' },
      'Rejected': { color: '#EF4444', bg: '#FEE2E2', text: 'Respins' },
      'Activ': { color: '#10B981', bg: '#D1FAE5', text: 'Activ' },
      'Inactiv': { color: '#6B7280', bg: '#F3F4F6', text: 'Inactiv' }
    };

    const badge = badges[status] || badges['Pending'];

    return (
      <span 
        className="px-3 py-1.5 rounded-md text-sm font-medium"
        style={{ 
          backgroundColor: badge.bg,
          color: badge.color
        }}
      >
        {badge.text}
      </span>
    );
  };

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setEditForm({
      nume: client.nume,
      email: client.email,
      telefon: client.telefon,
      statusKYC: client.statusKYC,
      activ: client.activ
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedClient(null);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!selectedClient) return;
    
    setClients(prevClients => 
      prevClients.map(client => 
        client.id === selectedClient.id 
          ? { ...client, ...editForm, actiuni: `Ultima actualizare: ${new Date().toLocaleDateString('ro-RO')}` }
          : client
      )
    );
    
    alert(`Client ${editForm.nume} actualizat cu succes!`);
    setIsEditing(false);
    closeModal();
  };

  const handleCancel = () => {
    if (selectedClient) {
      setEditForm({
        nume: selectedClient.nume,
        email: selectedClient.email,
        telefon: selectedClient.telefon,
        statusKYC: selectedClient.statusKYC,
        activ: selectedClient.activ
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-blue-500 dark:text-blue-400 mb-2">
            Management Clienți
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gestionare informații clienți
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { icon: <Users size={28} />, iconColor: '#5B68DF', label: 'Total clienți', value: stats.total, filter: 'Toate' },
            { icon: <UserCheck size={28} />, iconColor: '#EC4899', label: 'Clienți activi', value: stats.activi, filter: 'Activi' },
            { icon: <UserX size={28} />, iconColor: '#06B6D4', label: 'Clienți inactivi', value: stats.inactivi, filter: 'Inactivi' },
            { icon: <Mail size={28} />, iconColor: '#10B981', label: 'Clienți noi', value: stats.noi, filter: 'Noi' }
          ].map((stat, idx) => (
            <div 
              key={idx} 
              onClick={() => setFilterStatus(stat.filter)}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-105"
            >
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{
                  backgroundColor: `${stat.iconColor}20`,
                  color: stat.iconColor
                }}
              >
                {stat.icon}
              </div>
              <div className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                {stat.label}
              </div>
              <div className="text-3xl font-semibold text-gray-900 dark:text-white">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Controls */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search 
                  className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" 
                  size={20} 
                />
                <input
                  type="text"
                  placeholder="Caută după nume sau email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {['Toate', 'Activi', 'Inactivi', 'Verificat', 'În așteptare'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filterStatus === status
                        ? 'bg-blue-500 dark:bg-blue-600 text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    {status}
                  </button>
                ))}
                
                {(searchTerm || filterStatus !== 'Toate') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterStatus('Toate');
                    }}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                  >
                    Resetare filtre
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Table - Desktop */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Nume</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Email</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Telefon</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status KYC</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {paginatedClients.length > 0 ? (
                  paginatedClients.map((client) => (
                    <tr 
                      key={client.id}
                      onClick={() => handleViewClient(client)}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500 dark:bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
                            {client.nume.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-gray-900 dark:text-white font-medium">{client.nume}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{client.email}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{client.telefon}</td>
                      <td className="px-6 py-4">{getKYCBadge(client.statusKYC)}</td>
                      <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={() => handleViewClient(client)}
                          className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                      Nu au fost găsiți clienți
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Cards - Mobile */}
          <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedClients.length > 0 ? (
              paginatedClients.map((client) => (
                <div 
                  key={client.id} 
                  onClick={() => handleViewClient(client)}
                  className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-blue-500 dark:bg-blue-600 text-white flex items-center justify-center font-semibold">
                      {client.nume.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 dark:text-white font-semibold">{client.nume}</h3>
                      {getKYCBadge(client.statusKYC)}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Email:</span>
                      <span className="text-gray-900 dark:text-white">{client.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Telefon:</span>
                      <span className="text-gray-900 dark:text-white">{client.telefon}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                Nu au fost găsiți clienți
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-center gap-3">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50'
                }`}
              >
                Prev
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal - UPDATED */}
      {showModal && selectedClient && (
        <div 
          onClick={closeModal}
          className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[85vh] flex flex-col relative"
          >
            {/* HEADER FIXED */}
            <div className="flex-shrink-0 p-6 pb-4 border-b border-gray-200 dark:border-gray-700 relative">
              {/* X BUTTON FIXED */}
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors z-10"
              >
                <X size={20} />
              </button>

              {/* AVATAR + NUME + BADGE */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-blue-500 dark:bg-blue-600 text-white flex items-center justify-center font-semibold text-2xl mx-auto mb-4">
                  {editForm.nume.split(' ').map(n => n[0]).join('')}
                </div>
                
                {!isEditing ? (
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {selectedClient.nume}
                    </h2>
                    {getKYCBadge(selectedClient.statusKYC)}
                  </div>
                ) : (
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    Editează Client
                  </h2>
                )}
              </div>
            </div>

            {/* SCROLLABLE CONTENT */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {!isEditing ? (
                <div className="space-y-4">
                  {[
                    { icon: <Users size={20} />, label: 'Nume', value: selectedClient.nume },
                    { icon: <Mail size={20} />, label: 'Email', value: selectedClient.email },
                    { icon: <Phone size={20} />, label: 'Telefon', value: selectedClient.telefon },
                    { icon: <UserCheck size={20} />, label: 'Status', value: selectedClient.activ ? 'Activ' : 'Inactiv' },
                    { icon: <Mail size={20} />, label: 'Data înregistrare', value: selectedClient.dataInregistrare },
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div className="text-blue-500 dark:text-blue-400 mt-1">{item.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-1">
                          {item.label}
                        </div>
                        <div className="text-gray-900 dark:text-white font-medium break-words">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nume complet
                    </label>
                    <input
                      type="text"
                      value={editForm.nume}
                      onChange={(e) => setEditForm({...editForm, nume: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={editForm.telefon}
                      onChange={(e) => setEditForm({...editForm, telefon: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status KYC
                    </label>
                    <select
                      value={editForm.statusKYC}
                      onChange={(e) => setEditForm({...editForm, statusKYC: e.target.value as Client['statusKYC']})}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Verified">Verificat</option>
                      <option value="Pending">În așteptare</option>
                      <option value="Rejected">Respins</option>
                      <option value="Activ">Activ</option>
                      <option value="Inactiv">Inactiv</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="activ"
                      checked={editForm.activ}
                      onChange={(e) => setEditForm({...editForm, activ: e.target.checked})}
                      className="w-5 h-5 text-blue-500 border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="activ" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Client activ
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* FOOTER FIXED */}
            <div className="flex-shrink-0 flex gap-3 p-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              {!isEditing ? (
                <>
                  <button 
                    onClick={closeModal}
                    className="flex-1 px-6 py-3 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Închide
                  </button>
                  <button 
                    onClick={handleEdit}
                    className="flex-1 px-6 py-3 rounded-lg font-medium bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit2 size={18} />
                    Editează client
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleCancel}
                    className="flex-1 px-6 py-3 rounded-lg font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Anulează
                  </button>
                  <button 
                    onClick={handleSave}
                    className="flex-1 px-6 py-3 rounded-lg font-medium bg-green-500 dark:bg-green-600 text-white hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
                  >
                    Salvează
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagementPage;