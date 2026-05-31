"use client";

import { useState } from "react";

import {
  Loader2,
  CheckCircle2,
  PlayCircle,
  Lock,
} from "lucide-react";

import { useQueryClient } from "@tanstack/react-query";

import { WorkflowService } from "@/services/workflow.service";

interface Props {
  ticket: any;
}

export function TicketWorkflow({
  ticket,
}: Props) {
  const queryClient =
    useQueryClient();

  const [loading, setLoading] =
    useState(false);

  const refresh = async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: [
          "ticket",
          ticket.id,
        ],
      }),

      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      }),

      queryClient.invalidateQueries({
        queryKey: [
          "timeline",
          ticket.id,
        ],
      }),
    ]);
  };

  const execute = async (
    action: () => Promise<any>,
  ) => {
    try {
      setLoading(true);

      await action();

      await refresh();
    } catch (error) {
      console.error(error);

      alert("Aksi gagal");
    } finally {
      setLoading(false);
    }
  };

  /*
   * Assignment masih diproses
   * di AssignmentSection
   */
  if (
    ticket.status === "OPEN" ||
    ticket.status ===
      "ASSIGNMENT_REQUEST"
  ) {
    return null;
  }

  /*
   * Ticket selesai
   */
  if (
    ticket.status === "CLOSED"
  ) {
    return (
      <div
        className="
        rounded-2xl
        border
        bg-green-500/10
        border-green-500/30

        p-4
        "
      >
        <div
          className="
          flex
          items-center
          gap-3
          "
        >
          <CheckCircle2
            size={20}
            className="
            text-green-500
            "
          />

          <div>
            <p
              className="
              font-semibold
              "
            >
              Ticket Closed
            </p>

            <p
              className="
              text-sm
              text-muted-foreground
              "
            >
              Ticket telah selesai
              dan ditutup.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const workflows = {
    ASSIGNED: {
      title:
        "Ticket Assigned",

      description:
        "Mulai pengerjaan ticket.",

      button:
        "Start Working",

      icon: (
        <PlayCircle size={18} />
      ),

      action: () =>
        WorkflowService.start(
          ticket.id,
        ),
    },

    IN_PROGRESS: {
      title:
        "Ticket In Progress",

      description:
        "Tandai ticket sebagai selesai.",

      button:
        "Resolve Ticket",

      icon: (
        <CheckCircle2
          size={18}
        />
      ),

      action: () =>
        WorkflowService.resolve(
          ticket.id,
        ),
    },

    RESOLVED: {
      title:
        "Ticket Resolved",

      description:
        "Tutup ticket setelah diverifikasi.",

      button:
        "Close Ticket",

      icon: (
        <Lock size={18} />
      ),

      action: () =>
        WorkflowService.close(
          ticket.id,
        ),
    },
  };

  const current =
    workflows[
      ticket.status as keyof typeof workflows
    ];

  if (!current) {
    return null;
  }

  return (
    <div
      className="
      rounded-2xl
      border
      bg-card

      p-5

      space-y-4
      "
    >
      <div>
        <h3
          className="
          font-semibold
          "
        >
          {current.title}
        </h3>

        <p
          className="
          text-sm
          text-muted-foreground
          mt-1
          "
        >
          {current.description}
        </p>
      </div>

      <button
        disabled={loading}
        onClick={() =>
          execute(
            current.action,
          )
        }
        className="
        h-11
        w-full

        rounded-xl

        bg-blue-600

        text-white

        font-medium

        flex
        items-center
        justify-center

        gap-2

        hover:bg-blue-700

        disabled:opacity-50

        transition
        "
      >
        {loading ? (
          <Loader2
            size={18}
            className="
            animate-spin
            "
          />
        ) : (
          current.icon
        )}

        {current.button}
      </button>
    </div>
  );
}