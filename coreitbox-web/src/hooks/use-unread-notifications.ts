import { useQuery } from "@tanstack/react-query";

import { NotificationService }
from "@/services/notification.service";

export function useUnreadNotifications() {
  return useQuery({
    queryKey: [
      "notifications",
      "unread",
    ],

    queryFn: () =>
      NotificationService.getUnread(),
  });
}