import React, { createContext, useState, useEffect } from 'react';

// >>>>>>>> FIX: 'export' keyword ta ekhane add kora hoyeche <<<<<<<<<<
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setUser({ name: 'Sanju' });
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem('authToken', userData.token);
    setUser(userData.user);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
