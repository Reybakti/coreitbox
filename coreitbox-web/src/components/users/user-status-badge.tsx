"use client";

import { Badge } from "@/components/ui/badge";

export function UserStatusBadge({
  status,
}: {
  status: string;
}) {
  if (status === "ACTIVE") {
    return (
      <Badge
        className="
        bg-green-500
        "
      >
        Active
      </Badge>
    );
  }

  return (
    <Badge
      variant="destructive"
    >
      Inactive
    </Badge>
  );
}