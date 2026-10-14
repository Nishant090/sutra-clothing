import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../features/auth/store/auth.store";
import AuthLoading from "./AuthLoading";

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  if (isCheckingAuth) return <AuthLoading />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}