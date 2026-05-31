"use client";

import {
  useEffect,
  useState,
} from "react";

export function OfflineBanner() {
  const [
    online,
    setOnline,
  ] = useState(true);

  useEffect(() => {
    const onOnline =
      () => setOnline(true);

    const onOffline =
      () => setOnline(false);

    window.addEventListener(
      "online",
      onOnline,
    );

    window.addEventListener(
      "offline",
      onOffline,
    );

    setOnline(
      navigator.onLine,
    );

    return () => {
      window.removeEventListener(
        "online",
        onOnline,
      );

      window.removeEventListener(
        "offline",
        onOffline,
      );
    };
  }, []);

  if (online) {
    return null;
  }

  return (
    <div
      className="
      fixed
      top-0
      left-0
      right-0

      z-[99999]

      bg-red-500
      text-white

      text-center
      py-2
      "
    >
      Offline Mode
    </div>
  );
}