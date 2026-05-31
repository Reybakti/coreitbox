"use client";

import { useState } from "react";

import {
  Check,
  X,
  User,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  useAssignmentRequests,
} from "@/hooks/use-assignment-requests";

import {
  useRequestAssignment,
} from "@/hooks/use-request-assignment";

import {
  useApproveAssignment,
} from "@/hooks/use-approve-assignment";

import {
  useRejectAssignment,
} from "@/hooks/use-reject-assignment";

export function AssignmentSection({
  ticketId,
  currentUser,
}: {
  ticketId: string;
  currentUser: any;
}) {
  const [note, setNote] =
    useState("");

  const {
    data = [],
  } =
    useAssignmentRequests(
      ticketId,
    );

  const requestMutation =
    useRequestAssignment(
      ticketId,
    );

  const approveMutation =
    useApproveAssignment(
      ticketId,
    );

  const rejectMutation =
    useRejectAssignment(
      ticketId,
    );

  const isTechnician =
    currentUser?.role ===
    "TEKNISI";

  const canApprove =
    currentUser?.role ===
      "ADMIN" ||
    currentUser?.role ===
      "SYSADMIN";

  return (
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
        <User size={18} />

        <h2
          className="
          text-lg
          font-semibold
          "
        >
          Assignment Request
        </h2>
      </div>

      {isTechnician && (
        <div
          className="
          border
          rounded-2xl
          p-4
          mb-6
          "
        >
          <Textarea
            value={note}
            onChange={(e) =>
              setNote(
                e.target.value,
              )
            }
            placeholder="
            Saya siap menangani ticket ini...
            "
          />

          <Button
            className="
            mt-3
            "
            onClick={() =>
              requestMutation.mutate(
                note,
              )
            }
          >
            <Send
              size={16}
              className="mr-2"
            />
            Request Assignment
          </Button>
        </div>
      )}

      {!data.length && (
        <div
          className="
          border
          border-dashed
          rounded-2xl
          p-8
          text-center
          text-muted-foreground
          "
        >
          Belum ada request
        </div>
      )}

      <div
        className="
        space-y-4
        "
      >
        {data.map(
          (request: any) => (
            <div
              key={request.id}
              className="
              border
              rounded-2xl
              p-4
              "
            >
              <div
                className="
                flex
                items-start
                justify-between
                gap-4
                "
              >
                <div
                  className="
                  min-w-0
                  flex-1
                  "
                >
                  <h4
                    className="
                    font-medium
                    truncate
                    "
                  >
                    {
                      request
                        .technician
                        ?.fullName
                    }
                  </h4>

                  <p
                    className="
                    text-xs
                    text-muted-foreground
                    mt-1
                    "
                  >
                    {
                      request.status
                    }
                  </p>

                  {request.note && (
                    <p
                      className="
                      mt-3
                      text-sm
                      break-words
                      "
                    >
                      {
                        request.note
                      }
                    </p>
                  )}
                </div>

                {canApprove &&
                  request.status ===
                    "PENDING" && (
                    <div
                      className="
                      flex
                      gap-2
                      shrink-0
                      "
                    >
                      <Button
                        size="sm"
                        onClick={() =>
                          approveMutation.mutate(
                            request.id,
                          )
                        }
                      >
                        <Check
                          size={16}
                        />
                      </Button>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          rejectMutation.mutate(
                            request.id,
                          )
                        }
                      >
                        <X
                          size={16}
                        />
                      </Button>
                    </div>
                  )}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}