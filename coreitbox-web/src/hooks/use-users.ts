"use client";

import { useQuery } from "@tanstack/react-query";

import { UserService } from "@/services/user.service";

export function useUsers() {
  return useQuery({
    queryKey: ["users"],

    queryFn: () =>
      UserService.getAll(),
  });
}