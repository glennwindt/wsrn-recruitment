// src/utils/authMiddleware.js

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';

/**
 * Custom hook to protect routes by requiring authentication.
 * Redirects to login if user is not authenticated.
 *
 * @param {string} redirectPath - Path to redirect unauthenticated users (default: '/login')
 */
export const useRequireAuth = (redirectPath = '/login') => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate(redirectPath);
      }
    });

    // Cleanup listener on unmount
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [navigate, redirectPath]);
};


