import React, { useState, useEffect } from 'react';
import type { User } from '../../../types/global';
import { API_ENDPOINTS } from '../../../core/services/api/endpoints';
import { apiClient } from '../../../core/services/api/apiClient';

export const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: ''
    });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const response = await apiClient.get<User[]>(API_ENDPOINTS.USERS.LIST);
            setUsers(response.data || []);
        } catch (error) {
            console.error('Error loading users:', error);
            // Date de exemplu
            setUsers([
                {
                    id: '1',
                    firstName: 'Admin',
                    lastName: 'User',
                    email: 'admin@vivecredit.ro',
                    role: {
                        id: '1',
                        name: 'Administrator',
                        description: 'Full access',
                        permissions: []
                    }
                },
                {
                    id: '2',
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john@vivecredit.ro',
                    role: {
                        id: '2',
                        name: 'Operator',
                        description: 'Basic access',
                        permissions: []
                    }
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingUser(null);
        setFormData({ firstName: '', lastName: '', email: '', role: '' });
        setShowModal(true);
    };

    const handleEdit = (user: User) => {
        setEditingUser(user);
        setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role.id
        });
        setShowModal(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        alert(`User ${editingUser ? 'updated' : 'created'}: ${formData.firstName} ${formData.lastName}`);
        setShowModal(false);
        loadUsers();
    };

    const handleDelete = async (userId: string) => {
        if (!window.confirm('Sigur doriți să ștergeți acest utilizator?')) return;
        alert(`User deleted: ${userId}`);
        loadUsers();
    };

    return (
        <div>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-900'>Utilizatori</h2>
                <button
                    onClick={handleCreate}
                    className='bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200'
                >
                    Adaugă Utilizator
                </button>
            </div>

            {loading && <div className='text-center py-4 text-gray-600'>Se încarcă...</div>}

            {!loading && users.length === 0 && (
                <div className='text-center py-12 bg-gray-50 rounded-lg'>
                    <p className='text-gray-500 text-lg mb-4'>Nu există utilizatori</p>
                    <p className='text-gray-400 text-sm'>Adăugați un utilizator nou pentru a începe</p>
                </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {users.map((user) => (
                    <div key={user.id} className='bg-white rounded-lg shadow p-6'>
                        <div className='flex justify-between items-start mb-4'>
                            <div className='flex items-center space-x-3'>
                                <div className='h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg'>
                                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                                </div>
                                <div>
                                    <h3 className='text-lg font-semibold'>{user.firstName} {user.lastName}</h3>
                                    <p className='text-sm text-gray-500'>{user.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800'>
                                {user.role.name}
                            </span>
                        </div>
                        <div className='flex gap-2'>
                            <button
                                onClick={() => handleEdit(user)}
                                className='flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors'
                            >
                                Editează
                            </button>
                            <button
                                onClick={() => handleDelete(user.id)}
                                className='flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors'
                            >
                                Șterge
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50'>
                    <div className='relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
                        <div className='mt-3'>
                            <h3 className='text-lg leading-6 font-medium text-gray-900 mb-4'>
                                {editingUser ? 'Editează Utilizator' : 'Adaugă Utilizator'}
                            </h3>
                            <form onSubmit={handleSubmit}>
                                <div className='mb-4'>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>Prenume</label>
                                    <input
                                        type='text'
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        required
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>Nume</label>
                                    <input
                                        type='text'
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        required
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                                    <input
                                        type='email'
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        required
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label className='block text-sm font-medium text-gray-700 mb-1'>Rol</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        required
                                    >
                                        <option value=''>Selectează rol</option>
                                        <option value='1'>Administrator</option>
                                        <option value='2'>Operator</option>
                                        <option value='3'>Client</option>
                                    </select>
                                </div>
                                <div className='mt-6 flex justify-end gap-4'>
                                    <button
                                        type='button'
                                        onClick={() => setShowModal(false)}
                                        className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors duration-200'
                                    >
                                        Anulează
                                    </button>
                                    <button
                                        type='submit'
                                        className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200'
                                    >
                                        Salvează
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
