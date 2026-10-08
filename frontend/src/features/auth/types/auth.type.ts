
export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  Message: string;
  user: AuthUser;
}
