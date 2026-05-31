"use client";

import {
  Pencil,
  Trash2,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

export function CategoryCard({
  category,
  onEdit,
  onDelete,
}: any) {
  return (
    <div
      className="
      flex
      items-center
      justify-between

      rounded-2xl
      border

      p-4
      "
    >
      <div>
        <div
          className="
          font-medium
          "
        >
          {category.name}
        </div>

        <div
          className="
          text-sm
          text-muted-foreground
          "
        >
          {category.description}
        </div>
      </div>

      <div
        className="
        flex
        gap-2
        "
      >
        <Button
          size="icon"
          variant="outline"
          onClick={() =>
            onEdit(
              category,
            )
          }
        >
          <Pencil
            size={16}
          />
        </Button>

        <Button
          size="icon"
          variant="destructive"
          onClick={() =>
            onDelete(
              category.id,
            )
          }
        >
          <Trash2
            size={16}
          />
        </Button>
      </div>
    </div>
  );
}