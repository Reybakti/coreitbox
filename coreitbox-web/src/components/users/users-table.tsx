"use client";

import {
  useUsers,
} from "@/hooks/use-users";

import {
  UserActions,
} from "./user-actions";

export function UsersTable() {
  const {
    data,
    isLoading,
  } = useUsers();

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div
      className="
      rounded-3xl
      border
      overflow-hidden
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
            bg-muted/50
            "
          >
            <th className="p-4 text-left">
              Username
            </th>

            <th className="p-4 text-left">
              Nama
            </th>

            <th className="p-4 text-left">
              Email
            </th>

            <th className="p-4 text-left">
              Role
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-right">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {data?.map(
            (user: any) => (
              <tr
                key={user.id}
                className="
                border-b
                "
              >
                <td className="p-4">
                  {user.username}
                </td>

                <td className="p-4">
                  {user.fullName}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.role}
                </td>

                <td className="p-4">
                  <span
                    className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs

                    ${
                      user.status ===
                      "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="p-4">
                  <UserActions
                    user={user}
                  />
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}