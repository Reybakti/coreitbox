"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  UserService,
} from "@/services/user.service";

export function useUpdateUser() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;

      payload: {
        username?: string;
        email?: string;
        fullName?: string;
        role?:
          | "SYSADMIN"
          | "ADMIN"
          | "TEKNISI";
      };
    }) =>
      UserService.update(
        id,
        payload,
      ),

    onSuccess: (
      _,
      variables,
    ) => {
      queryClient.invalidateQueries(
        {
          queryKey: ["users"],
        },
      );

      queryClient.invalidateQueries(
        {
          queryKey: [
            "user",
            variables.id,
          ],
        },
      );
    },
  });
}