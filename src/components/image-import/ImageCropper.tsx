"use client";

export type CropBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type ImageCropperProps = {
  imageUrl?: string;
  crop: CropBox;
  rotation: number;
  zoom: number;
  previewUrl?: string;
  isProcessing?: boolean;
  onCropChange: (crop: CropBox) => void;
  onRotate: () => void;
  onZoomChange: (zoom: number) => void;
  onReset: () => void;
  onContinue: () => void;
};

function constrainCrop(nextCrop: CropBox): CropBox {
  const width = Math.min(100, Math.max(12, nextCrop.width));
  const height = Math.min(100, Math.max(12, nextCrop.height));
  const x = Math.min(100 - width, Math.max(0, nextCrop.x));
  const y = Math.min(100 - height, Math.max(0, nextCrop.y));

  return { x, y, width, height };
}

export function ImageCropper({
  imageUrl,
  crop,
  rotation,
  zoom,
  previewUrl,
  isProcessing = false,
  onCropChange,
  onRotate,
  onZoomChange,
  onReset,
  onContinue,
}: ImageCropperProps) {
  const hasImage = Boolean(imageUrl);

  function updateCrop(partialCrop: Partial<CropBox>) {
    onCropChange(constrainCrop({ ...crop, ...partialCrop }));
  }

  return (
    <section className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-2">
        <div className="soft-panel overflow-hidden">
          <div className="border-b border-[var(--line)] px-5 py-3">
            <p className="text-sm font-bold">Original image</p>
          </div>
          <div className="relative aspect-[4/3] bg-[var(--cream)]">
            {imageUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Selected schedule screenshot"
                  className="h-full w-full object-contain"
                  style={{
                    transform: `rotate(${rotation}deg) scale(${Math.min(1.12, zoom)})`,
                  }}
                />
                <div
                  className="pointer-events-none absolute border-2 border-[var(--purple)] bg-[#7c35de]/10 shadow-[0_0_0_9999px_rgb(72_65_63_/_0.38)]"
                  style={{
                    left: `${crop.x}%`,
                    top: `${crop.y}%`,
                    width: `${crop.width}%`,
                    height: `${crop.height}%`,
                  }}
                />
              </>
            ) : (
              <div className="flex h-full items-center justify-center px-6 text-center text-[var(--muted)]">
                The selected screenshot preview will appear here.
              </div>
            )}
          </div>
        </div>

        <div className="soft-panel overflow-hidden">
          <div className="border-b border-[var(--line)] px-5 py-3">
            <p className="text-sm font-bold">Cropped table image</p>
          </div>
          <div className="flex aspect-[4/3] items-center justify-center bg-[var(--cream)] p-4">
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Cropped subject table preview"
                className="max-h-full max-w-full rounded-2xl border border-[var(--line)] bg-white object-contain"
              />
            ) : (
              <p className="px-6 text-center text-[var(--muted)]">
                Select an image to generate a crop preview.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="soft-panel space-y-5 p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-bold">
            Left edge
            <input
              type="range"
              min="0"
              max={100 - crop.width}
              value={crop.x}
              disabled={!hasImage}
              className="w-full accent-[var(--purple)]"
              onChange={(event) => updateCrop({ x: Number(event.currentTarget.value) })}
            />
          </label>
          <label className="space-y-2 text-sm font-bold">
            Top edge
            <input
              type="range"
              min="0"
              max={100 - crop.height}
              value={crop.y}
              disabled={!hasImage}
              className="w-full accent-[var(--purple)]"
              onChange={(event) => updateCrop({ y: Number(event.currentTarget.value) })}
            />
          </label>
          <label className="space-y-2 text-sm font-bold">
            Width
            <input
              type="range"
              min="12"
              max={100 - crop.x}
              value={crop.width}
              disabled={!hasImage}
              className="w-full accent-[var(--purple)]"
              onChange={(event) =>
                updateCrop({ width: Number(event.currentTarget.value) })
              }
            />
          </label>
          <label className="space-y-2 text-sm font-bold">
            Height
            <input
              type="range"
              min="12"
              max={100 - crop.y}
              value={crop.height}
              disabled={!hasImage}
              className="w-full accent-[var(--purple)]"
              onChange={(event) =>
                updateCrop({ height: Number(event.currentTarget.value) })
              }
            />
          </label>
          <label className="space-y-2 text-sm font-bold md:col-span-2">
            Zoom crop
            <input
              type="range"
              min="1"
              max="2"
              step="0.05"
              value={zoom}
              disabled={!hasImage}
              className="w-full accent-[var(--purple)]"
              onChange={(event) => onZoomChange(Number(event.currentTarget.value))}
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <button
            className="button-secondary px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!hasImage}
            onClick={onRotate}
          >
            Rotate
          </button>
          <button
            className="button-secondary px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!hasImage}
            onClick={onReset}
          >
            Reset
          </button>
          <button
            className="button-primary px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
            disabled={!hasImage || !previewUrl || isProcessing}
            onClick={onContinue}
          >
            {isProcessing ? "Preparing..." : "Continue"}
          </button>
        </div>
      </div>
    </section>
  );
}
