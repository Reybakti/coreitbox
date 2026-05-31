"use client";

import {
  useEffect,
  useState,
} from "react";

export function SyncStatus() {
  const [
    online,
    setOnline,
  ] = useState(true);

  useEffect(() => {
    setOnline(
      navigator.onLine,
    );

    const handleOnline =
      () => setOnline(true);

    const handleOffline =
      () => setOnline(false);

    window.addEventListener(
      "online",
      handleOnline,
    );

    window.addEventListener(
      "offline",
      handleOffline,
    );

    return () => {
      window.removeEventListener(
        "online",
        handleOnline,
      );

      window.removeEventListener(
        "offline",
        handleOffline,
      );
    };
  }, []);

  return (
    <div
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-medium
        ${
          online
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }
      `}
    >
      {online
        ? "🟢 Online"
        : "🔴 Offline"}
    </div>
  );
}