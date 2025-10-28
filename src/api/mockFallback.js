// Production environment e jokhon real backend nai,
// tokhon ei mock fallback use hobe (shudhu testing er jonno)
// Real backend ready hole ei file delete kora uchit

export const mockApiCalls = async (endpoint, method, data) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Login endpoint
  if (endpoint.includes('/auth/login') && method === 'POST') {
    const { email, password } = data;

    if (email === 'kamrul@gmail.com' && password === '12345678') {
      return {
        user: {
          id: 1,
          name: 'Kamrul',
          email: 'kamrul@gmail.com',
        },
        token: 'fake-jwt-token-12345',
      };
    } else if (email && password.length >= 6) {
      const userName = email.split('@')[0];
      return {
        user: {
          id: 2,
          name: userName.charAt(0).toUpperCase() + userName.slice(1),
          email: email,
        },
        token: 'fake-jwt-token-' + Date.now(),
      };
    } else {
      throw new Error('Invalid email or password');
    }
  }

  // Signup endpoint
  if (endpoint.includes('/auth/signup') && method === 'POST') {
    return {
      message: 'Signup successful! Please verify your email.',
      userId: Date.now(),
    };
  }

  // Trades GET endpoint
  if (endpoint.includes('/trades') && method === 'GET') {
    return [
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
    ];
  }

  // Trades POST endpoint
  if (endpoint.includes('/trades') && method === 'POST') {
    return {
      message: 'Trade logged successfully!',
      trade: data,
    };
  }

  // Dashboard KPIs
  if (endpoint.includes('/dashboard/kpis') && method === 'GET') {
    return {
      totalTrades: 10,
      winRate: 65.5,
      totalPnL: 2500.0,
      avgWin: 450.0,
      avgLoss: -220.0,
    };
  }

  // Reflections GET
  if (endpoint.includes('/reflections') && method === 'GET') {
    return [
      {
        id: 1,
        date: '10/17/2025',
        content: 'Today was a good trading day.',
        mood: 'positive',
      },
    ];
  }

  // Reflections POST
  if (endpoint.includes('/reflections') && method === 'POST') {
    return {
      message: 'Reflection saved successfully!',
      reflection: data,
    };
  }

  // Default fallback
  return { message: 'API call successful', data };
};
