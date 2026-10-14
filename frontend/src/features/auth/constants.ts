import type { UserRole } from "./types/auth.type";

export const ROLE_HOME: Record<UserRole, string> = {
  admin: "/admin",
  user: "/dashboard",
};