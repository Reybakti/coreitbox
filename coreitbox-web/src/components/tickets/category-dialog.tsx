"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";

import { useCreateCategory } from "@/hooks/use-create-category";

export function CategoryDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (
    open: boolean,
  ) => void;
}) {
  const createCategory =
    useCreateCategory();

  const [name, setName] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const submit = async () => {
    await createCategory.mutateAsync({
      name,
      description,
    });

    setName("");
    setDescription("");

    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Category
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Category Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value,
              )
            }
          />

          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value,
              )
            }
          />

          <Button
            className="w-full"
            onClick={submit}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}