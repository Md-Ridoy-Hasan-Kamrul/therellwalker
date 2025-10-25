// src/api/httpEndpoints.js
export const endpoints = {
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    logout: '/auth/logout',
    forgotPassword: '/auth/forgot-password',
  },
  trades: {
    getAll: '/trades',
    create: '/trades',
    getById: (id) => `/trades/${id}`,
  },
  dashboard: {
    kpis: '/dashboard/kpis',
  },
  reflections: {
    getAll: '/reflections',
    create: '/reflections',
  },
};
