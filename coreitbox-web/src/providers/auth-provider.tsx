"use client";

import {
  createContext,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { AuthService } from "@/services/auth.service";

import type {
  User,
  LoginResponse,
} from "@/types/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;

  login: (
    data: LoginResponse,
  ) => void;

  logout: () => void;

  setUser: (
    user: User | null,
  ) => void;
}

export const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType,
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router =
    useRouter();

  const [user, setUser] =
    useState<User | null>(
      null,
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "access_token",
          );

        if (!token) {
          setLoading(false);
          return;
        }

        const me =
          await AuthService.me();

        setUser(me);
      } catch (error) {
        console.error(
          "Auth initialization failed",
          error,
        );

        localStorage.removeItem(
          "access_token",
        );

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

  const login = (
    data: LoginResponse,
  ) => {
    localStorage.setItem(
      "access_token",
      data.accessToken,
    );

    setUser({
      sub: data.user.id,
      username:
        data.user.username,
      role: data.user.role,
    });
  };

  const logout = () => {
    localStorage.removeItem(
      "access_token",
    );

    setUser(null);

    router.replace(
      "/login",
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}