"use client";

type ImageCropperProps = {
  imageUrl?: string;
};

export function ImageCropper({ imageUrl }: ImageCropperProps) {
  return (
    <section className="space-y-5">
      <div className="aspect-[4/3] overflow-hidden rounded-lg border border-[#d6dfd0] bg-white shadow-sm">
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt="Selected schedule crop"
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-[#6b7568]">
            The selected screenshot preview will appear here.
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {["Crop", "Rotate", "Zoom", "Reset", "Continue"].map((label) => (
          <button
            key={label}
            className="rounded-md border border-[#bfcabb] bg-white px-3 py-2 text-sm font-semibold text-[#263127] hover:bg-[#e9eee4]"
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
