"use client";

import {
  useComments,
} from "@/hooks/use-comments";

import {
  CommentCard,
} from "./comment-card";

import {
  CreateCommentForm,
} from "./create-comment-form";

export function CommentsSection({
  ticketId,
}: {
  ticketId: string;
}) {
  const {
    data,
    isLoading,
  } = useComments(
    ticketId,
  );

  return (
    <div className="space-y-5">
      <CreateCommentForm
        ticketId={ticketId}
      />

      <div
        className="
        max-h-[600px]

        overflow-y-auto

        pr-2

        space-y-4
        "
      >
        {isLoading && (
          <p>
            Loading...
          </p>
        )}

        {!isLoading &&
          (!data ||
            data.length ===
              0) && (
            <div
              className="
              rounded-2xl

              border
              border-dashed

              p-6

              text-center
              "
            >
              Belum ada komentar
            </div>
          )}

        {data?.map(
          (
            comment: any,
          ) => (
            <CommentCard
              key={
                comment.id
              }
              comment={
                comment
              }
            />
          ),
        )}
      </div>
    </div>
  );
}