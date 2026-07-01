"use client";

type ImageCropperProps = {
  imageUrl?: string;
};

export function ImageCropper({ imageUrl }: ImageCropperProps) {
  return (
    <section className="space-y-5">
      <div className="soft-panel aspect-[4/3] overflow-hidden">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt="Selected schedule crop"
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[var(--cream)] px-6 text-center text-[var(--muted)]">
            The selected screenshot preview will appear here.
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {["Crop", "Rotate", "Zoom", "Reset", "Continue"].map((label) => (
          <button
            key={label}
            className={
              label === "Continue"
                ? "button-primary px-3 py-2 text-sm"
                : "button-secondary px-3 py-2 text-sm"
            }
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
