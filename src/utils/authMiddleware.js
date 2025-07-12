// src/utils/authMiddleware.js

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// CORRECTED: Import 'auth' as a default export from your custom firebase service file.
import { auth } from '../services/firebase';

export const useRequireAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // onAuthStateChanged is a method of the default 'auth' object
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);
};
