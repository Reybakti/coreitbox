import { useQuery }
from "@tanstack/react-query";

import { ProfileService }
from "@/services/profile.service";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],

    queryFn: () =>
      ProfileService.me(),
  });
}