"use client";

import {
  useState,
} from "react";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  useChangePassword,
} from "@/hooks/use-change-password";

export function ChangePasswordCard() {
  const mutation =
    useChangePassword();

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const submit =
    async () => {
      if (
        newPassword !==
        confirmPassword
      ) {
        alert(
          "Konfirmasi password tidak sama",
        );

        return;
      }

      await mutation.mutateAsync(
        {
          currentPassword,
          newPassword,
        },
      );

      setCurrentPassword(
        "",
      );

      setNewPassword("");

      setConfirmPassword(
        "",
      );

      alert(
        "Password berhasil diubah",
      );
    };

  return (
    <div
      className="
      rounded-3xl
      border

      bg-card

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
        Change Password
      </h2>

      <Input
        type="password"
        placeholder="Current Password"
        value={
          currentPassword
        }
        onChange={(e) =>
          setCurrentPassword(
            e.target.value,
          )
        }
      />

      <Input
        type="password"
        placeholder="New Password"
        value={
          newPassword
        }
        onChange={(e) =>
          setNewPassword(
            e.target.value,
          )
        }
      />

      <Input
        type="password"
        placeholder="Confirm Password"
        value={
          confirmPassword
        }
        onChange={(e) =>
          setConfirmPassword(
            e.target.value,
          )
        }
      />

      <Button
        onClick={submit}
      >
        Update Password
      </Button>
    </div>
  );
}