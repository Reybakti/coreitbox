import {
  Activity,
} from "lucide-react";

import {
  AuditLogsTable,
} from "@/components/audit/audit-logs-table";

export default function AuditLogsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div
        className="
        flex
        flex-col
        gap-2
        "
      >
        <div
          className="
          flex
          items-center
          gap-2
          "
        >
          <Activity
            className="
            h-6
            w-6
            text-primary
            "
          />

          <h1
            className="
            text-3xl
            font-bold
            tracking-tight
            "
          >
            Audit Logs
          </h1>
        </div>

        <p
          className="
          text-sm
          text-muted-foreground
          max-w-2xl
          "
        >
          Monitoring seluruh aktivitas sistem,
          perubahan data, autentikasi user,
          dan aktivitas penting lainnya untuk
          kebutuhan audit serta troubleshooting.
        </p>
      </div>

      {/* Content */}

      <div
        className="
        rounded-xl
        border
        bg-card
        "
      >
        <AuditLogsTable />
      </div>
    </div>
  );
}