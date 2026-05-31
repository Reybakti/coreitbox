import { useQuery } from "@tanstack/react-query";

import { ReportService } from "@/services/report.service";

export function useReportPriority() {
  return useQuery({
    queryKey: ["report-priority"],
    queryFn: () =>
      ReportService.getPriority(),
  });
}