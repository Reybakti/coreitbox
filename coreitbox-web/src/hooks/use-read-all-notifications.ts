import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  NotificationService,
} from "@/services/notification.service";

export function useReadAllNotifications() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: () =>
      NotificationService.markAllRead(),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "notifications",
        ],
      });
    },
  });
}