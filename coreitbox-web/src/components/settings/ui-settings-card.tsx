"use client";

import {
  useUiSettings,
} from "@/hooks/use-ui-settings";

export function UiSettingsCard() {
  const {
    data,
    isLoading,
  } =
    useUiSettings();

  if (isLoading) {
    return (
      <div
        className="
        rounded-3xl
        border
        p-6
        "
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      className="
      rounded-3xl
      border
      p-6
      "
    >
      <h2
        className="
        text-xl
        font-semibold
        mb-4
        "
      >
        UI Settings
      </h2>

      <pre
        className="
        text-sm
        overflow-auto
        "
      >
        {JSON.stringify(
          data,
          null,
          2,
        )}
      </pre>
    </div>
  );
}