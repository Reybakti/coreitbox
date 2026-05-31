"use client";

import {
  useState,
} from "react";

import {
  Send,
} from "lucide-react";

import {
  useCreateComment,
} from "@/hooks/use-create-comment";

export function CreateCommentForm({
  ticketId,
}: {
  ticketId: string;
}) {
  const [message, setMessage] =
    useState("");

  const mutation =
    useCreateComment(
      ticketId,
    );

  const submit =
    async () => {
      if (!message.trim())
        return;

      await mutation.mutateAsync(
        message,
      );

      setMessage("");
    };

  return (
    <div className="space-y-3">
      <textarea
        value={message}
        onChange={(e) =>
          setMessage(
            e.target.value,
          )
        }
        placeholder="Tulis komentar..."
        className="
        w-full

        min-h-[120px]

        rounded-2xl

        border

        bg-background

        p-3

        resize-none
        "
      />

      <div
        className="
        flex
        justify-end
        "
      >
        <button
          onClick={submit}
          disabled={
            mutation.isPending
          }
          className="
          h-10

          px-4

          rounded-xl

          bg-blue-600

          text-white

          flex
          items-center
          gap-2
          "
        >
          <Send size={16} />

          Kirim
        </button>
      </div>
    </div>
  );
}