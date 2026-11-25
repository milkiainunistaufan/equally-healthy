// src/App.jsx
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Login from './views/Login';
import Dashboard from './views/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          localStorage.removeItem('token');
          setUser(null);
        } else {
          setUser({ id: decoded.id, username: decoded.username, role: decoded.role,name: decoded.name });
        }
      } catch (error) {
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (!user) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}

export default App;