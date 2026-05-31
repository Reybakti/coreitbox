"use client";

import {
  ProfileCard,
} from "./profile-card";

import {
  ChangePasswordCard,
} from "./change-password-card";

export function ProfilePage() {
  return (
    <div
      className="
      max-w-5xl
      mx-auto

      space-y-6
      "
    >
      <ProfileCard />

      <ChangePasswordCard />
    </div>
  );
}