"use client";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  MaterialsService,
} from "@/services/materials.service";

export function useMaterials(
  ticketId: string,
) {
  return useQuery({
    queryKey: [
      "materials",
      ticketId,
    ],

    queryFn: () =>
      MaterialsService.findAll(
        ticketId,
      ),

    enabled: !!ticketId,
  });
}