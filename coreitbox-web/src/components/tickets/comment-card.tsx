"use client";

import {
  User,
} from "lucide-react";

interface Props {
  comment: any;
}

export function CommentCard({
  comment,
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
        items-start
        gap-3
        "
      >
        <div
          className="
          h-10
          w-10

          rounded-full

          bg-blue-600

          text-white

          flex
          items-center
          justify-center
          "
        >
          <User size={18} />
        </div>

        <div className="min-w-0 flex-1">
          <div
            className="
            flex
            flex-wrap
            gap-2

            items-center
            "
          >
            <p
              className="
              font-medium
              "
            >
              {comment.user
                ?.fullName ??
                "Unknown"}
            </p>

            <span
              className="
              text-xs

              text-muted-foreground
              "
            >
              {new Date(
                comment.createdAt,
              ).toLocaleString(
                "id-ID",
              )}
            </span>
          </div>

          <p
            className="
            mt-2

            text-sm

            break-words
            whitespace-pre-wrap
            "
          >
            {comment.message}
          </p>
        </div>
      </div>
    </div>
  );
}