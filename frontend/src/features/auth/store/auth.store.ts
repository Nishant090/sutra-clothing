
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import type { AuthUser } from "../types/auth.type";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;

  setUser: (user: AuthUser) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,

        setUser: (user) =>
          set(
            {
              user,
              isAuthenticated: true,
            },
            false,
            "auth/setUser"
          ),
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),

        // Persist only the public user and UI auth state.
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    { name: "AuthStore" }
  )
);
