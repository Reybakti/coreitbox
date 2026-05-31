"use client";

import { Bell } from "lucide-react";

import {
  useUnreadNotifications,
} from "@/hooks/use-unread-notifications";

export function NotificationBell() {
  const {
    data,
  } = useUnreadNotifications();

  const count =
    data?.length || 0;

  return (
    <div
      className="
      relative

      h-10
      w-10

      rounded-xl

      border

      flex
      items-center
      justify-center

      hover:bg-muted

      transition
      "
    >
      <Bell size={18} />

      {count > 0 && (
        <span
          className="
          absolute
          -top-2
          -right-2

          h-5
          w-5

          rounded-full

          bg-red-500

          text-white
          text-xs

          flex
          items-center
          justify-center
          "
        >
          {count}
        </span>
      )}
    </div>
  );
}