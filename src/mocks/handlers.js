// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Example: Login API
  http.post('/api/auth/login', async ({ request }) => {
    // Request theke email o password nibo
    const { email, password } = await request.json();

    // Tomar dewa credentials check korbo
    if (email === 'kamrul@gmail.com' && password === '12345678') {
      // Shudu valid credentials hole dashboard e redirect hobe
      return HttpResponse.json({
        user: {
          id: 1,
          name: 'Kamrul',
          email: 'kamrul@gmail.com',
        },
        token: 'fake-jwt-token-12345',
      });
    } else if (email && password.length >= 6) {
      // Onno kono valid email/password dile o login hobe (testing er jonno)
      const userName = email.split('@')[0];
      return HttpResponse.json({
        user: {
          id: 2,
          name: userName.charAt(0).toUpperCase() + userName.slice(1),
          email: email,
        },
        token: 'fake-jwt-token-' + Date.now(),
      });
    } else {
      // Invalid credentials hole error response
      return HttpResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }
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
