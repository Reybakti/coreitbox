import { useMutation }
from "@tanstack/react-query";

import { ProfileService }
from "@/services/profile.service";

export function useChangePassword() {
  return useMutation({
    mutationFn:
      ProfileService.changePassword,
  });
}