"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  CommentsService,
} from "@/services/comments.service";

export function useComments(
  ticketId: string,
) {
  return useQuery({
    queryKey: [
      "comments",
      ticketId,
    ],

    queryFn: () =>
      CommentsService.findAll(
        ticketId,
      ),

    enabled: !!ticketId,
  });
}