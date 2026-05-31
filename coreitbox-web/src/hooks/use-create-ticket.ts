"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import {
  TicketsService,
} from "@/services/tickets.service";

import {
  addToQueue,
} from "@/lib/sync-queue";

export function useCreateTicket() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: async (
      data: any,
    ) => {

      // OFFLINE MODE
      if (!navigator.onLine) {
        await addToQueue(
          "CREATE_TICKET",
          data,
        );

        toast.success(
          "Ticket disimpan offline dan akan dikirim saat koneksi tersedia",
        );

        return {
          offline: true,
        };
      }

      // ONLINE MODE
      return TicketsService.create(
        data,
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: [
            "tickets",
          ],
        },
      );
    },

    onError: () => {
      toast.error(
        "Gagal membuat ticket",
      );
    },
  });
}