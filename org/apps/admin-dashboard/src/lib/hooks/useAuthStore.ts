import { create } from "zustand";
import { authApi } from "../api/auth";

export interface User {
  _id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  (set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: !!user }),
    logout: async () => {
        console.log("TRIGGER LOG OUT")
      await authApi.logout();
      set({ user: null, isAuthenticated: false });
    /*   window.location.href = "/login"; */
    },
  }),
);
