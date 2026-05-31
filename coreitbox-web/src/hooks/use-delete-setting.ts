import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { SettingsService }
from "@/services/settings.service";

export function useDeleteSetting() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      id: string,
    ) =>
      SettingsService.delete(
        id,
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