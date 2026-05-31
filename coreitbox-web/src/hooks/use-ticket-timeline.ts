"use client";

import { useQuery } from "@tanstack/react-query";

import {
  TimelineService,
} from "@/services/timeline.service";

export function useTicketTimeline(
  ticketId: string,
) {
  return useQuery({
    queryKey: [
      "ticket-timeline",
      ticketId,
    ],

    queryFn: () =>
      TimelineService.findAll(
        ticketId,
      ),

    enabled: !!ticketId,
  });
}