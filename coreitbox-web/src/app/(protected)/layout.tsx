"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
  usePathname,
} from "next/navigation";

import {
  AppLayout,
} from "@/components/layout/app-layout";

import {
  useAuth,
} from "@/hooks/use-auth";

import {
  canAccessRoute,
} from "@/lib/rbac";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    user,
    loading,
  } = useAuth();

  const router =
    useRouter();

  const pathname =
    usePathname();

  useEffect(() => {
    if (
      !loading &&
      !user
    ) {
      router.replace(
        "/login",
      );
      return;
    }

    if (
      user &&
      !canAccessRoute(
        user.role,
        pathname,
      )
    ) {
      router.replace(
        "/dashboard",
      );
    }
  }, [
    user,
    loading,
    pathname,
    router,
  ]);

  if (
    loading ||
    !user
  ) {
    return null;
  }

  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
}