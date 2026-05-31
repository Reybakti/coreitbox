"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import {
  Input,
} from "@/components/ui/input";

import {
  Button,
} from "@/components/ui/button";

import {
  AuthService,
} from "@/services/auth.service";

import {
  useAuth,
} from "@/hooks/use-auth";

export default function LoginPage() {
  const router =
    useRouter();

  const { login } =
    useAuth();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin =
    async () => {
      try {
        setLoading(true);
        setError("");

        const result =
          await AuthService.login(
            username,
            password,
          );

        login(result);

        router.replace(
          "/dashboard",
        );
      } catch (err: any) {
        setError(
          err?.response?.data
            ?.message ||
            "Username atau password salah",
        );
      } finally {
        setLoading(false);
      }
    };

  const handleKeyDown = (
    e: React.KeyboardEvent,
  ) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div
      className="
      min-h-screen

      flex
      items-center
      justify-center

      bg-background

      p-4
      "
    >
      <Card
        className="
        w-full
        max-w-md

        shadow-xl
        "
      >
        <CardHeader
          className="
          text-center
          space-y-2
          "
        >
          <div
            className="
            flex
            justify-center
            "
          >
            <div
              className="
              h-16
              w-16

              rounded-2xl

              bg-primary

              flex
              items-center
              justify-center

              text-2xl
              font-bold

              text-primary-foreground
              "
            >
              CI
            </div>
          </div>

          <h1
            className="
            text-3xl
            font-bold
            "
          >
            CoreITBox
          </h1>

          <p
            className="
            text-sm
            text-muted-foreground
            "
          >
            IT Service Management Platform
          </p>
        </CardHeader>

        <CardContent
          className="
          space-y-4
          "
        >
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value,
              )
            }
            onKeyDown={
              handleKeyDown
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value,
              )
            }
            onKeyDown={
              handleKeyDown
            }
          />

          {error && (
            <div
              className="
              text-sm
              text-red-500
              "
            >
              {error}
            </div>
          )}

          <Button
            className="
            w-full
            "
            disabled={
              loading
            }
            onClick={
              handleLogin
            }
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}