import {
  useQuery,
} from "@tanstack/react-query";

import {
  TicketsService,
} from "@/services/tickets.service";

export function useTicket(
  id: string,
) {
  return useQuery({
    queryKey: [
      "ticket",
      id,
    ],

    queryFn: () =>
      TicketsService.getById(
        id,
      ),

    enabled: !!id,
  });
}