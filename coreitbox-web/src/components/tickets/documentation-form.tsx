"use client";

import {
  useState,
} from "react";

import {
  FilePlus,
} from "lucide-react";

import {
  useCreateDocumentation,
} from "@/hooks/use-create-documentation";

export function DocumentationForm({
  ticketId,
}: {
  ticketId: string;
}) {
  const [description, setDescription] =
    useState("");

  const mutation =
    useCreateDocumentation(
      ticketId,
    );

  const submit =
    async () => {
      if (
        !description.trim()
      )
        return;

      await mutation.mutateAsync(
        description,
      );

      setDescription("");
    };

  return (
    <div className="space-y-3">
      <textarea
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value,
          )
        }
        placeholder="Tulis dokumentasi pekerjaan..."
        className="
        w-full

        min-h-[140px]

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
          <FilePlus
            size={16}
          />

          Tambah Dokumentasi
        </button>
      </div>
    </div>
  );
}