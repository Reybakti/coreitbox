"use client";

import {
  useCompanySettings,
} from "@/hooks/use-company-settings";

export function CompanySettingsCard() {
  const {
    data,
  } =
    useCompanySettings();

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
        Company Settings
      </h2>

      <div
        className="
        grid
        md:grid-cols-2
        gap-4
        "
      >
        <Info
          label="Company"
          value={
            data?.companyName
          }
        />

        <Info
          label="Email"
          value={
            data?.email
          }
        />

        <Info
          label="Phone"
          value={
            data?.phone
          }
        />

        <Info
          label="Address"
          value={
            data?.address
          }
        />
      </div>
    </div>
  );
}

function Info({
  label,
  value,
}: any) {
  return (
    <div>
      <div
        className="
        text-sm
        text-muted-foreground
        "
      >
        {label}
      </div>

      <div>
        {value || "-"}
      </div>
    </div>
  );
}