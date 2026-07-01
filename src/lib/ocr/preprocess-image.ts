export type PreprocessedImage = {
  bitmap: ImageBitmap;
  width: number;
  height: number;
};

export async function preprocessImageFile(file: File): Promise<PreprocessedImage> {
  const bitmap = await createImageBitmap(file);

  return {
    bitmap,
    width: bitmap.width,
    height: bitmap.height,
  };
}
