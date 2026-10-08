
import Button from "../../components/ui/Button";
import { useAuthStore } from "../../features/auth/store/auth.store";

export default function Dashboard() {

  const user = useAuthStore((state) => state.user);


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
      </section>
    </main>
  );
}
