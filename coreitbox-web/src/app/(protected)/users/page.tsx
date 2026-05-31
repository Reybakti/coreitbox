"use client";

import { UsersTable } from "@/components/users/users-table";
import { CreateUserDialog } from "@/components/users/create-user-dialog";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div
        className="
        flex
        items-center
        justify-between
        "
      >
        <div>
          <h1
            className="
            text-3xl
            font-bold
            "
          >
            Users
          </h1>

          <p
            className="
            text-muted-foreground
            "
          >
            Kelola user CoreITBox
          </p>
        </div>

        <CreateUserDialog />
      </div>

      <UsersTable />
    </div>
  );
}