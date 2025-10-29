import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// >>>>>>>> FIX: 'export' keyword ta ekhane add kora hoyeche <<<<<<<<<<
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cookies theke token check kora
    const token = Cookies.get('authToken');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // Token cookies e save kora (7 days expiry)
    Cookies.set('authToken', userData.token, {
      expires: 7,
      secure: true,
      sameSite: 'strict',
    });
    localStorage.setItem('user', JSON.stringify(userData.user));
    setUser(userData.user);
  };

  const logout = () => {
    // Cookies theke token remove kora
    Cookies.remove('authToken');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (updatedData) => {
    // User data update kora
    const updatedUser = { ...user, ...updatedData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
