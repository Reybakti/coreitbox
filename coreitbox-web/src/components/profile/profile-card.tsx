"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  useProfile,
} from "@/hooks/use-profile";

import {
  useUpdateProfile,
} from "@/hooks/use-update-profile";

export function ProfileCard() {
  const {
    data,
  } = useProfile();

  const updateProfile =
    useUpdateProfile();

  const [fullName,
    setFullName] =
    useState("");

  const [email,
    setEmail] =
    useState("");

  useEffect(() => {
    if (!data) return;

    setFullName(
      data.fullName,
    );

    setEmail(
      data.email,
    );
  }, [data]);

  const submit =
    async () => {
      await updateProfile.mutateAsync(
        {
          fullName,
          email,
        },
      );

      alert(
        "Profile berhasil disimpan",
      );
    };

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
      <h2
        className="
        text-xl
        font-semibold
        "
      >
        My Profile
      </h2>

      <Input
        value={
          data?.username ||
          ""
        }
        disabled
      />

      <Input
        value={fullName}
        onChange={(e) =>
          setFullName(
            e.target.value,
          )
        }
      />

      <Input
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value,
          )
        }
      />

      <Input
        value={
          data?.role ||
          ""
        }
        disabled
      />

      <Input
        value={
          data?.status ||
          ""
        }
        disabled
      />

      <Button
        onClick={submit}
      >
        Save Profile
      </Button>
    </div>
  );
}