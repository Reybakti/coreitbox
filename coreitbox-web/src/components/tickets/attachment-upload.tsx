"use client";

import {
  UploadCloud,
  Loader2,
} from "lucide-react";

import {
  useUploadAttachment,
} from "@/hooks/use-upload-attachment";

export function AttachmentUpload({
  ticketId,
}: {
  ticketId: string;
}) {
  const mutation =
    useUploadAttachment(
      ticketId,
    );

  const handleUpload =
    async (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      const files =
        Array.from(
          e.target.files || [],
        );

      if (!files.length)
        return;

      for (const file of files) {
        if (
          file.size >
          10 * 1024 * 1024
        ) {
          alert(
            `${file.name} melebihi 10MB`,
          );
          continue;
        }

        await mutation.mutateAsync(
          file,
        );
      }

      e.target.value = "";
    };

  return (
    <label
      className="
      flex
      flex-col

      items-center
      justify-center

      gap-3

      h-40

      rounded-3xl

      border-2
      border-dashed

      cursor-pointer

      hover:bg-muted/30

      transition
      "
    >
      {mutation.isPending ? (
        <Loader2
          className="
          animate-spin
          "
          size={28}
        />
      ) : (
        <UploadCloud
          size={28}
        />
      )}

      <div
        className="
        text-center
        "
      >
        <h3
          className="
          font-semibold
          "
        >
          Upload Lampiran
        </h3>

        <p
          className="
          text-sm

          text-muted-foreground
          "
        >
          JPG, PNG, PDF,
          DOCX, XLSX
        </p>
      </div>

      <input
        multiple
        capture="environment"
        type="file"
        accept="
          image/*,
          application/pdf,
          .docx,
          .xlsx
        "
        className="hidden"
        onChange={
          handleUpload
        }
      />
    </label>
  );
}