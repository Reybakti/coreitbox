"use client";

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

export function ImagePreviewDialog({
  open,
  onOpenChange,
  url,
}: {
  open: boolean;

  onOpenChange: (
    open: boolean,
  ) => void;

  url: string;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={
        onOpenChange
      }
    >
      <DialogContent
        className="
        max-w-6xl

        p-0

        overflow-hidden
        "
      >
        <img
          src={url}
          alt="preview"
          className="
          w-full
          h-full

          object-contain
          "
        />
      </DialogContent>
    </Dialog>
  );
}