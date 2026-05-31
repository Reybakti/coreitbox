"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  DocumentationsService,
} from "@/services/documentations.service";

export function useCreateDocumentation(
  ticketId: string,
) {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      description: string,
    ) =>
      DocumentationsService.create(
        ticketId,
        description,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: [
            "documentations",
            ticketId,
          ],
        },
      );
    },
  });
}