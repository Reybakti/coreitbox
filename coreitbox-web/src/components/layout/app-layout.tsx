"use client";

import { ReactNode } from "react";

import { AppHeader } from "./app-header";
import { DesktopSidebar } from "./desktop-sidebar";
import { MobileBottomNav } from "./mobile-bottom-nav";

import { useNotificationSocket } from "@/hooks/use-notification-socket";

interface Props {
  children: ReactNode;
}

export function AppLayout({
  children,
}: Props) {
  useNotificationSocket();

  return (
    <div
      className="
      h-screen
      overflow-hidden

      flex
      bg-background
      "
    >
      <DesktopSidebar />

      <div
        className="
        flex-1

        flex
        flex-col

        overflow-hidden
        "
      >
        <AppHeader />

        <main
          className="
          flex-1

          overflow-y-auto

          pb-20
          lg:pb-6

          p-4
          lg:p-6
          "
        >
          {children}
        </main>
      </div>

      <MobileBottomNav />
    </div>
  );
}