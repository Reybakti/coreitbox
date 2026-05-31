"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  AttachmentsService,
} from "@/services/attachments.service";

export function useUploadAttachment(
  ticketId: string,
) {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (file: File) =>
      AttachmentsService.upload(
        ticketId,
        file,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: [
            "attachments",
            ticketId,
          ],
        },
      );
    },
  });
}