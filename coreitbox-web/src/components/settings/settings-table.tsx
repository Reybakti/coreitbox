"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useSettings } from "@/hooks/use-settings";
import { useCreateSetting } from "@/hooks/use-create-setting";
import { useUpdateSetting } from "@/hooks/use-update-setting";
import { useDeleteSetting } from "@/hooks/use-delete-setting";

export function SettingsTable() {
  const { data, isLoading } =
    useSettings();

  const createSetting =
    useCreateSetting();

  const updateSetting =
    useUpdateSetting();

  const deleteSetting =
    useDeleteSetting();

  const [filter, setFilter] =
    useState("");

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [form, setForm] =
    useState({
      key: "",
      value: "",
      type: "SYSTEM",
      description: "",
    });

  const filtered =
    data?.filter((item: any) =>
      filter
        ? item.type === filter
        : true,
    ) || [];

  const resetForm = () => {
    setEditingId(null);

    setForm({
      key: "",
      value: "",
      type: "SYSTEM",
      description: "",
    });
  };

  const submit = async () => {
    if (
      !form.key ||
      !form.value
    )
      return;

    if (editingId) {
      await updateSetting.mutateAsync(
        {
          id: editingId,
          payload: form,
        },
      );
    } else {
      await createSetting.mutateAsync(
        form,
      );
    }

    resetForm();
  };

  const edit = (
    setting: any,
  ) => {
    setEditingId(
      setting.id,
    );

    setForm({
      key: setting.key,
      value:
        setting.value,
      type: setting.type,
      description:
        setting.description ||
        "",
    });
  };

  const remove = async (
    id: string,
  ) => {
    const confirmDelete =
      confirm(
        "Delete setting ini?",
      );

    if (!confirmDelete)
      return;

    await deleteSetting.mutateAsync(
      id,
    );
  };

  return (
    <div
      className="
      max-w-7xl
      mx-auto
      space-y-6
      "
    >
      <div
        className="
        rounded-3xl
        border
        bg-card

        p-6

        space-y-4
        "
      >
        <h1
          className="
          text-xl
          font-semibold
          "
        >
          Settings Management
        </h1>

        <Input
          placeholder="Key"
          value={form.key}
          onChange={(e) =>
            setForm({
              ...form,
              key:
                e.target.value,
            })
          }
        />

        <Input
          placeholder="Value"
          value={form.value}
          onChange={(e) =>
            setForm({
              ...form,
              value:
                e.target.value,
            })
          }
        />

        <select
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type:
                e.target.value,
            })
          }
          className="
          h-11
          rounded-xl
          border
          px-3
          "
        >
          <option value="SYSTEM">
            SYSTEM
          </option>

          <option value="COMPANY">
            COMPANY
          </option>

          <option value="UI">
            UI
          </option>

          <option value="EMAIL">
            EMAIL
          </option>
        </select>

        <Input
          placeholder="Description"
          value={
            form.description
          }
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value,
            })
          }
        />

        <div
          className="
          flex
          gap-3
          "
        >
          <Button
            onClick={submit}
          >
            {editingId
              ? "Update"
              : "Create"}
          </Button>

          {editingId && (
            <Button
              variant="outline"
              onClick={
                resetForm
              }
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      <div
        className="
        rounded-3xl
        border
        bg-card

        p-6

        space-y-4
        "
      >
        <div
          className="
          flex
          flex-col

          md:flex-row

          gap-3
          "
        >
          <select
            value={filter}
            onChange={(e) =>
              setFilter(
                e.target.value,
              )
            }
            className="
            h-11
            rounded-xl
            border
            px-3
            "
          >
            <option value="">
              All Type
            </option>

            <option value="SYSTEM">
              SYSTEM
            </option>

            <option value="COMPANY">
              COMPANY
            </option>

            <option value="UI">
              UI
            </option>

            <option value="EMAIL">
              EMAIL
            </option>
          </select>
        </div>

        {isLoading && (
          <div>
            Loading...
          </div>
        )}

        <div
          className="
          overflow-x-auto
          "
        >
          <table
            className="
            w-full
            "
          >
            <thead>
              <tr
                className="
                border-b
                "
              >
                <th className="text-left py-3">
                  Key
                </th>

                <th className="text-left py-3">
                  Value
                </th>

                <th className="text-left py-3">
                  Type
                </th>

                <th className="text-left py-3">
                  Description
                </th>

                <th className="text-right py-3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.map(
                (
                  item: any,
                ) => (
                  <tr
                    key={
                      item.id
                    }
                    className="
                    border-b
                    "
                  >
                    <td className="py-3">
                      {
                        item.key
                      }
                    </td>

                    <td className="py-3">
                      {
                        item.value
                      }
                    </td>

                    <td className="py-3">
                      {
                        item.type
                      }
                    </td>

                    <td className="py-3">
                      {
                        item.description
                      }
                    </td>

                    <td
                      className="
                      py-3
                      text-right
                      "
                    >
                      <div
                        className="
                        flex
                        justify-end
                        gap-2
                        "
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            edit(
                              item,
                            )
                          }
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            remove(
                              item.id,
                            )
                          }
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}