import { useQuery }
from "@tanstack/react-query";

import { SettingsService }
from "@/services/settings.service";

export function useUiSettings() {
  return useQuery({
    queryKey: [
      "settings-ui",
    ],

    queryFn: () =>
      SettingsService.getUi(),
  });
}