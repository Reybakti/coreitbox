"use client";

import {
  CompanySettingsCard,
} from "./company-settings-card";

import {
  UiSettingsCard,
} from "./ui-settings-card";

import {
  SystemSettingsCard,
} from "./system-settings-card";

export function SettingsDashboard() {
  return (
    <div
      className="
      space-y-6
      "
    >
      <h1
        className="
        text-3xl
        font-bold
        "
      >
        Settings
      </h1>

      <div
        className="
        grid
        gap-6
        "
      >
        <CompanySettingsCard />

        <UiSettingsCard />

        <SystemSettingsCard />
      </div>
    </div>
  );
}