export const ROLES = {
  SYSADMIN: "SYSADMIN",
  ADMIN: "ADMIN",
  TEKNISI: "TEKNISI",
} as const;

export type UserRole =
  (typeof ROLES)[keyof typeof ROLES];