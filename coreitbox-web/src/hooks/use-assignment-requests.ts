"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useAssignmentRequests(
  ticketId: string,
) {
  return useQuery({
    queryKey: [
      "assignment-requests",
      ticketId,
    ],

    queryFn: async () => {
      const { data } =
        await api.get(
          `/tickets/${ticketId}/assignment-requests`,
        );

      return data;
    },

    enabled: !!ticketId,
  });
}