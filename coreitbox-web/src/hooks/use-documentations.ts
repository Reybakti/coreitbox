"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  DocumentationsService,
} from "@/services/documentations.service";

export function useDocumentations(
  ticketId: string,
) {
  return useQuery({
    queryKey: [
      "documentations",
      ticketId,
    ],

    queryFn: () =>
      DocumentationsService.findAll(
        ticketId,
      ),

    enabled: !!ticketId,
  });
}