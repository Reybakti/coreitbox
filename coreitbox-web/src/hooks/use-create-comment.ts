"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  CommentsService,
} from "@/services/comments.service";

export function useCreateComment(
  ticketId: string,
) {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      message: string,
    ) =>
      CommentsService.create(
        ticketId,
        message,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: [
            "comments",
            ticketId,
          ],
        },
      );
    },
  });
}