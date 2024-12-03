import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { User } from "../stores/authStore";
import { authApi } from "../api/auth";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        setUser: (user) => set({ user, isAuthenticated: !!user }),
        setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
        logout: async () => {
          await authApi.logout();
          set({ user: null, isAuthenticated: false });
        },
      }),
      {
        name: "auth-storage",
      }
    )
  )
);
