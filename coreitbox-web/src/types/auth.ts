export type UserRole =
  | "SYSADMIN"
  | "ADMIN"
  | "TEKNISI";

export interface User {
  sub: string;
  username: string;
  role: UserRole;
}

export interface LoginResponse {
  user: {
    id: string;
    username: string;
    fullName: string;
    role: UserRole;
  };

  accessToken: string;
}