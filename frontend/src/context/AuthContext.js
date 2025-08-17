import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load from localStorage or sessionStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser') || sessionStorage.getItem('authUser');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (userData, remember) => {
    setUser(userData);
    if (remember) {
      localStorage.setItem('authUser', JSON.stringify(userData));
      sessionStorage.removeItem('authUser');
    } else {
      sessionStorage.setItem('authUser', JSON.stringify(userData));
      localStorage.removeItem('authUser');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
    sessionStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
