import api from "@/lib/api";

import {
  DashboardSummary,
} from "@/types/dashboard";

export const DashboardService = {
  async summary():
    Promise<DashboardSummary> {
    const response =
      await api.get(
        "/dashboard/summary",
      );

    return response.data;
  },
};