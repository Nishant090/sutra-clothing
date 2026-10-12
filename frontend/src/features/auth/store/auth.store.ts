
import { create } from "zustand";
import {
  createJSONStorage,
  devtools,
  persist,
} from "zustand/middleware";

import { getCurrentUser } from "../api/auth.api";
import type { AuthUser } from "../types/auth.type";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;

  setUser: (user: AuthUser) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        isCheckingAuth: true,

        setUser: (user) =>
          set(
            {
              user,
              isAuthenticated: true,
              isCheckingAuth: false,
            },
            false,
            "auth/setUser"
          ),

        logout: () =>
          set(
            {
              user: null,
              isAuthenticated: false,
              isCheckingAuth: false,
            },
            false,
            "auth/logout"
          ),

        checkAuth: async () => {
          set({ isCheckingAuth: true }, false, "auth/checkAuthStart");

          try {
            const user = await getCurrentUser();

            set(
              {
                user,
                isAuthenticated: true,
              },
              false,
              "auth/checkAuthSuccess"
            );
          } catch {
            set(
              {
                user: null,
                isAuthenticated: false,
              },
              false,
              "auth/checkAuthFailure"
            );
          } finally {
            set(
              { isCheckingAuth: false },
              false,
              "auth/checkAuthComplete"
            );
          }
        },
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),

        // Do not persist the loading state.
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: "AuthStore" }
  )
);
