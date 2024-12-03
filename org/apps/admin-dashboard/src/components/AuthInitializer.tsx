"use client";

import { useLayoutEffect } from "react";
import { useAuthStore } from "../lib/hooks/useAuthStore";
import { authApi } from "../lib/api/auth";

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { setUser, setIsAuthenticated, logout } = useAuthStore();

  useLayoutEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await authApi.getCurrentUser();
        if (response.success) {
          setUser(response.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.warn("User verification failed:", error);
        logout();
      }
    };

    initializeAuth();
  }, [setUser, logout]);

  return <>{children}</>;
}