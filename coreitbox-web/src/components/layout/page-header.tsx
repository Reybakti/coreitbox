"use client";

import {
  usePathname,
} from "next/navigation";

const pageTitles:
  Record<string, string> = {
  "/":
    "Dashboard",

  "/dashboard":
    "Dashboard",

  "/users":
    "Users",

  "/tickets":
    "Tickets",

  "/tickets/categories":
    "Ticket Categories",

  "/notifications":
    "Notifications",

  "/reports":
    "Reports",

  "/settings":
    "Settings",

  "/audit-logs":
    "Audit Logs",
};

export function PageHeader() {
  const pathname =
    usePathname();

  const title =
    pageTitles[
      pathname
    ] ||
    "CoreITBox";

  return (
    <div
      className="
      min-w-0
      "
    >
      <h1
        className="
        text-base
        md:text-xl

        font-semibold

        truncate
        "
      >
        {title}
      </h1>
    </div>
  );
}