"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  MaterialsService,
} from "@/services/materials.service";

export function useCreateMaterial(
  ticketId: string,
) {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      payload: {
        materialName: string;
        quantity: number;
        unit: string;
        note?: string;
      },
    ) =>
      MaterialsService.create(
        ticketId,
        payload,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: [
            "materials",
            ticketId,
          ],
        },
      );
    },
  });
}