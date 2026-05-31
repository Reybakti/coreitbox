"use client";

import {
  useState,
} from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Input,
} from "@/components/ui/input";

import {
  Textarea,
} from "@/components/ui/textarea";

import {
  Button,
} from "@/components/ui/button";

import {
  useCategories,
} from "@/hooks/use-categories";

import {
  useCreateTicket,
} from "@/hooks/use-create-ticket";

export function CreateTicketDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (
    open: boolean,
  ) => void;
}) {
  const {
    data: categories,
  } = useCategories();

  const createTicket =
    useCreateTicket();

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    priority,
    setPriority,
  ] = useState(
    "MEDIUM",
  );

  const [
    categoryId,
    setCategoryId,
  ] = useState("");

  const submit =
    async () => {
      try {
        await createTicket.mutateAsync(
          {
            title,
            description,
            priority,
            categoryId,
          },
        );

        onOpenChange(
          false,
        );

        setTitle("");
        setDescription("");
        setPriority(
          "MEDIUM",
        );
        setCategoryId(
          "",
        );
      } catch (
        error
      ) {
        console.error(
          error,
        );

        alert(
          "Gagal membuat ticket",
        );
      }
    };

  return (
    <Dialog
      open={open}
      onOpenChange={
        onOpenChange
      }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Ticket
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(
              e,
            ) =>
              setTitle(
                e.target.value,
              )
            }
          />

          <Textarea
            placeholder="Description"
            value={
              description
            }
            onChange={(
              e,
            ) =>
              setDescription(
                e.target.value,
              )
            }
          />

          <select
            value={priority}
            onChange={(
              e,
            ) =>
              setPriority(
                e.target.value,
              )
            }
            className="
            w-full
            border
            rounded-lg
            h-10
            px-3
            "
          >
            <option value="LOW">
              LOW
            </option>

            <option value="MEDIUM">
              MEDIUM
            </option>

            <option value="HIGH">
              HIGH
            </option>

            <option value="CRITICAL">
              CRITICAL
            </option>
          </select>

          <select
            value={
              categoryId
            }
            onChange={(
              e,
            ) =>
              setCategoryId(
                e.target.value,
              )
            }
            className="
            w-full
            border
            rounded-lg
            h-10
            px-3
            "
          >
            <option value="">
              Pilih Category
            </option>

            {categories?.map(
              (
                category: any,
              ) => (
                <option
                  key={
                    category.id
                  }
                  value={
                    category.id
                  }
                >
                  {
                    category.name
                  }
                </option>
              ),
            )}
          </select>

          <Button
            className="
            w-full
            "
            onClick={
              submit
            }
          >
            Create Ticket
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}