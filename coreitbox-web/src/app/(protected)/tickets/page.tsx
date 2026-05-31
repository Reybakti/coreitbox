"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  Plus,
  Tags,
  Search,
} from "lucide-react";

import { useTickets } from "@/hooks/use-tickets";

import { TicketCard } from "@/components/tickets/ticket-card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const PAGE_SIZE = 20;

export default function TicketsPage() {
  const { data, isLoading } =
    useTickets();

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("ALL");

  const [priority, setPriority] =
    useState("ALL");

  const [page, setPage] =
    useState(1);

  const filteredTickets =
    useMemo(() => {
      if (!data) return [];

      return data.filter(
        (ticket: any) => {
          const matchesSearch =
            search === "" ||
            ticket.ticketNumber
              ?.toLowerCase()
              .includes(
                search.toLowerCase(),
              ) ||
            ticket.title
              ?.toLowerCase()
              .includes(
                search.toLowerCase(),
              ) ||
            ticket.description
              ?.toLowerCase()
              .includes(
                search.toLowerCase(),
              );

          const matchesStatus =
            status === "ALL" ||
            ticket.status === status;

          const matchesPriority =
            priority === "ALL" ||
            ticket.priority ===
              priority;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesPriority
          );
        },
      );
    }, [
      data,
      search,
      status,
      priority,
    ]);

  const totalPages =
    Math.ceil(
      filteredTickets.length /
        PAGE_SIZE,
    ) || 1;

  const paginatedTickets =
    filteredTickets.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE,
    );

  const summary =
    useMemo(() => {
      return {
        total:
          data?.length || 0,

        open:
          data?.filter(
            (t: any) =>
              t.status ===
              "OPEN",
          ).length || 0,

        progress:
          data?.filter(
            (t: any) =>
              t.status ===
              "IN_PROGRESS",
          ).length || 0,

        closed:
          data?.filter(
            (t: any) =>
              t.status ===
              "CLOSED",
          ).length || 0,
      };
    }, [data]);

  if (isLoading) {
    return (
      <div className="py-10 text-center">
        Loading tickets...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div
        className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-3
      "
      >
        <div>
          <h1 className="text-2xl font-bold">
            Tickets
          </h1>

          <p
            className="
            text-sm
            text-muted-foreground
          "
          >
            Kelola ticket IT
          </p>
        </div>

        <div className="flex gap-2">
          <Link href="/tickets/categories">
            <Button variant="outline">
              <Tags size={16} />
              Category
            </Button>
          </Link>

          <Link href="/tickets/create">
            <Button>
              <Plus size={16} />
              Create Ticket
            </Button>
          </Link>
        </div>
      </div>

      {/* SUMMARY */}

      <div
        className="
        grid
        gap-4
        md:grid-cols-4
      "
      >
        <SummaryCard
          title="Total"
          value={summary.total}
        />

        <SummaryCard
          title="Open"
          value={summary.open}
        />

        <SummaryCard
          title="In Progress"
          value={summary.progress}
        />

        <SummaryCard
          title="Closed"
          value={summary.closed}
        />
      </div>

      {/* FILTER */}

      <div
        className="
        grid
        gap-3
        md:grid-cols-3
      "
      >
        <div className="relative">
          <Search
            size={16}
            className="
            absolute
            left-3
            top-3
            text-muted-foreground
          "
          />

          <Input
            placeholder="Search ticket..."
            value={search}
            onChange={(e) => {
              setSearch(
                e.target.value,
              );
              setPage(1);
            }}
            className="pl-9"
          />
        </div>

        <select
          value={status}
          onChange={(e) => {
            setStatus(
              e.target.value,
            );
            setPage(1);
          }}
          className="
          h-10
          rounded-md
          border
          bg-background
          px-3
        "
        >
          <option value="ALL">
            All Status
          </option>

          <option value="OPEN">
            Open
          </option>

          <option value="ASSIGNED">
            Assigned
          </option>

          <option value="IN_PROGRESS">
            In Progress
          </option>

          <option value="RESOLVED">
            Resolved
          </option>

          <option value="CLOSED">
            Closed
          </option>
        </select>

        <select
          value={priority}
          onChange={(e) => {
            setPriority(
              e.target.value,
            );
            setPage(1);
          }}
          className="
          h-10
          rounded-md
          border
          bg-background
          px-3
        "
        >
          <option value="ALL">
            All Priority
          </option>

          <option value="LOW">
            Low
          </option>

          <option value="MEDIUM">
            Medium
          </option>

          <option value="HIGH">
            High
          </option>

          <option value="CRITICAL">
            Critical
          </option>
        </select>
      </div>

      {/* RESULT */}

      <div
        className="
        text-sm
        text-muted-foreground
      "
      >
        Showing{" "}
        {paginatedTickets.length} of{" "}
        {filteredTickets.length} tickets
      </div>

      {/* LIST */}

      <div className="grid gap-4">
        {paginatedTickets.length >
        0 ? (
          paginatedTickets.map(
            (
              ticket: any,
            ) => (
              <TicketCard
                key={
                  ticket.id
                }
                ticket={
                  ticket
                }
              />
            ),
          )
        ) : (
          <div
            className="
            rounded-lg
            border
            p-8
            text-center
            text-muted-foreground
          "
          >
            No tickets found
          </div>
        )}
      </div>

      {/* PAGINATION */}

      <div
        className="
        flex
        justify-center
        gap-2
      "
      >
        <Button
          variant="outline"
          disabled={
            page === 1
          }
          onClick={() =>
            setPage(
              page - 1,
            )
          }
        >
          Previous
        </Button>

        <div
          className="
          flex
          items-center
          px-3
          text-sm
        "
        >
          Page {page} of{" "}
          {totalPages}
        </div>

        <Button
          variant="outline"
          disabled={
            page ===
            totalPages
          }
          onClick={() =>
            setPage(
              page + 1,
            )
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div
      className="
      rounded-lg
      border
      p-4
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

      <p
        className="
        text-2xl
        font-bold
      "
      >
        {value}
      </p>
    </div>
  );
}