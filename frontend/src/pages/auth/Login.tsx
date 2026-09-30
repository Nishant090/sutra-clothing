import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className="min-h-screen bg-white text-neutral-800">
      {/* Page Header */}
      <section className="flex h-48 items-center justify-center bg-neutral-100 sm:h-56">
        <div className="text-center">
          <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Login
          </h1>

          <p className="mt-3 text-[10px] uppercase tracking-wide text-neutral-500 sm:text-xs">
            Home&nbsp; / &nbsp;Login
          </p>
        </div>
      </section>

      {/* Login Form */}
      <section className="mx-auto max-w-2xl px-6 py-16 sm:px-8 lg:py-24">
        <div>
          <h2 className="font-sans text-sm font-medium">
            Login to your account
          </h2>

          <form className="mt-8 space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-3 block text-xs font-medium">
                Email address
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                className="h-14 w-full border border-neutral-300 bg-white px-4 text-sm outline-none transition focus:border-neutral-700"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-3 block text-xs font-medium"
              >
                Password
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="h-14 w-full border border-neutral-300 bg-white px-4 text-sm outline-none transition focus:border-neutral-700"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 accent-neutral-800"
              />

              <label
                htmlFor="remember"
                className="cursor-pointer text-xs text-neutral-600"
              >
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="h-14 bg-neutral-800 px-10 text-xs font-medium text-white transition hover:bg-black"
            >
              Login
            </button>

            {/* Forgot Password */}
            <div>
              <Link
                to="/forgot-password"
                className="text-xs text-orange-400 transition hover:text-neutral-800"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Register Link */}
            <p className="text-xs text-neutral-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="ml-1 text-neutral-800 underline underline-offset-4 transition hover:text-neutral-500"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
