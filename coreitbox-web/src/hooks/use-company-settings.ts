import { useQuery }
from "@tanstack/react-query";

import { SettingsService }
from "@/services/settings.service";

export function useCompanySettings() {
  return useQuery({
    queryKey: [
      "settings-company",
    ],

    queryFn: () =>
      SettingsService.getCompany(),
  });
}