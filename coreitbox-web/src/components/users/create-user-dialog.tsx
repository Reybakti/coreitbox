"use client";

import { useState } from "react";

import {
  useCreateUser,
} from "@/hooks/use-create-user";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

type UserRole =
  | "SYSADMIN"
  | "ADMIN"
  | "TEKNISI";

interface CreateUserForm {
  username: string;
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
}

export function CreateUserDialog() {
  const createUser =
    useCreateUser();

  const [open, setOpen] =
    useState(false);

  const [form, setForm] =
    useState<CreateUserForm>({
      username: "",
      fullName: "",
      email: "",
      password: "",
      role: "TEKNISI",
    });

  const submit =
    async () => {
      await createUser.mutateAsync(
        form,
      );

      setOpen(false);

      setForm({
        username: "",
        fullName: "",
        email: "",
        password: "",
        role: "TEKNISI",
      });
    };

  if (!open) {
    return (
      <Button
        onClick={() =>
          setOpen(true)
        }
      >
        + User
      </Button>
    );
  }

  return (
    <div
      className="
      fixed
      inset-0

      bg-black/40

      flex
      items-center
      justify-center

      z-50
      "
    >
      <div
        className="
        w-full
        max-w-lg

        rounded-3xl
        bg-background

        border

        p-6
        space-y-4
        "
      >
        <h2
          className="
          text-xl
          font-semibold
          "
        >
          Create User
        </h2>

        <Input
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({
              ...form,
              username:
                e.target.value,
            })
          }
        />

        <Input
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) =>
            setForm({
              ...form,
              fullName:
                e.target.value,
            })
          }
        />

        <Input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email:
                e.target.value,
            })
          }
        />

        <Input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.target.value,
            })
          }
        />

        <select
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role:
                e.target
                  .value as UserRole,
            })
          }
          className="
          h-11
          w-full
          border
          rounded-xl
          px-3
          "
        >
          <option value="SYSADMIN">
            SYSADMIN
          </option>

          <option value="ADMIN">
            ADMIN
          </option>

          <option value="TEKNISI">
            TEKNISI
          </option>
        </select>

        <div
          className="
          flex
          justify-end
          gap-2
          "
        >
          <Button
            variant="outline"
            onClick={() =>
              setOpen(false)
            }
          >
            Cancel
          </Button>

          <Button
            onClick={submit}
            disabled={
              createUser.isPending
            }
          >
            {createUser.isPending
              ? "Saving..."
              : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}