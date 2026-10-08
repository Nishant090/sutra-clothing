
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";

import Input from "../../components/ui/form/Input";
import Button from "../../components/ui/Button";
import { loginUser, getLoginError } from "../../features/auth/api/auth.api";
import {
  loginSchema,
  type LoginFormValues,
} from "../../features/auth/schemas/auth.schema";
import { useAuthStore } from "../../features/auth/store/auth.store";

export default function Login() {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError("");

    try {
      const response = await loginUser(values);

      if (!response.success) {
        setServerError("Login failed. Please check your credentials.");
        return;
      }

      setUser(response.user);

      // Navigate after the backend confirms successful login.
      navigate("/dashboard", { replace: true });
    } catch (error: unknown) {
      setServerError(getLoginError(error));
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-text-secondary">
            Sign in to your account to continue.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <Input
            {...register("email")}
            label="Email address"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            disabled={isSubmitting}
            error={errors.email?.message}
          />

          <Input
            {...register("password")}
            label="Password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            disabled={isSubmitting}
            error={errors.password?.message}
          />

          {serverError && (
            <p
              role="alert"
              className="rounded-lg border border-danger/20 bg-red-50 px-3 py-2.5 text-sm text-danger"
            >
              {serverError}
            </p>
          )}

          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={isSubmitting}
          >
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-primary hover:underline"
          >
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}
