
import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../features/auth/store/auth.store";

export default function ProtectedRoute() {
  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
