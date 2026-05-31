import { useQuery }
from "@tanstack/react-query";

import { SettingsService }
from "@/services/settings.service";

export function useSystemSettings() {
  return useQuery({
    queryKey: [
      "settings-system",
    ],

    queryFn: () =>
      SettingsService.getSystem(),
  });
}