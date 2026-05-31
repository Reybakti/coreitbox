import { useQuery } from "@tanstack/react-query";

import { AuditLogService }
from "@/services/audit-log.service";

export function useAuditLogsByModule(
  module: string,
) {
  return useQuery({
    queryKey: [
      "audit-logs",
      module,
    ],

    queryFn: () =>
      AuditLogService.getByModule(
        module,
      ),

    enabled:
      !!module,
  });
}