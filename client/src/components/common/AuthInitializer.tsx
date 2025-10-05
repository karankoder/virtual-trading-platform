'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';

export default function AuthInitializer() {
  const [initialized, setInitialized] = useState(false);
  const { checkAuthStatus, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      await checkAuthStatus();
      console.log('Auth status checked', isAuthenticated);
      setInitialized(true);
    };

    if (!initialized) {
      initializeAuth();
    }
  }, [checkAuthStatus, initialized, isAuthenticated]);

  return null;
}
