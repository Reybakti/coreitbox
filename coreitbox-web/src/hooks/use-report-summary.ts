import { useQuery } from "@tanstack/react-query";

import { ReportService } from "@/services/report.service";

export function useReportSummary() {
  return useQuery({
    queryKey: ["report-summary"],
    queryFn: () =>
      ReportService.getSummary(),
  });
}