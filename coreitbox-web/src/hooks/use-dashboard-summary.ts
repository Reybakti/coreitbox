import {
  useQuery,
} from "@tanstack/react-query";

import {
  DashboardService,
} from "@/services/dashboard.service";

export function useDashboardSummary() {
  return useQuery({
    queryKey: [
      "dashboard-summary",
    ],

    queryFn:
      DashboardService.summary,
  });
}