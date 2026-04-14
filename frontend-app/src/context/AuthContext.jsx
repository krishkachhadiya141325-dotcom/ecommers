import { createContext, useContext, useState, useEffect } from 'react';
import { getMeAPI, loginAPI, registerAPI, logoutAPI } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('hf_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      if (token) {
        try {
          const { data } = await getMeAPI();
          setUser(data);
        } catch {
          localStorage.removeItem('hf_token');
          setToken(null);
        }
      }
      setLoading(false);
    };
    restoreSession();
  }, []);

  const login = async (email, password) => {
    const { data } = await loginAPI({ email, password });
    localStorage.setItem('hf_token', data.token);
    setToken(data.token);
    setUser(data.user);
    toast.success(`Welcome back, ${data.user.name}!`);
    return data.user;
  };

  const register = async (name, email, password) => {
    const { data } = await registerAPI({ name, email, password });
    localStorage.setItem('hf_token', data.token);
    setToken(data.token);
    setUser(data.user);
    toast.success(`Account created! Welcome, ${data.user.name}!`);
    return data.user;
  };

  const logout = async () => {
    try {
      await logoutAPI();
    } catch {
      // ignore
    }
    localStorage.removeItem('hf_token');
    setToken(null);
    setUser(null);
    toast.success('Logged out');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, token, loading, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
