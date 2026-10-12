
import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../features/auth/store/auth.store";

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  const isCheckingAuth = useAuthStore(
    (state) => state.isCheckingAuth
  );

  if (isCheckingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-text-secondary">
          Checking your session...
        </p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
