export type ImagePreprocessInput =
  | string
  | HTMLCanvasElement
  | File
  | Blob
  | ImageBitmap;

export type PreprocessedImage = {
  canvas: HTMLCanvasElement;
  imageDataUrl: string;
  width: number;
  height: number;
};

type PreprocessOptions = {
  contrast?: number;
  minWidth?: number;
  maxScale?: number;
};

const defaultOptions = {
  contrast: 55,
  minWidth: 1400,
  maxScale: 2,
} satisfies Required<PreprocessOptions>;

function createCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");

  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));

  return canvas;
}

function getCanvasContext(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d", { willReadFrequently: true });

  if (!context) {
    throw new Error("Canvas is not available in this browser.");
  }

  return context;
}

function loadHtmlImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to load image for OCR."));
    image.src = src;
  });
}

async function inputToCanvas(input: ImagePreprocessInput) {
  if (input instanceof HTMLCanvasElement) {
    const canvas = createCanvas(input.width, input.height);
    getCanvasContext(canvas).drawImage(input, 0, 0);
    return canvas;
  }

  if (typeof ImageBitmap !== "undefined" && input instanceof ImageBitmap) {
    const canvas = createCanvas(input.width, input.height);
    getCanvasContext(canvas).drawImage(input, 0, 0);
    return canvas;
  }

  const sourceUrl =
    typeof input === "string" ? input : URL.createObjectURL(input as Blob);

  try {
    const image = await loadHtmlImage(sourceUrl);
    const canvas = createCanvas(image.naturalWidth, image.naturalHeight);

    getCanvasContext(canvas).drawImage(image, 0, 0);

    return canvas;
  } finally {
    if (typeof input !== "string") {
      URL.revokeObjectURL(sourceUrl);
    }
  }
}

function getScale(width: number, options: Required<PreprocessOptions>) {
  if (width >= options.minWidth) {
    return 1;
  }

  return Math.min(options.maxScale, options.minWidth / width);
}

function applyGrayscaleAndContrast(
  imageData: ImageData,
  contrast: number,
) {
  const data = imageData.data;
  const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));

  for (let index = 0; index < data.length; index += 4) {
    const gray = data[index] * 0.299 + data[index + 1] * 0.587 + data[index + 2] * 0.114;
    const adjusted = Math.max(0, Math.min(255, factor * (gray - 128) + 128));

    data[index] = adjusted;
    data[index + 1] = adjusted;
    data[index + 2] = adjusted;
    data[index + 3] = 255;
  }
}

function applyLightSharpen(imageData: ImageData) {
  const { width, height, data } = imageData;
  const source = new Uint8ClampedArray(data);
  const kernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];

  for (let y = 1; y < height - 1; y += 1) {
    for (let x = 1; x < width - 1; x += 1) {
      let value = 0;
      let kernelIndex = 0;

      for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
        for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
          const sourceIndex = ((y + offsetY) * width + x + offsetX) * 4;

          value += source[sourceIndex] * kernel[kernelIndex];
          kernelIndex += 1;
        }
      }

      const outputIndex = (y * width + x) * 4;
      const sharpened = Math.max(0, Math.min(255, value));

      data[outputIndex] = sharpened;
      data[outputIndex + 1] = sharpened;
      data[outputIndex + 2] = sharpened;
      data[outputIndex + 3] = 255;
    }
  }
}

export async function preprocessImage(
  input: ImagePreprocessInput,
  options?: PreprocessOptions,
): Promise<PreprocessedImage> {
  const mergedOptions = { ...defaultOptions, ...options };
  const sourceCanvas = await inputToCanvas(input);
  const scale = getScale(sourceCanvas.width, mergedOptions);
  const canvas = createCanvas(sourceCanvas.width * scale, sourceCanvas.height * scale);
  const context = getCanvasContext(canvas);

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(sourceCanvas, 0, 0, canvas.width, canvas.height);

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  applyGrayscaleAndContrast(imageData, mergedOptions.contrast);
  applyLightSharpen(imageData);
  context.putImageData(imageData, 0, 0);

  return {
    canvas,
    imageDataUrl: canvas.toDataURL("image/png"),
    width: canvas.width,
    height: canvas.height,
  };
}

export async function preprocessImageFile(file: File): Promise<PreprocessedImage> {
  return preprocessImage(file);
}
