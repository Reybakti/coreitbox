import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { SettingsService }
from "@/services/settings.service";

export function useUpdateSetting() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: any) =>
      SettingsService.update(
        id,
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