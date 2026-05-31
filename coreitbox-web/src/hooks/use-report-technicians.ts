import { useQuery } from "@tanstack/react-query";

import { ReportService } from "@/services/report.service";

export function useReportTechnicians() {
  return useQuery({
    queryKey: ["report-technicians"],
    queryFn: () =>
      ReportService.getTechnicians(),
  });
}