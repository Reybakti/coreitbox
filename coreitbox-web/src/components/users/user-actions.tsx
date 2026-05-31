"use client";

import {
  useActivateUser,
} from "@/hooks/use-activate-user";

import {
  useDeactivateUser,
} from "@/hooks/use-deactivate-user";

import {
  useResetPassword,
} from "@/hooks/use-reset-password";

export function UserActions({
  user,
}: {
  user: any;
}) {
  const activate =
    useActivateUser();

  const deactivate =
    useDeactivateUser();

  const resetPassword =
    useResetPassword();

  return (
    <div
      className="
      flex
      justify-end
      gap-2
      "
    >
      {user.status ===
      "ACTIVE" ? (
        <button
          onClick={() =>
            deactivate.mutate(
              user.id,
            )
          }
        >
          Disable
        </button>
      ) : (
        <button
          onClick={() =>
            activate.mutate(
              user.id,
            )
          }
        >
          Activate
        </button>
      )}

      <button
        onClick={() =>
          resetPassword.mutate(
            user.id,
          )
        }
      >
        Reset Password
      </button>
    </div>
  );
}