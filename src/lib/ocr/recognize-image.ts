import Tesseract from "tesseract.js";

import {
  preprocessImage,
  type ImagePreprocessInput,
} from "@/lib/ocr/preprocess-image";

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

export type OcrImageInput = ImagePreprocessInput;

function mapTesseractStage(status: string): OcrProgressStage {
  const normalizedStatus = status.toLowerCase();

  if (
    normalizedStatus.includes("load") ||
    normalizedStatus.includes("initializ")
  ) {
    return "loading";
  }

  if (normalizedStatus.includes("recogniz")) {
    return "reading";
  }

  return "organizing";
}

export async function recognizeImage(
  image: OcrImageInput,
  onProgress?: (progress: OcrProgress) => void,
): Promise<OcrResult> {
  onProgress?.({
    stage: "preparing",
    progress: 0,
    message: "Preparing image...",
  });

  const preprocessedImage = await preprocessImage(image);

  const worker = await Tesseract.createWorker("eng", Tesseract.OEM.LSTM_ONLY, {
    logger: (message) => {
      onProgress?.({
        stage: mapTesseractStage(message.status),
        progress: Math.round(message.progress * 100),
        message: message.status,
      });
    },
  });

  try {
    await worker.setParameters({
      preserve_interword_spaces: "1",
      tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
      user_defined_dpi: "300",
    });

    onProgress?.({
      stage: "reading",
      progress: 35,
      message: "Reading schedule...",
    });

    const result = await worker.recognize(preprocessedImage.canvas);

    onProgress?.({
      stage: "organizing",
      progress: 95,
      message: "Organizing subjects...",
    });

    return {
      rawText: result.data.text,
      confidence: result.data.confidence,
    };
  } finally {
    await worker.terminate();
    onProgress?.({
      stage: "complete",
      progress: 100,
      message: "OCR complete.",
    });
  }
}
