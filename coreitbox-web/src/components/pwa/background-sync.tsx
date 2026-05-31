"use client";

import {
  useEffect,
} from "react";

import {
  syncPendingActions,
} from "@/services/background-sync.service";

export function BackgroundSync() {
  useEffect(() => {
    const handleOnline =
      async () => {
        console.log(
          "ONLINE - START SYNC",
        );

        await syncPendingActions();
      };

    window.addEventListener(
      "online",
      handleOnline,
    );

    handleOnline();

    return () => {
      window.removeEventListener(
        "online",
        handleOnline,
      );
    };
  }, []);

  return null;
}