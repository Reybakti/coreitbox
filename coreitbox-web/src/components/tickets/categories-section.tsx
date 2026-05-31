"use client";

import { useState } from "react";

import {
  Pencil,
  Trash2,
  Save,
  X,
  FolderOpen,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  useCategories,
} from "@/hooks/use-categories";

import {
  useCreateCategory,
} from "@/hooks/use-create-category";

import {
  useUpdateCategory,
} from "@/hooks/use-update-category";

import {
  useDeleteCategory,
} from "@/hooks/use-delete-category";

export function CategoriesSection() {
  const [name, setName] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    editingId,
    setEditingId,
  ] = useState<
    string | null
  >(null);

  const [
    editName,
    setEditName,
  ] = useState("");

  const [
    editDescription,
    setEditDescription,
  ] = useState("");

  const {
    data,
    isLoading,
  } = useCategories();

  const createCategory =
    useCreateCategory();

  const updateCategory =
    useUpdateCategory();

  const deleteCategory =
    useDeleteCategory();

  const create =
    async () => {
      if (!name.trim())
        return;

      await createCategory.mutateAsync(
        {
          name,
          description,
        },
      );

      setName("");
      setDescription(
        "",
      );
    };

  const startEdit = (
    category: any,
  ) => {
    setEditingId(
      category.id,
    );

    setEditName(
      category.name,
    );

    setEditDescription(
      category.description ??
        "",
    );
  };

  const saveEdit =
    async () => {
      if (!editingId)
        return;

      await updateCategory.mutateAsync(
        {
          id: editingId,
          data: {
            name: editName,
            description:
              editDescription,
          },
        },
      );

      setEditingId(
        null,
      );
    };

  const remove =
    async (
      category: any,
    ) => {
      if (
        category._count
          ?.tickets > 0
      ) {
        alert(
          "Category masih digunakan ticket",
        );

        return;
      }

      const ok =
        confirm(
          `Hapus category ${category.name}?`,
        );

      if (!ok)
        return;

      await deleteCategory.mutateAsync(
        category.id,
      );
    };

  return (
    <div
      className="
      max-w-6xl
      mx-auto
      space-y-6
      "
    >
      {/* CREATE */}

      <div
        className="
        rounded-3xl
        border
        bg-card
        p-6
        "
      >
        <h1
          className="
          text-xl
          font-semibold
          mb-5
          "
        >
          Ticket Categories
        </h1>

        <div
          className="
          grid
          gap-3
          md:grid-cols-3
          "
        >
          <Input
            placeholder="Category Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value,
              )
            }
          />

          <Input
            placeholder="Description"
            value={
              description
            }
            onChange={(e) =>
              setDescription(
                e.target.value,
              )
            }
          />

          <Button
            onClick={
              create
            }
          >
            Tambah Category
          </Button>
        </div>
      </div>

      {/* LIST */}

      <div
        className="
        rounded-3xl
        border
        bg-card
        p-6
        "
      >
        <h2
          className="
          font-semibold
          mb-5
          "
        >
          Categories
        </h2>

        {isLoading && (
          <div>
            Loading...
          </div>
        )}

        <div className="space-y-3">
          {data?.map(
            (
              category: any,
            ) => {
              const isEditing =
                editingId ===
                category.id;

              return (
                <div
                  key={
                    category.id
                  }
                  className="
                  rounded-2xl
                  border
                  p-4
                  "
                >
                  {isEditing ? (
                    <div className="space-y-3">
                      <Input
                        value={
                          editName
                        }
                        onChange={(
                          e,
                        ) =>
                          setEditName(
                            e
                              .target
                              .value,
                          )
                        }
                      />

                      <Input
                        value={
                          editDescription
                        }
                        onChange={(
                          e,
                        ) =>
                          setEditDescription(
                            e
                              .target
                              .value,
                          )
                        }
                      />

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={
                            saveEdit
                          }
                        >
                          <Save
                            size={
                              14
                            }
                          />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setEditingId(
                              null,
                            )
                          }
                        >
                          <X
                            size={
                              14
                            }
                          />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="
                      flex
                      flex-col
                      md:flex-row
                      md:items-center
                      md:justify-between
                      gap-4
                      "
                    >
                      <div
                        className="
                        min-w-0
                        "
                      >
                        <div
                          className="
                          font-semibold
                          "
                        >
                          {
                            category.name
                          }
                        </div>

                        <div
                          className="
                          text-sm
                          text-muted-foreground
                          "
                        >
                          {
                            category.description
                          }
                        </div>

                        <div
                          className="
                          mt-2
                          text-xs
                          text-muted-foreground

                          flex
                          items-center
                          gap-1
                          "
                        >
                          <FolderOpen
                            size={
                              12
                            }
                          />

                          Dipakai{" "}
                          {category
                            ._count
                            ?.tickets ??
                            0}{" "}
                          ticket
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
                            startEdit(
                              category,
                            )
                          }
                        >
                          <Pencil
                            size={
                              16
                            }
                          />
                        </Button>

                        <Button
                          size="icon"
                          variant="destructive"
                          disabled={
                            (category
                              ._count
                              ?.tickets ??
                              0) >
                            0
                          }
                          onClick={() =>
                            remove(
                              category,
                            )
                          }
                        >
                          <Trash2
                            size={
                              16
                            }
                          />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}