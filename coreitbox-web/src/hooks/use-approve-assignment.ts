"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import api from "@/lib/api";

export function useApproveAssignment(
  ticketId: string,
) {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async (
      requestId: string,
    ) => {
      const { data } =
        await api.post(
          `/tickets/${ticketId}/approve-assignment/${requestId}`,
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

      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });
    },
  });
}