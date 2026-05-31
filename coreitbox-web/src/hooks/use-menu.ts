"use client";

import { useMemo }
from "react";

import { useAuth }
from "./use-auth";

import {
  APP_MENUS,
}
from "@/constants/menus";

export function useMenu() {
  const { user } =
    useAuth();

  return useMemo(() => {
    if (!user) {
      return [];
    }

    return APP_MENUS.filter(
      (menu) =>
        menu.roles.includes(
          user.role,
        ),
    );
  }, [user]);
}