import {
  useQuery,
} from "@tanstack/react-query";

import {
  TicketsService,
} from "@/services/tickets.service";

export function useTickets() {
  return useQuery({
    queryKey: [
      "tickets",
    ],

    queryFn:
      TicketsService.getAll,
  });
}