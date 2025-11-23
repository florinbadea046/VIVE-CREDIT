import React, {useState, useEffect} from 'react';
import {Link,} from 'react-router-dom';

export const Header: React.FC = () => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showAdminMenu, setShowAdminMenu] = useState(false);
    const [showConfigMenu, setShowConfigMenu] = useState(false);
    const [showOperationsMenu, setShowOperationsMenu] = useState(false);
    const [showServicesMenu, setShowServicesMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    
    const [closeTimeout, setCloseTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
    
    const user = {
        firstName:'Admin',
        lastName:'User',
        email:'admin@vivecredit.ro'
    };
    
    useEffect(() => {
        const handleClickOutside = () => {
            setShowAdminMenu(false);
            setShowUserMenu(false);
            setShowConfigMenu(false);
            setShowOperationsMenu(false);
            setShowServicesMenu(false);
        }
        if (showAdminMenu || showUserMenu || showConfigMenu || showOperationsMenu || showServicesMenu)
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showAdminMenu, showUserMenu, showConfigMenu, showOperationsMenu, showServicesMenu]);

    const handleMouseLeave = (setMenuState: (value: boolean) => void) => {
        const timeout = setTimeout(() => {
            setMenuState(false);
        }, 70); // 70ms întârziere
        setCloseTimeout(timeout);
    };

    const handleMouseEnter = () => {
        if (closeTimeout) {
            clearTimeout(closeTimeout);
            setCloseTimeout(null);
        }
    };

    const logout = () => {
        console.log('Logout clicked')
        alert('Logout functionality to be implemented');
    }
    const closeAllMenus = () => {
        setShowUserMenu(false);
        setShowAdminMenu(false);
        setShowConfigMenu(false);
        setShowOperationsMenu(false);
        setShowServicesMenu(false);
    }
    
    
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
                <div className='flex justify-between items-center h-16'>
                    <div className='flex items-center'>
                        <Link to="/" className='flex items-center space-x-2 '>
                        <div className='text-xl font-bold text-blue-600 px-3 py-2 rounded group-hover:bg-blue-700 transition '>
                            VC
                        </div>
                        <span className='text-xl font-bold text-gray-800 group-hover:text-gray-600 transition'>VIVE CREDIT</span>
                        </Link>
                    </div>
                    
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        className='md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100'
                    >
                        <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            {showMobileMenu ? (
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                            ) : (
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                            )}
                        </svg>
                    </button>
                    
                    <nav className='hidden md:flex space-x-10'>
                        <div className='relative' onMouseLeave={() => handleMouseLeave(setShowAdminMenu)} onMouseEnter={handleMouseEnter}>
                            <button
                            onMouseEnter={() =>setShowAdminMenu(true)}
                            onClick={(e)=>{
                                e.stopPropagation()
                                setShowAdminMenu(!showAdminMenu);
                            }}
                            className='px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition'
                            >
                                Administrare
                            </button>
                            {showAdminMenu && (
                                <div
                                onClick={(e)=>e.stopPropagation()}
                                className='absolute left-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50'
                                >
                                    <Link
                                    to="/admin/users"
                                    onClick={closeAllMenus}
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition'>
                                        <span className='font-semibold'>Utilizatori & Roluri</span>
                                        <p className='text-xs text-gray-500'>CRUD,Assign Roluri, Permissions</p>
                                    </Link>
                                    <Link
                                    to="/admin/audit"
                                    onClick={closeAllMenus}
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition'>
                                        <span className='font-semibold'>Audit Dashboard</span>
                                        <p className='text-xs text-gray-500'>Monitorizare actiuni & filtrare</p>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div className='relative' onMouseLeave={() => handleMouseLeave(setShowConfigMenu)} onMouseEnter={handleMouseEnter}>
                            <button
                                onMouseEnter={()=> setShowConfigMenu(true)}
                                onClick={(e)=>{
                                    e.stopPropagation()
                                    setShowConfigMenu(!showConfigMenu);
                                }}
                                className='px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition'
                            >
                                Configurari
                            </button>
                            {showConfigMenu && (
                                <div
                                onClick={(e)=>e.stopPropagation()}
                                className='absolute left-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50'
                                >
                                    <Link
                                    to="/admin/risk-config"
                                    onClick={closeAllMenus}
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition'>
                                        <span className='font-semibold'>Configurari Risc</span>
                                        <p className='text-xs text-gray-500'>Reguli scor, Praguri venit/datorii</p>
                                    </Link>
                                    <Link
                                    to="/admin/products"
                                    onClick={closeAllMenus}
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition'>
                                        <span className='font-semibold'>Configurari Produse</span>
                                        <p className='text-xs text-gray-500'>Dobanzi, Comisioane, Plafoane</p>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div className='relative' onMouseLeave={() => handleMouseLeave(setShowOperationsMenu)} onMouseEnter={handleMouseEnter}>
                            <button
                                onMouseEnter={()=> setShowOperationsMenu(true)}
                                onClick={(e)=>{
                                    e.stopPropagation()
                                    setShowOperationsMenu(!showOperationsMenu);
                                }}
                                className='px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition'
                            >
                                Operatiuni
                            </button>
                            {showOperationsMenu && (
                                <div
                                onClick={(e)=>e.stopPropagation()}
                                className='absolute left-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50'
                                >
                                    <Link
                                    to="/operator/onboarding"
                                    onClick={closeAllMenus}
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition'>
                                        <span className='font-semibold'>Onboarding</span>
                                        <p className='text-xs text-gray-500'>Inregistrare clienti noi</p>
                                    </Link>
                                    <Link
                                    to="/operator/applications"
                                    onClick={closeAllMenus}
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition'>
                                        <span className='font-semibold'>Aplicatii</span>
                                        <p className='text-xs text-gray-500'>Cereri de credit</p>
                                    </Link>
                                    <Link
                                    to="/operator/kyc"
                                    onClick={closeAllMenus}
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition'>
                                        <span className='font-semibold'>KYC</span>
                                        <p className='text-xs text-gray-500'>Verificare identitate</p>
                                    </Link>
                                    <Link
                                    to="/operator/scoring"
                                    onClick={closeAllMenus}
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition'>
                                        <span className='font-semibold'>Scoring</span>
                                        <p className='text-xs text-gray-500'>Evaluare risc credit</p>
                                    </Link>
                                    <Link
                                    to="/operator/contracting"
                                    onClick={closeAllMenus}
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition'>
                                        <span className='font-semibold'>Contractare</span>
                                        <p className='text-xs text-gray-500'>Generare & semnare contracte</p>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div className='relative' onMouseLeave={() => handleMouseLeave(setShowServicesMenu)} onMouseEnter={handleMouseEnter}>
                            <button
                                onMouseEnter={()=> setShowServicesMenu(true)}
                                onClick={(e)=>{
                                    e.stopPropagation()
                                    setShowServicesMenu(!showServicesMenu);
                                }}
                                className='px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition'
                            >
                                Servicii
                            </button>
                            {showServicesMenu && (
                                <div
                                onClick={(e)=>e.stopPropagation()}
                                className='absolute left-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50'
                                >
                                    <Link
                                    to="/operator/payments"
                                    onClick={closeAllMenus}
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition'>
                                        <span className='font-semibold'>Plati</span>
                                        <p className='text-xs text-gray-500'>Procesare plati clienti</p>
                                    </Link>
                                    <Link
                                    to="/operator/collections"
                                    onClick={closeAllMenus}
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition'>
                                        <span className='font-semibold'>Colectari</span>
                                        <p className='text-xs text-gray-500'>Recuperare creante</p>
                                    </Link>
                                    <Link
                                    to="/operator/servicing"
                                    onClick={closeAllMenus}
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition'>
                                        <span className='font-semibold'>Servicing</span>
                                        <p className='text-xs text-gray-500'>Gestionare credite active</p>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                    <div className='flex items-center space-x-4'>
                        <div className='relative'>
                            <button
                            onClick={(e)=> {
                                e.stopPropagation();
                                setShowUserMenu(!showUserMenu);
                            }}
                            className='flex items-center space-x-2 focus:outline-none'>
                                <div className='h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold'>
                                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                                </div>
                                <span className='text-sm font-medium hidden lg:block'>
                                    {user.firstName} {user.lastName}
                                </span>
                                <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                                </svg>
                            </button>
                            {showUserMenu && (
                                <div 
                                onClick={(e)=>e.stopPropagation()}
                                className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-50'>
                                    <div className='px-4 py-2 border-b border-gray-200'>
                                        <p className='text-sm font-medium text-gray-900'>{user?.firstName} {user?.lastName}</p>
                                        <p className='text-xs text-gray-500'>{user?.email}</p>
                                    </div>
                                    <Link to="/profile"
                                    onClick={closeAllMenus}
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition'>
                                        Profile
                                    </Link>
                                    <Link to="/settings"
                                    onClick={closeAllMenus}
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition'>
                                        Settings
                                    </Link>
                                    <Link to="/client"
                                    onClick={closeAllMenus}
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition'>
                                        🏠 Portal Client
                                    </Link>
                                    <div className='border-t border-gray-200'></div>
                                    <button
                                    onClick={()=>{
                                        closeAllMenus();
                                        logout();
                                    }}
                                    className='w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition'>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className='md:hidden bg-white border-t border-gray-200'>
                    <div className='px-2 pt-2 pb-3 space-y-1'>
                        {/* Administrare Section */}
                        <div>
                            <button
                                onClick={() => setShowAdminMenu(!showAdminMenu)}
                                className='w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 flex justify-between items-center'
                            >
                                Administrare
                                <svg className={`h-5 w-5 transform transition-transform ${showAdminMenu ? 'rotate-180' : ''}`} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                                </svg>
                            </button>
                            {showAdminMenu && (
                                <div className='pl-4 space-y-1'>
                                    <Link to="/admin/users" onClick={() => {closeAllMenus(); setShowMobileMenu(false);}} className='block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'>
                                        Utilizatori & Roluri
                                    </Link>
                                    <Link to="/admin/audit" onClick={() => {closeAllMenus(); setShowMobileMenu(false);}} className='block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'>
                                        Audit Dashboard
                                    </Link>
                                </div>
                            )}
                        </div>
                        
                        {/* Configurari Section */}
                        <div>
                            <button
                                onClick={() => setShowConfigMenu(!showConfigMenu)}
                                className='w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 flex justify-between items-center'
                            >
                                Configurari
                                <svg className={`h-5 w-5 transform transition-transform ${showConfigMenu ? 'rotate-180' : ''}`} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                                </svg>
                            </button>
                            {showConfigMenu && (
                                <div className='pl-4 space-y-1'>
                                    <Link to="/admin/risk-config" onClick={() => {closeAllMenus(); setShowMobileMenu(false);}} className='block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'>
                                        Configurari Risc
                                    </Link>
                                    <Link to="/admin/products" onClick={() => {closeAllMenus(); setShowMobileMenu(false);}} className='block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'>
                                        Configurari Produse
                                    </Link>
                                </div>
                            )}
                        </div>
                        
                        {/* Operatiuni Section */}
                        <div>
                            <button
                                onClick={() => setShowOperationsMenu(!showOperationsMenu)}
                                className='w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 flex justify-between items-center'
                            >
                                Operatiuni
                                <svg className={`h-5 w-5 transform transition-transform ${showOperationsMenu ? 'rotate-180' : ''}`} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                                </svg>
                            </button>
                            {showOperationsMenu && (
                                <div className='pl-4 space-y-1'>
                                    <Link to="/operator/onboarding" onClick={() => {closeAllMenus(); setShowMobileMenu(false);}} className='block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'>
                                        Onboarding
                                    </Link>
                                    <Link to="/operator/applications" onClick={() => {closeAllMenus(); setShowMobileMenu(false);}} className='block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'>
                                        Aplicatii
                                    </Link>
                                    <Link to="/operator/kyc" onClick={() => {closeAllMenus(); setShowMobileMenu(false);}} className='block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'>
                                        KYC
                                    </Link>
                                    <Link to="/operator/scoring" onClick={() => {closeAllMenus(); setShowMobileMenu(false);}} className='block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'>
                                        Scoring
                                    </Link>
                                    <Link to="/operator/contracting" onClick={() => {closeAllMenus(); setShowMobileMenu(false);}} className='block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'>
                                        Contractare
                                    </Link>
                                </div>
                            )}
                        </div>
                        
                        {/* Servicii Section */}
                        <div>
                            <button
                                onClick={() => setShowServicesMenu(!showServicesMenu)}
                                className='w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 flex justify-between items-center'
                            >
                                Servicii
                                <svg className={`h-5 w-5 transform transition-transform ${showServicesMenu ? 'rotate-180' : ''}`} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                                </svg>
                            </button>
                            {showServicesMenu && (
                                <div className='pl-4 space-y-1'>
                                    <Link to="/operator/payments" onClick={() => {closeAllMenus(); setShowMobileMenu(false);}} className='block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'>
                                        Plati
                                    </Link>
                                    <Link to="/operator/collections" onClick={() => {closeAllMenus(); setShowMobileMenu(false);}} className='block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'>
                                        Colectari
                                    </Link>
                                    <Link to="/operator/servicing" onClick={() => {closeAllMenus(); setShowMobileMenu(false);}} className='block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50'>
                                        Servicing
                                    </Link>
                                </div>
                            )}
                        </div>
                        
                        {/* User Menu */}
                        <div className='border-t border-gray-200 pt-2'>
                            <div className='px-3 py-2'>
                                <p className='text-sm font-medium text-gray-900'>{user.firstName} {user.lastName}</p>
                                <p className='text-xs text-gray-500'>{user.email}</p>
                            </div>
                            <Link to="/profile" onClick={() => setShowMobileMenu(false)} className='block px-3 py-2 text-base text-gray-700 hover:bg-gray-100'>
                                Profile
                            </Link>
                            <Link to="/settings" onClick={() => setShowMobileMenu(false)} className='block px-3 py-2 text-base text-gray-700 hover:bg-gray-100'>
                                Settings
                            </Link>
                            <Link to="/client" onClick={() => setShowMobileMenu(false)} className='block px-3 py-2 text-base text-gray-700 hover:bg-gray-100'>
                                🏠 Portal Client
                            </Link>
                            <button onClick={() => {setShowMobileMenu(false); logout();}} className='w-full text-left px-3 py-2 text-base text-red-600 hover:bg-gray-100'>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}