import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  NotificationService,
} from "@/services/notification.service";

export function useReadNotification() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      id: string,
    ) =>
      NotificationService.markRead(
        id,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "notifications",
        ],
      });
    },
  });
}