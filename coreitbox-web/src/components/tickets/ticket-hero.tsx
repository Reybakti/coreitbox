"use client";

import Link from "next/link";

import {
  ArrowLeft,
  User,
  Calendar,
  UserCog,
  MoreVertical,
} from "lucide-react";

interface Props {
  ticket: any;
}

function Chip({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      className="
      px-3
      py-1

      rounded-full

      text-xs
      font-medium

      bg-white/15

      backdrop-blur
      "
    >
      {children}
    </span>
  );
}

export function TicketHero({
  ticket,
}: Props) {
  return (
    <section
      className="
      relative

      overflow-hidden

      rounded-3xl

      bg-gradient-to-br
      from-blue-600
      via-blue-700
      to-cyan-700

      text-white

      shadow-lg

      p-5
      lg:p-8
      "
    >
      {/* Glow */}

      <div
        className="
        absolute

        -top-20
        -right-20

        h-56
        w-56

        rounded-full

        bg-white/10

        blur-3xl
        "
      />

      {/* Header */}

      <div
        className="
        relative

        flex
        items-center
        justify-between
        "
      >
        <Link
          href="/tickets"
          className="
          inline-flex
          items-center
          gap-2

          text-sm

          text-white/80

          hover:text-white
          "
        >
          <ArrowLeft size={16} />

          Tickets
        </Link>

        <button
          className="
          h-10
          w-10

          rounded-xl

          bg-white/10

          flex
          items-center
          justify-center

          hover:bg-white/20
          "
        >
          <MoreVertical
            size={18}
          />
        </button>
      </div>

      {/* Status */}

      <div className="mt-8">
        <span
          className="
          inline-flex

          px-3
          py-1

          rounded-full

          bg-white

          text-blue-700

          text-xs
          font-semibold
          "
        >
          {ticket.status}
        </span>
      </div>

      {/* Title */}

      <div className="mt-4">
        <h1
          className="
          text-2xl
          lg:text-4xl

          font-bold

          leading-tight
          "
        >
          {ticket.title}
        </h1>

        <p
          className="
          mt-2

          text-white/70

          text-sm
          "
        >
          #{ticket.ticketNumber}
        </p>
      </div>

      {/* Chips */}

      <div
        className="
        mt-6

        flex
        flex-wrap

        gap-2
        "
      >
        <Chip>
          {ticket.priority}
        </Chip>

        <Chip>
          {ticket.category?.name ??
            "General"}
        </Chip>

        <Chip>
          CoreITBox
        </Chip>
      </div>

      {/* Meta */}

      <div
        className="
        mt-8

        grid

        grid-cols-1
        sm:grid-cols-3

        gap-4
        "
      >
        <div
          className="
          rounded-2xl

          bg-white/10

          backdrop-blur

          p-4
          "
        >
          <div
            className="
            flex
            items-center
            gap-2

            text-white/70
            text-xs
            "
          >
            <User size={14} />
            Creator
          </div>

          <p
            className="
            mt-2

            font-medium
            "
          >
            {ticket.creator
              ?.fullName ??
              "-"}
          </p>
        </div>

        <div
          className="
          rounded-2xl

          bg-white/10

          backdrop-blur

          p-4
          "
        >
          <div
            className="
            flex
            items-center
            gap-2

            text-white/70
            text-xs
            "
          >
            <UserCog size={14} />
            Assignee
          </div>

          <p
            className="
            mt-2

            font-medium
            "
          >
            {ticket.assignee
              ?.fullName ??
              "Belum Assigned"}
          </p>
        </div>

        <div
          className="
          rounded-2xl

          bg-white/10

          backdrop-blur

          p-4
          "
        >
          <div
            className="
            flex
            items-center
            gap-2

            text-white/70
            text-xs
            "
          >
            <Calendar size={14} />
            Created
          </div>

          <p
            className="
            mt-2

            font-medium
            "
          >
            {new Date(
              ticket.createdAt,
            ).toLocaleDateString(
              "id-ID",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              },
            )}
          </p>
        </div>
      </div>
    </section>
  );
}