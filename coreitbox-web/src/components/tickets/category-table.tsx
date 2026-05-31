"use client";

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useDeleteCategory } from "@/hooks/use-delete-category";

export function CategoryTable({
  categories,
}: {
  categories: any[];
}) {
  const deleteCategory =
    useDeleteCategory();

  return (
    <div className="space-y-3">
      {categories.map(
        (category) => (
          <div
            key={category.id}
            className="
            border
            rounded-xl
            p-4

            flex
            justify-between
            items-center
            "
          >
            <div>
              <div className="font-medium">
                {category.name}
              </div>

              <div className="text-sm text-muted-foreground">
                {
                  category.description
                }
              </div>
            </div>

            <Button
              variant="destructive"
              size="icon"
              onClick={() =>
                deleteCategory.mutate(
                  category.id,
                )
              }
            >
              <Trash2
                size={16}
              />
            </Button>
          </div>
        ),
      )}
    </div>
  );
}