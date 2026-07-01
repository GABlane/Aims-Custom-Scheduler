"use client";

type ImageUploaderProps = {
  onImageSelected?: (file: File) => void;
};

export function ImageUploader({ onImageSelected }: ImageUploaderProps) {
  return (
    <label className="block">
      <span className="sr-only">Upload schedule screenshot</span>
      <input
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        className="block w-full cursor-pointer rounded-md border border-[var(--line)] bg-[var(--cream)] text-sm file:mr-4 file:border-0 file:bg-[var(--purple)] file:px-4 file:py-3 file:font-bold file:text-white hover:file:bg-[var(--purple-dark)]"
        onChange={(event) => {
          const file = event.currentTarget.files?.item(0);
          if (file) {
            onImageSelected?.(file);
          }
        }}
      />
    </label>
  );
}
