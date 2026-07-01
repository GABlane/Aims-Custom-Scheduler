"use client";

import type { ClipboardEvent, DragEvent } from "react";
import { useRef, useState } from "react";

import { ImageUploader } from "@/components/image-import/ImageUploader";

type PasteZoneProps = {
  compact?: boolean;
  onImageSelected?: (file: File) => void;
};

export function PasteZone({ compact = false, onImageSelected }: PasteZoneProps) {
  const [fileName, setFileName] = useState<string>();
  const zoneRef = useRef<HTMLDivElement>(null);

  function selectFile(file: File) {
    if (!file.type.startsWith("image/")) {
      return;
    }

    setFileName(file.name || "Pasted screenshot");
    onImageSelected?.(file);
  }

  function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
    const imageItem = Array.from(event.clipboardData.items).find((item) =>
      item.type.startsWith("image/"),
    );
    const file = imageItem?.getAsFile();

    if (file) {
      selectFile(file);
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const file = event.dataTransfer.files.item(0);

    if (file) {
      selectFile(file);
    }
  }

  return (
    <section
      ref={zoneRef}
      tabIndex={0}
      onPaste={handlePaste}
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      className={[
        "flex flex-col justify-between rounded-lg border border-dashed border-[#aebba8] bg-white p-5 shadow-sm outline-none transition focus:border-[#1f6d4a] focus:ring-4 focus:ring-[#1f6d4a]/10",
        compact ? "min-h-64" : "min-h-[420px]",
      ].join(" ")}
    >
      <div className="space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-[#e5efe7] text-xl font-semibold text-[#1f6d4a]">
          +
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Add schedule image</h2>
          <p className="leading-7 text-[#586457]">
            Supports pasted screenshots, dropped files, and phone image uploads.
          </p>
        </div>
      </div>

      <div className="space-y-4 pt-8">
        <ImageUploader onImageSelected={selectFile} />
        {fileName ? (
          <p className="rounded-md bg-[#eff4eb] px-3 py-2 text-sm font-medium text-[#334033]">
            Selected: {fileName}
          </p>
        ) : null}
      </div>
    </section>
  );
}
