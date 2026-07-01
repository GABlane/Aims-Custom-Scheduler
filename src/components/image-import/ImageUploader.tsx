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
        className="block w-full cursor-pointer rounded-md border border-[#bfcabb] bg-[#fbfcf9] text-sm file:mr-4 file:border-0 file:bg-[#1f6d4a] file:px-4 file:py-3 file:font-semibold file:text-white hover:file:bg-[#18583c]"
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
