"use client";

import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  UserService,
} from "@/services/user.service";

export function useCreateUser() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      payload: {
        username: string;
        email: string;
        fullName: string;
        password: string;
        role:
          | "SYSADMIN"
          | "ADMIN"
          | "TEKNISI";
      },
    ) =>
      UserService.create(
        payload,
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