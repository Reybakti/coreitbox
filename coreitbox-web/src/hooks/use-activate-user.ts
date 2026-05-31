"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  UserService,
} from "@/services/user.service";

export function useActivateUser() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      id: string,
    ) =>
      UserService.activate(
        id,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ["users"],
        },
      );
    },
  });
}