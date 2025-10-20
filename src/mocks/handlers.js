// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Example: Login API
  http.post('/api/auth/login', async () => {
    // Ekhane amra fake user data pathabo
    return HttpResponse.json({
      user: {
        id: 1,
        name: 'Sanju', // Tomar design-e "Sanju" chilo
        email: 'sanju@example.com',
      },
      token: 'fake-jwt-token-12345',
    });
  }),

  // Example: Trade Log data paoar API
  http.get('/api/trades', () => {
    // Tomar design-er moto kichu fake trade
    return HttpResponse.json([
      {
        id: '#001',
        dateTime: '10/17/2025 00:30 AM',
        ticker: 'YM',
        direction: 'Long',
        entry: 8000.0,
        exit: 2000.0,
        qty: 1,
        pnl: -6000.0,
        notes: '-',
      },
      {
        id: '#002',
        dateTime: '10/16/2025 11:31 AM',
        ticker: 'ES',
        direction: 'Long',
        entry: 0.0,
        exit: 0.0,
        qty: 1,
        pnl: 0.0,
        notes: '-',
      },
    ]);
  }),

  // Example: Notun Trade POST korar API
  http.post('/api/trades', async () => {
    // Shudhu success message pathacchi
    return HttpResponse.json(
      { message: 'Trade logged successfully!' },
      { status: 201 }
    );
  }),
];
