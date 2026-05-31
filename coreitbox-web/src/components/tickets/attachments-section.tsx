"use client";

import {
  Paperclip,
} from "lucide-react";

import {
  useAttachments,
} from "@/hooks/use-attachments";

import {
  AttachmentUpload,
} from "./attachment-upload";

import {
  AttachmentCard,
} from "./attachment-card";

export function AttachmentsSection({
  ticketId,
}: {
  ticketId: string;
}) {
  const {
    data,
    isLoading,
  } = useAttachments(
    ticketId,
  );

  if (isLoading) {
    return (
      <div
        className="
        rounded-3xl
        border
        p-6
        "
      >
        Loading...
      </div>
    );
  }

  const attachments =
    data ?? [];

  return (
    <div className="space-y-5">
      <AttachmentUpload
        ticketId={ticketId}
      />

      {attachments.length ===
        0 && (
        <div
          className="
          rounded-3xl

          border
          border-dashed

          p-10

          text-center
          "
        >
          <div
            className="
            mx-auto

            mb-4

            flex
            h-14
            w-14

            items-center
            justify-center

            rounded-2xl

            bg-muted
            "
          >
            <Paperclip
              size={24}
            />
          </div>

          <h3
            className="
            font-semibold
            "
          >
            Belum ada lampiran
          </h3>

          <p
            className="
            mt-2

            text-sm

            text-muted-foreground
            "
          >
            Upload foto pekerjaan,
            invoice,
            screenshot,
            PDF,
            atau dokumen pendukung.
          </p>
        </div>
      )}

      {attachments.length >
        0 && (
        <div
          className="
          max-h-[700px]

          overflow-y-auto

          pr-1

          lg:pr-2
          "
        >
          <div
            className="
            grid

            grid-cols-2

            gap-4

            md:grid-cols-3

            xl:grid-cols-4
            "
          >
            {attachments.map(
              (
                attachment: any,
              ) => (
                <AttachmentCard
                  key={
                    attachment.id
                  }
                  attachment={
                    attachment
                  }
                />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}