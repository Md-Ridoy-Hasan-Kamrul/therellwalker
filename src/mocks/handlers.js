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

  // Reflections API - Get all reflections
  http.get('/api/reflections', () => {
    // Mock reflections data
    return HttpResponse.json({
      reflections: [
        {
          id: 1,
          date: '10/29/2025, 09:55:09 AM',
          prompt: 'Were you confident or doubtful when placing trades?',
          group: 'MINDSET & CONFIDENCE',
          answer:
            'Today I felt very confident in my trading decisions. I followed my plan and waited for proper setups before entering.',
        },
        {
          id: 2,
          date: '10/28/2025, 02:30:15 PM',
          prompt: 'Did you stick to your trading plan today?',
          group: 'DISCIPLINE & CONSISTENCY',
          answer:
            'Yes, I stuck to my plan completely. I avoided impulsive trades and only took setups that matched my criteria.',
        },
        {
          id: 3,
          date: '10/27/2025, 11:20:45 AM',
          prompt: "How did you manage risk in today's trades?",
          group: 'RISK MANAGEMENT',
          answer:
            'I used proper position sizing and kept my stop losses tight. No trade exceeded 1% of my account.',
        },
      ],
      total: 3,
    });
  }),

  // Reflections API - Create new reflection
  http.post('/api/reflections', async ({ request }) => {
    const reflectionData = await request.json();

    // Create reflection with auto-generated ID
    const newReflection = {
      id: Date.now(),
      ...reflectionData,
    };

    return HttpResponse.json(
      {
        reflection: newReflection,
        message: 'Reflection saved successfully!',
      },
      { status: 201 }
    );
  }),

  // Reflections API - Get prompt state
  http.get('/api/reflections/prompt-state', () => {
    return HttpResponse.json({
      currentGroupIndex: 0,
      promptIndexes: [0, 0, 0, 0],
    });
  }),

  // Reflections API - Update prompt state
  http.put('/api/reflections/prompt-state', async ({ request }) => {
    const stateData = await request.json();

    return HttpResponse.json({
      message: 'Prompt state updated successfully!',
      state: stateData,
    });
  }),

  // Reflections API - Delete reflection
  http.delete('/api/reflections/:id', ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      message: `Reflection ${id} deleted successfully!`,
    });
  }),

  // Reflections API - Update reflection
  http.put('/api/reflections/:id', async ({ request, params }) => {
    const { id } = params;
    const updateData = await request.json();

    return HttpResponse.json({
      reflection: {
        id: parseInt(id),
        ...updateData,
        updatedAt: new Date().toISOString(),
      },
      message: 'Reflection updated successfully!',
    });
  }),
];
