"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useCategories } from "@/hooks/use-categories";
import { useCreateTicket } from "@/hooks/use-create-ticket";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CreateTicketForm() {
  const router = useRouter();

  const { data: categories } =
    useCategories();

  const createTicket =
    useCreateTicket();

  const [title, setTitle] =
    useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const [
    categoryId,
    setCategoryId,
  ] = useState("");

  const [
    priority,
    setPriority,
  ] = useState("MEDIUM");

  const submit = async () => {
    if (
      !title.trim() ||
      !description.trim() ||
      !categoryId
    ) {
      alert(
        "Lengkapi seluruh data ticket",
      );

      return;
    }

    await createTicket.mutateAsync({
      title,
      description,
      categoryId,
      priority,
    });

    router.push("/tickets");
  };

  return (
    <div
      className="
      max-w-4xl
      mx-auto

      space-y-6
      "
    >
      <div>
        <h1
          className="
          text-3xl
          font-bold
          "
        >
          Create Ticket
        </h1>

        <p
          className="
          text-sm
          text-muted-foreground
          mt-1
          "
        >
          Buat ticket baru untuk
          kebutuhan support IT.
        </p>
      </div>

      <div
        className="
        rounded-3xl
        border
        bg-card

        p-6
        md:p-8

        space-y-6
        "
      >
        <div className="space-y-2">
          <label
            className="
            text-sm
            font-medium
            "
          >
            Judul Ticket
          </label>

          <Input
            placeholder="Contoh: Email tidak bisa login"
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value,
              )
            }
          />
        </div>

        <div className="space-y-2">
          <label
            className="
            text-sm
            font-medium
            "
          >
            Deskripsi
          </label>

          <Textarea
            rows={8}
            placeholder="
Jelaskan detail masalah yang terjadi...
            "
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value,
              )
            }
          />
        </div>

        <div
          className="
          grid
          gap-4

          md:grid-cols-2
          "
        >
          <div className="space-y-2">
            <label
              className="
              text-sm
              font-medium
              "
            >
              Category
            </label>

            <select
              className="
              h-11
              w-full

              rounded-xl
              border

              bg-background

              px-3
              "
              value={categoryId}
              onChange={(e) =>
                setCategoryId(
                  e.target.value,
                )
              }
            >
              <option value="">
                Pilih Category
              </option>

              {categories?.map(
                (item: any) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>
                ),
              )}
            </select>
          </div>

          <div className="space-y-2">
            <label
              className="
              text-sm
              font-medium
              "
            >
              Priority
            </label>

            <select
              className="
              h-11
              w-full

              rounded-xl
              border

              bg-background

              px-3
              "
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value,
                )
              }
            >
              <option value="LOW">
                🟢 LOW
              </option>

              <option value="MEDIUM">
                🟡 MEDIUM
              </option>

              <option value="HIGH">
                🟠 HIGH
              </option>

              <option value="CRITICAL">
                🔴 CRITICAL
              </option>
            </select>
          </div>
        </div>

        <div
          className="
          rounded-2xl
          border

          p-4

          text-sm
          text-muted-foreground
          "
        >
          Ticket akan dibuat
          dengan status
          <span
            className="
            font-semibold
            mx-1
            "
          >
            OPEN
          </span>
          dan menunggu teknisi
          melakukan Assignment
          Request.
        </div>

        <div
          className="
          flex
          flex-col

          gap-3

          sm:flex-row
          "
        >
          <Button
            variant="outline"
            className="
            flex-1
            "
            onClick={() =>
              router.back()
            }
          >
            Cancel
          </Button>

          <Button
            className="
            flex-1
            "
            disabled={
              createTicket.isPending
            }
            onClick={submit}
          >
            {createTicket.isPending
              ? "Creating..."
              : "Create Ticket"}
          </Button>
        </div>
      </div>
    </div>
  );
}