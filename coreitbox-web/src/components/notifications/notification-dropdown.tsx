"use client";

import {
  useNotifications,
} from "@/hooks/use-notifications";

import {
  useReadNotification,
} from "@/hooks/use-read-notification";

import {
  useReadAllNotifications,
} from "@/hooks/use-read-all-notifications";

export function NotificationDropdown() {
  const {
    data,
    isLoading,
  } = useNotifications();

  const readMutation =
    useReadNotification();

  const readAllMutation =
    useReadAllNotifications();

  return (
    <div
      className="
      flex
      flex-col
      max-h-[70vh]
      "
    >
      <div
        className="
        sticky
        top-0
        z-10

        bg-background

        p-4
        border-b

        flex
        items-center
        justify-between
        "
      >
        <h3
          className="
          font-semibold
          "
        >
          Notifications
        </h3>

        {data?.length ? (
          <button
            onClick={() =>
              readAllMutation.mutate()
            }
            className="
            text-xs
            font-medium
            text-primary
            hover:underline
            "
          >
            Mark All Read
          </button>
        ) : null}
      </div>

      <div
        className="
        overflow-y-auto
        "
      >
        {isLoading && (
          <div
            className="
            p-6
            text-center
            text-muted-foreground
            "
          >
            Loading...
          </div>
        )}

        {!isLoading &&
          !data?.length && (
            <div
              className="
              p-8
              text-center
              text-muted-foreground
              "
            >
              Tidak ada notifikasi
            </div>
          )}

        {data?.map(
          (item: any) => (
            <button
              key={item.id}
              onClick={() =>
                readMutation.mutate(
                  item.id,
                )
              }
              className={`
                w-full
                text-left

                p-4

                border-b

                hover:bg-muted/60

                transition

                ${
                  !item.isRead
                    ? "bg-primary/5"
                    : ""
                }
              `}
            >
              <div
                className="
                flex
                gap-3
                "
              >
                {!item.isRead && (
                  <span
                    className="
                    mt-2
                    h-2
                    w-2
                    shrink-0
                    rounded-full
                    bg-primary
                    "
                  />
                )}

                <div
                  className="
                  min-w-0
                  flex-1
                  "
                >
                  <p
                    className="
                    font-medium
                    truncate
                    "
                  >
                    {item.title}
                  </p>

                  <p
                    className="
                    text-sm
                    text-muted-foreground
                    line-clamp-2
                    "
                  >
                    {item.message}
                  </p>
                </div>
              </div>
            </button>
          ),
        )}
      </div>
    </div>
  );
}