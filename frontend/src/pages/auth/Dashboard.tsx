
import { useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/ui/Button";
import { useAuthStore } from "../../features/auth/store/auth.store";
import { logoutUser } from "../../features/auth/api/auth.api";

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError("");

    try {
      await logoutUser();
      logout();
      navigate("/login", { replace: true });
    } catch {
      setLogoutError(
        "Unable to contact the server to complete logout. Please try again.",
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <section className="w-full max-w-lg rounded-2xl border border-border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-text-primary">
          Hi, {user?.name ?? "User"}!
        </h1>

        <p className="mt-3 text-text-secondary">
          Welcome to your dashboard. You are logged in successfully.
        </p>

        <div className="mt-6 rounded-lg bg-slate-50 p-4">
          <p className="text-sm text-text-secondary">Email address</p>
          <p className="mt-1 font-medium text-text-primary">
            {user?.email}
          </p>
        </div>

        {logoutError && (
          <p role="alert" className="mt-4 text-sm text-red-600">
            {logoutError}
          </p>
        )}

        <div className="mt-6">
          <Button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            isLoading={isLoggingOut}
            fullWidth
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </section>
    </main>
  );
}
