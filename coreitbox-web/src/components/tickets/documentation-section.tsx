"use client";

import {
  DocumentationForm,
} from "./documentation-form";

import {
  DocumentationCard,
} from "./documentation-card";

import {
  useDocumentations,
} from "@/hooks/use-documentations";

export function DocumentationSection({
  ticketId,
}: {
  ticketId: string;
}) {
  const {
    data,
    isLoading,
  } =
    useDocumentations(
      ticketId,
    );

  return (
    <div className="space-y-5">
      <DocumentationForm
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
              Belum ada dokumentasi
            </div>
          )}

        {data?.map(
          (
            documentation: any,
          ) => (
            <DocumentationCard
              key={
                documentation.id
              }
              documentation={
                documentation
              }
            />
          ),
        )}
      </div>
    </div>
  );
}