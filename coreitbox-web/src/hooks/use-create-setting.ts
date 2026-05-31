import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { SettingsService }
from "@/services/settings.service";

export function useCreateSetting() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      payload: any,
    ) =>
      SettingsService.create(
        payload,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "settings",
        ],
      });
    },
  });
}