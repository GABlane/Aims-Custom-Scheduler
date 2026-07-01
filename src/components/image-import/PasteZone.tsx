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
        "soft-panel flex flex-col justify-between border-dashed p-5 outline-none transition focus:border-[var(--purple)] focus:ring-4 focus:ring-[#7c35de]/10",
        compact ? "min-h-64" : "min-h-[420px]",
      ].join(" ")}
    >
      <div className="space-y-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--lavender)] text-xl font-black text-[var(--purple)]">
          +
        </div>
        <div className="space-y-2">
          <h2 className="display-serif text-2xl">Add schedule image</h2>
          <p className="muted-copy leading-7">
            Supports pasted screenshots, dropped files, and phone image uploads.
          </p>
        </div>
      </div>

      <div className="space-y-4 pt-8">
        <ImageUploader onImageSelected={selectFile} />
        {fileName ? (
          <p className="rounded-full bg-[var(--lavender)] px-3 py-2 text-sm font-bold text-[var(--purple)]">
            Selected: {fileName}
          </p>
        ) : null}
      </div>
    </section>
  );
}
