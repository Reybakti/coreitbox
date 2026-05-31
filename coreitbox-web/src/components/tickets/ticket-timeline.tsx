"use client";

import {
  useTicketTimeline,
} from "@/hooks/use-ticket-timeline";

interface Props {
  ticketId: string;
}

export function TicketTimeline({
  ticketId,
}: Props) {
  const {
    data,
    isLoading,
  } =
    useTicketTimeline(
      ticketId,
    );

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div
        className="
        text-sm
        text-muted-foreground
        "
      >
        Belum ada aktivitas
      </div>
    );
  }

  return (
    <div
       className="
  max-h-[500px]

  overflow-y-auto

  pr-2

  space-y-5
  "
    >
    
      {data.map(
        (
          item: any,
        ) => (
          <div
            key={item.id}
            className="
            flex
            gap-4
            "
          >
            <div>
              <div
                className="
                h-3
                w-3

                rounded-full

                bg-blue-600
                "
              />
            </div>

            <div>
              <p
                className="
                font-medium
                "
              >
                {
                  item.action
                }
              </p>

              <p
                className="
                text-sm

                text-muted-foreground
                "
              >
                {
                  item.description
                }
              </p>

              <p
                className="
                text-xs

                text-muted-foreground

                mt-1
                "
              >
                {new Date(
                  item.createdAt,
                ).toLocaleString(
                  "id-ID",
                )}
              </p>
            </div>
          </div>
        ),
      )}
    </div>
  );
}