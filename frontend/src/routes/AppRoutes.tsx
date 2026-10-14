import { Route, Routes } from "react-router";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/user/Dashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ProtectedRoute from "./ProtectedRoutes";
import RoleBasedRoute from "./RoleBasedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";
import HomeRedirect from "./HomeRedirect";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public-only: logged-in users get sent to their role's home */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Any authenticated user (shared pages like /profile go here) */}
      <Route element={<ProtectedRoute />}>
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Route>

      {/* User-only */}
      <Route element={<RoleBasedRoute allowedRoles={["user"]} />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Admin-only */}
      <Route element={<RoleBasedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin">
          <Route index element={<AdminDashboard />} />
          {/* Add nested admin routes here as the app grows. */}
        </Route>
      </Route>

      {/* Role-aware default redirects */}
      <Route path="/" element={<HomeRedirect />} />
      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  );
}