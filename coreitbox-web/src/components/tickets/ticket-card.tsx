"use client";

import Link from "next/link";

import { Ticket } from "@/types/ticket";

import {
  Badge,
} from "@/components/ui/badge";

interface Props {
  ticket: Ticket;
}

function getPriorityVariant(
  priority: string,
) {
  switch (priority) {
    case "CRITICAL":
      return "destructive";

    case "HIGH":
      return "destructive";

    default:
      return "secondary";
  }
}

export function TicketCard({
  ticket,
}: Props) {
  return (
    <Link
      href={`/tickets/${ticket.id}`}
      className="block"
    >
      <div
        className="
        border
        rounded-2xl

        bg-card

        p-4

        hover:border-primary
        hover:shadow-md

        transition-all
        duration-200
        "
      >
        <div
          className="
          flex
          justify-between
          items-start
          gap-3
          "
        >
          <div
            className="
            min-w-0
            flex-1
            "
          >
            <h3
              className="
              font-semibold

              truncate
              "
            >
              {ticket.title}
            </h3>

            <div className="text-sm text-muted-foreground">
  {ticket.category?.name}
</div>

            <p
              className="
              text-xs
              text-muted-foreground

              mt-1
              "
            >
              {ticket.ticketNumber}
            </p>
          </div>

          <Badge
            variant={getPriorityVariant(
              ticket.priority,
            )}
          >
            {ticket.priority}
          </Badge>
        </div>

        <div
          className="
          mt-4

          flex
          items-center
          justify-between
          "
        >
          <Badge
            variant="secondary"
          >
            {ticket.status}
          </Badge>

          <span
            className="
            text-xs
            text-muted-foreground
            "
          >
            Detail →
          </span>
        </div>
      </div>
    </Link>
  );
}