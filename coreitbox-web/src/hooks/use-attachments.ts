"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  AttachmentsService,
} from "@/services/attachments.service";

export function useAttachments(
  ticketId: string,
) {
  return useQuery({
    queryKey: [
      "attachments",
      ticketId,
    ],

    queryFn: () =>
      AttachmentsService.findAll(
        ticketId,
      ),

    enabled: !!ticketId,
  });
}