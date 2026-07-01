export type OcrProgressStage =
  | "preparing"
  | "loading"
  | "reading"
  | "organizing"
  | "complete";

export type OcrProgress = {
  stage: OcrProgressStage;
  progress: number;
  message: string;
};

export type OcrResult = {
  rawText: string;
  confidence?: number;
};

export async function recognizeImage(
  image: ImageBitmap | HTMLCanvasElement,
  onProgress?: (progress: OcrProgress) => void,
): Promise<OcrResult> {
  void image;
  void onProgress;

  throw new Error("Tesseract.js OCR integration has not been implemented yet.");
}
