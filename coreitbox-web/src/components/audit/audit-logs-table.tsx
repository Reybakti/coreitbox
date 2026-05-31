"use client";

import { useState }
from "react";

import {
  useAuditLogs,
} from "@/hooks/use-audit-logs";

import {
  useAuditLogsByModule,
} from "@/hooks/use-audit-logs-by-module";

export function AuditLogsTable() {
  const [
    moduleFilter,
    setModuleFilter,
  ] = useState("");

  const {
    data: allLogs,
  } =
    useAuditLogs();

  const {
    data: filteredLogs,
  } =
    useAuditLogsByModule(
      moduleFilter,
    );

  const logs =
    moduleFilter
      ? filteredLogs
      : allLogs;

  return (
    <div
      className="
      rounded-3xl
      border

      bg-card

      p-6

      space-y-5
      "
    >
      <div
        className="
        flex
        flex-col

        md:flex-row

        gap-3
        "
      >
        <input
          value={
            moduleFilter
          }
          onChange={(e) =>
            setModuleFilter(
              e.target.value,
            )
          }
          placeholder="Filter Module"
          className="
          h-11
          px-3

          border
          rounded-xl

          flex-1
          "
        />
      </div>

      <div
        className="
        overflow-x-auto
        "
      >
        <table
          className="
          w-full
          "
        >
          <thead>
            <tr
              className="
              border-b
              "
            >
              <th className="text-left py-3">
                User
              </th>

              <th className="text-left py-3">
                Module
              </th>

              <th className="text-left py-3">
                Action
              </th>

              <th className="text-left py-3">
                Description
              </th>

              <th className="text-left py-3">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {logs?.map(
              (
                item: any,
              ) => (
                <tr
                  key={
                    item.id
                  }
                  className="
                  border-b
                  "
                >
                  <td className="py-3">
                    {
                      item.user
                        ?.username
                    }
                  </td>

                  <td className="py-3">
                    {
                      item.module
                    }
                  </td>

                  <td className="py-3">
                    {
                      item.action
                    }
                  </td>

                  <td className="py-3">
                    {
                      item.description
                    }
                  </td>

                  <td className="py-3">
                    {new Date(
                      item.createdAt,
                    ).toLocaleString()}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}