"use client";

import {
  Search,
} from "lucide-react";

import {
  ThemeToggle,
} from "./theme-toggle";

import {
  UserMenu,
} from "./user-menu";

import {
  PageHeader,
} from "./page-header";

import {
  NotificationBell,
} from "@/components/notifications/notification-bell";

import {
  NotificationDropdown,
} from "@/components/notifications/notification-dropdown";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  SyncStatus,
} from "@/components/pwa/sync-status";

export function AppHeader() {
  return (
    <header
      className="
      h-16

      border-b

      bg-background/80
      backdrop-blur-xl

      px-3
      md:px-4
      lg:px-6

      flex
      items-center
      justify-between

      gap-3

      shrink-0

      sticky
      top-0

      z-40
      "
    >
      {/* PAGE TITLE */}

      <div
        className="
        min-w-0
        flex-1
        "
      >
        <PageHeader />
      </div>

      {/* ACTIONS */}

      <div
        className="
        flex
        items-center

        gap-2
        md:gap-3
        "
      >
        <SyncStatus />

        {/* Search - desktop only */}

        <button
          className="
          hidden
          md:flex

          items-center
          justify-center

          h-9
          w-9

          rounded-md

          hover:bg-muted

          transition
          "
        >
          <Search size={18} />
        </button>

        {/* Notifications */}

        <Popover>
  <PopoverTrigger>
    <span
      className="
      flex
      items-center
      justify-center

      h-9
      w-9

      rounded-md

      hover:bg-muted

      transition
      "
    >
      <NotificationBell />
    </span>
  </PopoverTrigger>

  <PopoverContent
    align="end"
    sideOffset={10}
    className="
    p-0

    w-[95vw]
    sm:w-[420px]

    max-w-[420px]

    z-[9999]
    "
  >
    <NotificationDropdown />
  </PopoverContent>
</Popover>

        {/* Theme */}

        <ThemeToggle />

        {/* User */}

        <UserMenu />
      </div>
    </header>
  );
}