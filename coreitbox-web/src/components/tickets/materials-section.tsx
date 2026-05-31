"use client";

import {
  useMaterials,
} from "@/hooks/use-materials";

import {
  MaterialCard,
} from "./material-card";

import {
  MaterialForm,
} from "./material-form";

export function MaterialsSection({
  ticketId,
}: {
  ticketId: string;
}) {
  const {
    data,
    isLoading,
  } = useMaterials(
    ticketId,
  );

  return (
    <div className="space-y-5">
      <MaterialForm
        ticketId={ticketId}
      />

      <div
        className="
        max-h-[600px]

        overflow-y-auto

        pr-2

        space-y-4
        "
      >
        {isLoading && (
          <p>
            Loading...
          </p>
        )}

        {!isLoading &&
          (!data ||
            data.length ===
              0) && (
            <div
              className="
              rounded-2xl
              border
              border-dashed
              p-6
              text-center
              "
            >
              Belum ada material
            </div>
          )}

        {data?.map(
          (material: any) => (
            <MaterialCard
              key={material.id}
              material={
                material
              }
            />
          ),
        )}
      </div>
    </div>
  );
}