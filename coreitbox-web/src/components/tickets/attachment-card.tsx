"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  FileText,
  ImageIcon,
  Download,
} from "lucide-react";

import {
  AttachmentsService,
} from "@/services/attachments.service";

import {
  ImagePreviewDialog,
} from "./image-preview-dialog";

export function AttachmentCard({
  attachment,
}: {
  attachment: any;
}) {
  const [url, setUrl] =
    useState("");

  const [preview,
    setPreview] =
    useState(false);

  useEffect(() => {
    AttachmentsService
      .getUrl(
        attachment.id,
      )
      .then((res) =>
        setUrl(
          res.url,
        ),
      );
  }, [
    attachment.id,
  ]);

  const isImage =
    attachment.mimeType?.startsWith(
      "image/",
    );

  const ext =
    attachment.fileName
      ?.split(".")
      .pop()
      ?.toUpperCase();

  return (
    <>
      <div
        className="
        rounded-3xl

        border

        overflow-hidden

        bg-card

        hover:shadow-lg

        transition
        "
      >
        <div
          className="
          aspect-square

          bg-muted

          cursor-pointer

          overflow-hidden

          flex
          items-center
          justify-center
          "
          onClick={() => {
            if (
              isImage
            ) {
              setPreview(
                true,
              );
            } else {
              window.open(
                url,
                "_blank",
              );
            }
          }}
        >
          {isImage &&
          url ? (
            <img
              src={url}
              alt=""
              className="
              h-full
              w-full

              object-cover
              "
            />
          ) : (
            <FileText
              size={42}
            />
          )}
        </div>

        <div className="p-3">
          <div
            className="
            flex
            items-center
            justify-between

            mb-2
            "
          >
            <span
              className="
              text-[10px]

              px-2
              py-1

              rounded-full

              bg-blue-600/15

              text-blue-500
              "
            >
              {ext}
            </span>

            <span
              className="
              text-xs

              text-muted-foreground
              "
            >
              {formatSize(
                attachment.fileSize,
              )}
            </span>
          </div>

          <p
            className="
            text-sm

            truncate

            font-medium
            "
          >
            {
              attachment.fileName
            }
          </p>

          <button
            onClick={() =>
              window.open(
                url,
                "_blank",
              )
            }
            className="
            mt-3

            h-10

            w-full

            rounded-xl

            border

            flex
            items-center
            justify-center

            gap-2
            "
          >
            <Download
              size={16}
            />

            Buka
          </button>
        </div>
      </div>

      <ImagePreviewDialog
        open={preview}
        onOpenChange={
          setPreview
        }
        url={url}
      />
    </>
  );
}

function formatSize(
  bytes: number,
) {
  if (!bytes)
    return "-";

  const i =
    Math.floor(
      Math.log(bytes) /
        Math.log(1024),
    );

  const sizes = [
    "B",
    "KB",
    "MB",
    "GB",
  ];

  return (
    (
      bytes /
      Math.pow(
        1024,
        i,
      )
    ).toFixed(2) +
    " " +
    sizes[i]
  );
}