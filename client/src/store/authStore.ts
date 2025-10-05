import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  setUser: (user: User | null) => void;
  checkAuthStatus: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitializing: true,
  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },
  checkAuthStatus: async () => {
    try {
      const response = await api.get('/users/me');
      if (response.data && response.data.user) {
        set({ user: response.data.user, isAuthenticated: true });
      } else {
        set({ user: null, isAuthenticated: false });
      }
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isInitializing: false });
    }
  },
  logout: async () => {
    try {
      await api.get('/users/logout');
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
