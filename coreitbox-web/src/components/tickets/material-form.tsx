"use client";

import {
  useState,
} from "react";

import {
  useCreateMaterial,
} from "@/hooks/use-create-material";

export function MaterialForm({
  ticketId,
}: {
  ticketId: string;
}) {
  const mutation =
    useCreateMaterial(
      ticketId,
    );

  const [materialName,
    setMaterialName] =
    useState("");

  const [quantity,
    setQuantity] =
    useState(1);

  const [unit,
    setUnit] =
    useState("pcs");

  const [note,
    setNote] =
    useState("");

  const submit =
    async () => {
      await mutation.mutateAsync({
        materialName,
        quantity,
        unit,
        note,
      });

      setMaterialName("");
      setQuantity(1);
      setUnit("pcs");
      setNote("");
    };

  return (
    <div className="space-y-3">
      <input
        value={materialName}
        onChange={(e) =>
          setMaterialName(
            e.target.value,
          )
        }
        placeholder="Nama Material"
        className="
        w-full
        h-11

        rounded-xl

        border

        px-3
        "
      />

      <div
        className="
        grid
        grid-cols-2
        gap-3
        "
      >
        <input
          type="number"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              Number(
                e.target.value,
              ),
            )
          }
          className="
          h-11

          rounded-xl

          border

          px-3
          "
        />

        <input
          value={unit}
          onChange={(e) =>
            setUnit(
              e.target.value,
            )
          }
          className="
          h-11

          rounded-xl

          border

          px-3
          "
        />
      </div>

      <textarea
        value={note}
        onChange={(e) =>
          setNote(
            e.target.value,
          )
        }
        placeholder="Catatan"
        className="
        w-full

        min-h-[100px]

        rounded-xl

        border

        p-3
        "
      />

      <button
        onClick={submit}
        className="
        w-full

        h-11

        rounded-xl

        bg-blue-600

        text-white
        "
      >
        Tambah Material
      </button>
    </div>
  );
}