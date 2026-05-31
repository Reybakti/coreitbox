"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import api from "@/lib/api";

export function useRequestAssignment(
  ticketId: string,
) {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async (
      note?: string,
    ) => {
      const { data } =
        await api.post(
          `/tickets/${ticketId}/request-assignment`,
          {
            note,
          },
        );

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "assignment-requests",
          ticketId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "ticket",
          ticketId,
        ],
      });
    },
  });
}