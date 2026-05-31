"use client";

import {
  FileText,
} from "lucide-react";

interface Props {
  documentation: any;
}

export function DocumentationCard({
  documentation,
}: Props) {
  return (
    <div
      className="
      rounded-2xl

      border

      bg-muted/20

      p-4
      "
    >
      <div
        className="
        flex
        gap-3
        "
      >
        <div
          className="
          h-10
          w-10

          rounded-xl

          bg-blue-600

          text-white

          flex
          items-center
          justify-center
          "
        >
          <FileText size={18} />
        </div>

        <div className="flex-1">
          <p
            className="
            whitespace-pre-wrap

            break-words

            text-sm
            "
          >
            {
              documentation.description
            }
          </p>

          <p
            className="
            mt-2

            text-xs

            text-muted-foreground
            "
          >
            {new Date(
              documentation.createdAt,
            ).toLocaleString(
              "id-ID",
            )}
          </p>
        </div>
      </div>
    </div>
  );
}