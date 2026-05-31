"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  UserService,
} from "@/services/user.service";

export function useResetPassword() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      id: string,
    ) =>
      UserService.resetPassword(
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