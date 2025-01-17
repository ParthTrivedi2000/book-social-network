import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const token = localStorage.getItem('token');  // Assuming token is stored in localStorage
    setLoading(true); // Start loading
    
    if (token) {
      setIsAuthenticated(true);  // Set true if token exists
    } else {
      setIsAuthenticated(false);  // Otherwise, false
    }
    setLoading(false); // Once the effect is done, set loading to false
  }, []);  // Run once when the component mounts

  return { isAuthenticated, loading };
};
