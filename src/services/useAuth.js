import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const isAuthenticated = !!user;
  const isBuyer = user?.roles?.includes('BUYER');

  return { user, isAuthenticated, isBuyer };
};

export default useAuth;