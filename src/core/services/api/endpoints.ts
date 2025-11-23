export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    REGISTER: '/auth/register',
    ME: '/auth/me',
  },
  
  // Users
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    GET: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },
  
  // Roles & Permissions
  ROLES: {
    LIST: '/roles',
    CREATE: '/roles',
    GET: (id: string) => `/roles/${id}`,
    UPDATE: (id: string) => `/roles/${id}`,
    DELETE: (id: string) => `/roles/${id}`,
  },
  
  PERMISSIONS: {
    LIST: '/permissions',
    CREATE: '/permissions',
    GET: (id: string) => `/permissions/${id}`,
    UPDATE: (id: string) => `/permissions/${id}`,
    DELETE: (id: string) => `/permissions/${id}`,
  },
  
  // Applications
  APPLICATIONS: {
    LIST: '/applications',
    CREATE: '/applications',
    GET: (id: string) => `/applications/${id}`,
    UPDATE: (id: string) => `/applications/${id}`,
    DELETE: (id: string) => `/applications/${id}`,
  },
  
  // KYC
  KYC: {
    LIST: '/kyc',
    CREATE: '/kyc',
    GET: (id: string) => `/kyc/${id}`,
    UPDATE: (id: string) => `/kyc/${id}`,
    VERIFY: (id: string) => `/kyc/${id}/verify`,
  },
  
  // Scoring
  SCORING: {
    LIST: '/scoring',
    CREATE: '/scoring',
    GET: (id: string) => `/scoring/${id}`,
    CALCULATE: (id: string) => `/scoring/${id}/calculate`,
  },
  
  // Contracting
  CONTRACTING: {
    LIST: '/contracts',
    CREATE: '/contracts',
    GET: (id: string) => `/contracts/${id}`,
    SIGN: (id: string) => `/contracts/${id}/sign`,
  },
  
  // Payments
  PAYMENTS: {
    LIST: '/payments',
    CREATE: '/payments',
    GET: (id: string) => `/payments/${id}`,
    PROCESS: (id: string) => `/payments/${id}/process`,
  },
  
  // Collections
  COLLECTIONS: {
    LIST: '/collections',
    GET: (id: string) => `/collections/${id}`,
    UPDATE: (id: string) => `/collections/${id}`,
  },
  
  // Servicing
  SERVICING: {
    LIST: '/servicing',
    GET: (id: string) => `/servicing/${id}`,
    UPDATE: (id: string) => `/servicing/${id}`,
  },
};
