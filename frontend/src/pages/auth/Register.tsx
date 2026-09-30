import { Link } from "react-router-dom";

const Register = () => {
  return (
    <main className="min-h-screen bg-white text-neutral-800">
      {/* Page Header */}
      <section className="flex h-48 items-center justify-center bg-neutral-100 sm:h-56">
        <div className="text-center">
          <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Register
          </h1>

          <p className="mt-3 text-[10px] uppercase tracking-wide text-neutral-500 sm:text-xs">
            Home&nbsp; / &nbsp;Register
          </p>
        </div>
      </section>

      {/* Register Form */}
      <section className="mx-auto max-w-2xl px-6 py-16 sm:px-8 lg:py-24">
        <div>
          <h2 className="font-sans text-sm font-medium">Create an account</h2>

          <form className="mt-8 space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="mb-3 block text-xs font-medium">
                Name
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="name"
                type="text"
                autoComplete="name"
                className="h-14 w-full border border-neutral-300 bg-white px-4 text-sm outline-none transition focus:border-neutral-700"
              />
            </div>

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
                autoComplete="new-password"
                className="h-14 w-full border border-neutral-300 bg-white px-4 text-sm outline-none transition focus:border-neutral-700"
              />
            </div>

            {/* Confirm Password */}

            {/* Privacy */}
            <p className="max-w-xl text-xs leading-6 text-neutral-400">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our privacy policy.
            </p>

            {/* Register Button */}
            <button
              type="submit"
              className="h-14 bg-neutral-800 px-10 text-xs font-medium text-white transition hover:bg-black cursor-pointer"
            >
              Register
            </button>
            {/* Login Link */}
            <p className="text-xs text-neutral-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="ml-1 text-neutral-800 underline underline-offset-4 transition hover:text-neutral-500"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Register;
