"use client";

import { useState }
from "react";

import {
  Bell,
  CheckCircle2,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  useNotifications,
} from "@/hooks/use-notifications";

import {
  useReadNotification,
} from "@/hooks/use-read-notification";

import {
  useReadAllNotifications,
} from "@/hooks/use-read-all-notifications";

export function NotificationsPage() {
  const {
    data = [],
    isLoading,
  } =
    useNotifications();

  const readNotification =
    useReadNotification();

  const readAll =
    useReadAllNotifications();

  const [filter,
    setFilter] =
    useState("ALL");

  const notifications =
    data.filter(
      (item: any) => {
        if (
          filter ===
          "UNREAD"
        ) {
          return (
            !item.isRead
          );
        }

        if (
          filter ===
          "READ"
        ) {
          return (
            item.isRead
          );
        }

        return true;
      },
    );

  return (
    <div
      className="
      max-w-5xl
      mx-auto

      space-y-6
      "
    >
      <div
        className="
        flex
        flex-col

        md:flex-row

        md:items-center
        md:justify-between

        gap-4
        "
      >
        <div>
          <h1
            className="
            text-2xl
            font-bold
            "
          >
            Notifications
          </h1>

          <p
            className="
            text-muted-foreground
            "
          >
            Semua aktivitas
            ticket dan sistem
          </p>
        </div>

        <Button
          onClick={() =>
            readAll.mutate()
          }
        >
          Mark All Read
        </Button>
      </div>

      <div
        className="
        flex
        gap-2
        "
      >
        <Button
          variant={
            filter ===
            "ALL"
              ? "default"
              : "outline"
          }
          onClick={() =>
            setFilter(
              "ALL",
            )
          }
        >
          All
        </Button>

        <Button
          variant={
            filter ===
            "UNREAD"
              ? "default"
              : "outline"
          }
          onClick={() =>
            setFilter(
              "UNREAD",
            )
          }
        >
          Unread
        </Button>

        <Button
          variant={
            filter ===
            "READ"
              ? "default"
              : "outline"
          }
          onClick={() =>
            setFilter(
              "READ",
            )
          }
        >
          Read
        </Button>
      </div>

      <div
        className="
        space-y-3
        "
      >
        {isLoading && (
          <div>
            Loading...
          </div>
        )}

        {!isLoading &&
          notifications.length ===
            0 && (
            <div
              className="
              rounded-3xl
              border

              p-12

              text-center
              "
            >
              <Bell
                className="
                mx-auto
                mb-4
                "
              />

              Tidak ada
              notifikasi
            </div>
          )}

        {notifications.map(
          (
            item: any,
          ) => (
            <div
              key={item.id}
              className={`
              rounded-3xl
              border

              p-5

              transition

              ${
                !item.isRead
                  ? "bg-blue-50 dark:bg-blue-950/20"
                  : ""
              }
              `}
            >
              <div
                className="
                flex
                justify-between

                gap-4
                "
              >
                <div>
                  <h3
                    className="
                    font-semibold
                    "
                  >
                    {
                      item.title
                    }
                  </h3>

                  <p
                    className="
                    text-sm
                    text-muted-foreground
                    mt-1
                    "
                  >
                    {
                      item.message
                    }
                  </p>

                  <p
                    className="
                    text-xs
                    text-muted-foreground
                    mt-3
                    "
                  >
                    {new Date(
                      item.createdAt,
                    ).toLocaleString()}
                  </p>
                </div>

                {!item.isRead && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      readNotification.mutate(
                        item.id,
                      )
                    }
                  >
                    <CheckCircle2
                      size={
                        16
                      }
                    />

                    Read
                  </Button>
                )}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}