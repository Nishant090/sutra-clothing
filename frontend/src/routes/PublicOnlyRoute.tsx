import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../features/auth/store/auth.store";
import { ROLE_HOME } from "../features/auth/constants";
import AuthLoading from "./AuthLoading";

export default function PublicOnlyRoute() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  if (isCheckingAuth) return <AuthLoading />;

  if (isAuthenticated && user) {
    return <Navigate to={ROLE_HOME[user.role]} replace />;
  }

  return <Outlet />;
}