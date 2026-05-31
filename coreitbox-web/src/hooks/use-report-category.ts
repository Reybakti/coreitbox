import { useQuery } from "@tanstack/react-query";

import { ReportService } from "@/services/report.service";

export function useReportCategory() {
  return useQuery({
    queryKey: ["report-category"],
    queryFn: () =>
      ReportService.getCategory(),
  });
}