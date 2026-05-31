"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  UserService,
} from "@/services/user.service";

export function useDeactivateUser() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      id: string,
    ) =>
      UserService.deactivate(
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