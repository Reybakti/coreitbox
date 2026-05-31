"use client";

import { useParams } from "next/navigation";

import { useTicket } from "@/hooks/use-ticket";

import { TicketHero } from "@/components/tickets/ticket-hero";

import {
  TicketTimeline,
} from "@/components/tickets/ticket-timeline";

import {
  useState,
} from "react";

import {
  Clock3,
  FileText,
  Package,
  MessageSquare,
  Paperclip,
} from "lucide-react";

import {
  CommentsSection,
} from "@/components/tickets/comments-section";

import {
  DocumentationSection,
} from "@/components/tickets/documentation-section";

import {
  MaterialsSection,
} from "@/components/tickets/materials-section";

import {
  AttachmentsSection,
} from "@/components/tickets/attachments-section";

import {
  TicketWorkflow,
} from "@/components/tickets/ticket-workflow";

import {
  AssignmentSection,
} from "@/components/tickets/assignment-section";

import {
  useAuth,
} from "@/hooks/use-auth";

export default function TicketDetailPage() {
  const params = useParams();

  const id = params.id as string;

  const {
    data: ticket,
    isLoading,
  } = useTicket(id);

  const [
  showDescription,
  setShowDescription,
] = useState(false);

const { user } = useAuth();


  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="h-72 rounded-3xl bg-muted animate-pulse" />

        <div className="h-40 rounded-3xl bg-muted animate-pulse" />

        <div className="h-40 rounded-3xl bg-muted animate-pulse" />
      </div>
    );
  }

  if (!ticket) {
    return (
      <div
        className="
        rounded-3xl
        border
        p-10
        text-center
        "
      >
        Ticket tidak ditemukan
      </div>
    );
  }

  return (
    <>
      <div
        className="
        max-w-7xl
        mx-auto

        grid
        gap-6

        lg:grid-cols-[1fr_340px]
        "
      >
        {/* CONTENT */}

        <div className="space-y-5">
          <TicketHero ticket={ticket} />

          {/* DESCRIPTION */}

          <section
  className="
  rounded-3xl
  border
  bg-card

  p-5
  lg:p-6
  "
>
  <h2
    className="
    text-lg
    font-semibold
    mb-4
    "
  >
    Deskripsi Ticket
  </h2>

  <div
    className={`
      text-sm
      leading-7
      text-muted-foreground
      break-words

      ${
        showDescription
          ? ""
          : "line-clamp-6"
      }
    `}
  >
    {ticket.description}
  </div>

  {ticket.description?.length >
    300 && (
    <button
      onClick={() =>
        setShowDescription(
          !showDescription,
        )
      }
      className="
      mt-3

      text-sm
      font-medium

      text-blue-600
      hover:text-blue-500
      "
    >
      {showDescription
        ? "Tampilkan lebih sedikit"
        : "Lihat selengkapnya"}
    </button>
  )}
</section>

          {/* TIMELINE */}
            <h1>Timeline</h1>
          <TicketTimeline
  ticketId={id}
/>

{/* assignment */}
<AssignmentSection
  ticketId={id}
  currentUser={user}
/>

          {/* COMMENTS */}

          <section
            className="
            rounded-3xl
            border
            bg-card

            p-5
            lg:p-6
            "
          >
            <div
              className="
              flex
              items-center
              gap-2

              mb-5
              "
            >
              <MessageSquare
                size={18}
              />

              <h2
                className="
                font-semibold
                text-lg
                "
              >
                Komentar
              </h2>
            </div>

            <CommentsSection
  ticketId={id}
/>
          </section>

          {/* DOCUMENTATION */}

          <section
            className="
            rounded-3xl
            border
            bg-card

            p-5
            lg:p-6
            "
          >
            <div
              className="
              flex
              items-center
              gap-2

              mb-5
              "
            >
              <FileText size={18} />

              <h2
                className="
                font-semibold
                text-lg
                "
              >
                Dokumentasi
              </h2>
            </div>

            <DocumentationSection
  ticketId={id}
/>
          </section>

          {/* MATERIALS */}

          <section
            className="
            rounded-3xl
            border
            bg-card

            p-5
            lg:p-6
            "
          >
            <div
              className="
              flex
              items-center
              gap-2

              mb-5
              "
            >
              <Package size={18} />

              <h2
                className="
                font-semibold
                text-lg
                "
              >
                Material
              </h2>
            </div>

            <MaterialsSection
  ticketId={id}
/>
          </section>

          {/* ATTACHMENTS */}

          <section
            className="
            rounded-3xl
            border
            bg-card

            p-5
            lg:p-6
            "
          >
            <div
              className="
              flex
              items-center
              gap-2

              mb-5
              "
            >
              <Paperclip
                size={18}
              />

              <h2
                className="
                font-semibold
                text-lg
                "
              >
                Lampiran
              </h2>
            </div>

            <AttachmentsSection
  ticketId={id}
/>
          </section>
        </div>

        {/* DESKTOP SIDEBAR */}

        <aside
  className="
  hidden
  lg:block
  "
>
  <div
    className="
    sticky
    top-0

    max-h-[calc(100vh-6rem)]

    overflow-y-auto
    "
  >
    <div
      className="
      rounded-3xl

      border

      bg-card

      p-5
      "
    >
      <div
        className="
        flex
        items-center
        justify-between

        mb-5
        "
      >
        <h3
          className="
          font-semibold
          "
        >
          Informasi Ticket
        </h3>

        <span
          className="
          text-xs

          text-muted-foreground
          "
        >
          Detail
        </span>
      </div>

      <div
        className="
        space-y-3
        "
      >
        <InfoItem
          label="Ticket Number"
          value={ticket.ticketNumber}
        />

        <InfoItem
          label="Status"
          value={ticket.status}
        />

        <InfoItem
          label="Priority"
          value={ticket.priority}
        />

        <InfoItem
          label="Creator"
          value={
            ticket.creator?.fullName ??
            "-"
          }
        />

        <InfoItem
          label="Assignee"
          value={
            ticket.assignee?.fullName ??
            "Belum Assigned"
          }
        />

        <InfoItem
          label="Category"
          value={
            ticket.category?.name ??
            "-"
          }
        />
      </div>
      <div
  className="
  mt-6

  border-t

  pt-6
  "
>
  <TicketWorkflow
    ticket={ticket}
  />
</div>
    </div>
  </div>
</aside>
      </div>

      {/* MOBILE ACTION BAR */}

      <div
  className="
  lg:hidden

  fixed

  bottom-20
  left-4
  right-4

  z-50
  "
>
  <div
    className="
    rounded-2xl

    border

    bg-background

    p-3

    shadow-xl
    "
  >
    <TicketWorkflow
      ticket={ticket}
    />
  </div>
</div>
    </>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p
        className="
        text-xs

        text-muted-foreground
        "
      >
        {label}
      </p>

      <p
        className="
        mt-1

        font-medium
        "
      >
        {value}
      </p>
    </div>
  );
}

function EmptyState({
  title,
}: {
  title: string;
}) {
  return (
    <div
      className="
      rounded-2xl

      border
      border-dashed

      p-6

      text-center
      "
    >
      <p
        className="
        text-sm

        text-muted-foreground
        "
      >
        {title}
      </p>
    </div>
  );
}

function TimelineItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      className="
      flex
      gap-4
      "
    >
      <div
        className="
        relative
        "
      >
        <div
          className="
          h-3
          w-3

          rounded-full

          bg-blue-600
          "
        />

        <div
          className="
          absolute

          top-3
          left-[5px]

          h-10
          w-px

          bg-border
          "
        />
      </div>

      <div>
        <p className="font-medium">
          {title}
        </p>

        <p
          className="
          text-sm

          text-muted-foreground
          "
        >
          {description}
        </p>
      </div>
    </div>
  );
}