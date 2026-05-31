"use client";

import {
  useEffect,
} from "react";

import {
  useQueryClient,
} from "@tanstack/react-query";

import {
  toast,
} from "sonner";

import {
  socket,
} from "@/lib/socket";

import {
  playNotificationSound,
} from "@/lib/notification-sound";

import {
  showBrowserNotification,
} from "@/lib/browser-notification";

import {
  useAuth,
} from "@/hooks/use-auth";

export function useNotificationSocket() {
  const queryClient =
    useQueryClient();

  const {
    user,
  } = useAuth();

  useEffect(() => {
    if (!user?.sub) {
      return;
    }

    const onConnect =
      () => {
        console.log(
          "SOCKET CONNECTED",
          socket.id,
        );

        socket.emit(
          "join-user",
          user.sub,
        );
      };

    const onDisconnect =
      () => {
        console.log(
          "SOCKET DISCONNECTED",
        );
      };

    const onNotification =
      (data: any) => {
        console.log(
          "NOTIFICATION RECEIVED",
          data,
        );

        // Sound
        playNotificationSound();

        // Toast
        toast(
          data.title,
          {
            description:
              data.message,
          },
        );

        // OS Notification
        showBrowserNotification(
          data.title,
          data.message,
        );

        // Refresh notification list
        queryClient.invalidateQueries(
          {
            queryKey: [
              "notifications",
            ],
          },
        );

        queryClient.invalidateQueries(
          {
            queryKey: [
              "notifications-unread",
            ],
          },
        );
      };

    const onTicketUpdated =
      (data: any) => {
        console.log(
          "TICKET UPDATED",
          data,
        );

        queryClient.invalidateQueries(
          {
            queryKey: [
              "tickets",
            ],
          },
        );

        queryClient.invalidateQueries(
          {
            queryKey: [
              "dashboard",
            ],
          },
        );

        queryClient.invalidateQueries(
          {
            queryKey: [
              "reports",
            ],
          },
        );
      };

    socket.on(
      "connect",
      onConnect,
    );

    socket.on(
      "disconnect",
      onDisconnect,
    );

    socket.on(
      "notification",
      onNotification,
    );

    socket.on(
      "ticket-updated",
      onTicketUpdated,
    );

    if (!socket.connected) {
      socket.connect();
    } else {
      onConnect();
    }

    return () => {
      socket.off(
        "connect",
        onConnect,
      );

      socket.off(
        "disconnect",
        onDisconnect,
      );

      socket.off(
        "notification",
        onNotification,
      );

      socket.off(
        "ticket-updated",
        onTicketUpdated,
      );
    };
  }, [
    user?.sub,
    queryClient,
  ]);
}