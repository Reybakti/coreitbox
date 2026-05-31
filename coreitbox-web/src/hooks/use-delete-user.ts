"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  UserService,
} from "@/services/user.service";

export function useDeleteUser() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      id: string,
    ) =>
      UserService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ["users"],
        },
      );
    },
  });
}