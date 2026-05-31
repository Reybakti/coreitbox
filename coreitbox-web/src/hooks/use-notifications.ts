import { useQuery } from "@tanstack/react-query";

import { NotificationService }
from "@/services/notification.service";

export function useNotifications() {
  return useQuery({
    queryKey: [
      "notifications",
    ],

    queryFn: () =>
      NotificationService.getAll(),
  });
}