import { useQuery } from "@tanstack/react-query";

import { ReportService } from "@/services/report.service";

export function useReportAudit() {
  return useQuery({
    queryKey: ["report-audit"],
    queryFn: () =>
      ReportService.getAuditSummary(),
  });
}