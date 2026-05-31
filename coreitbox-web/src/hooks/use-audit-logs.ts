import { useQuery } from "@tanstack/react-query";

import { AuditLogService }
from "@/services/audit-log.service";

export function useAuditLogs() {
  return useQuery({
    queryKey: [
      "audit-logs",
    ],
    queryFn: () =>
      AuditLogService.getAll(),
  });
}