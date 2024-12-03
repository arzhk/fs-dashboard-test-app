import { create } from "zustand";
import { authApi } from "../api/auth";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null | undefined;
  setAuth: (isAuthenticated: boolean, user: User | null | undefined) => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,
  setAuth: (isAuthenticated, user) => set({ isAuthenticated, user }),
  logout: async () => {
    const response = await authApi.logout();
    if (response.success) {
      set({ isAuthenticated: false, user: null });
      if (response.redirectUrl) {
        window.location = response.redirectUrl;
      }
    }
  },
}));
