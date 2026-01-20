import { createContext, useState } from 'react';
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')));

  // Login Function
  const login = async (email, password) => {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post(`${API_URL}/api/auth/login`, { email, password }, config);
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  };

  const register = async (userData) => {
    const config = { headers: { 'Content-Type': 'application/json' } };

    let url = `${API_URL}/api/auth/register`; 
    
    if (userData.role === 'admin') {
      url = `${API_URL}/api/auth/register-admin`; 
    }

    const { data } = await axios.post(url, userData, config);
    
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};