import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { ProfileService }
from "@/services/profile.service";

export function useUpdateProfile() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      ProfileService.update,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "profile",
        ],
      });
    },
  });
}