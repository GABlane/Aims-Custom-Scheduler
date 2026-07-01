"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  type CropBox,
  ImageCropper,
} from "@/components/image-import/ImageCropper";
import { PasteZone } from "@/components/image-import/PasteZone";
import {
  saveImportedScheduleImage,
  type ImportedScheduleImage,
} from "@/lib/storage/import-image-storage";

const defaultCrop: CropBox = {
  x: 6,
  y: 8,
  width: 88,
  height: 42,
};

function loadImage(imageUrl: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to load the selected image."));
    image.src = imageUrl;
  });
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

async function createCroppedTableImage(
  imageUrl: string,
  crop: CropBox,
  rotation: number,
  zoom: number,
): Promise<ImportedScheduleImage> {
  const image = await loadImage(imageUrl);
  const cropX = (crop.x / 100) * image.naturalWidth;
  const cropY = (crop.y / 100) * image.naturalHeight;
  const cropWidth = (crop.width / 100) * image.naturalWidth;
  const cropHeight = (crop.height / 100) * image.naturalHeight;
  const zoomedWidth = cropWidth / zoom;
  const zoomedHeight = cropHeight / zoom;
  const sourceX = clamp(
    cropX + (cropWidth - zoomedWidth) / 2,
    0,
    image.naturalWidth - zoomedWidth,
  );
  const sourceY = clamp(
    cropY + (cropHeight - zoomedHeight) / 2,
    0,
    image.naturalHeight - zoomedHeight,
  );
  const normalizedRotation = ((rotation % 360) + 360) % 360;
  const isSideways = normalizedRotation === 90 || normalizedRotation === 270;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas is not available in this browser.");
  }

  canvas.width = Math.max(1, Math.round(isSideways ? zoomedHeight : zoomedWidth));
  canvas.height = Math.max(1, Math.round(isSideways ? zoomedWidth : zoomedHeight));

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate((normalizedRotation * Math.PI) / 180);
  context.drawImage(
    image,
    sourceX,
    sourceY,
    zoomedWidth,
    zoomedHeight,
    -zoomedWidth / 2,
    -zoomedHeight / 2,
    zoomedWidth,
    zoomedHeight,
  );

  return {
    imageDataUrl: canvas.toDataURL("image/png"),
    width: canvas.width,
    height: canvas.height,
    updatedAt: new Date().toISOString(),
  };
}

export function ImageImportWorkflow() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>();
  const [crop, setCrop] = useState<CropBox>(defaultCrop);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [preview, setPreview] = useState<ImportedScheduleImage>();
  const [error, setError] = useState<string>();
  const [isProcessing, setIsProcessing] = useState(false);
  const previewDescription = useMemo(() => {
    if (!preview) {
      return "No crop saved yet.";
    }

    return `${preview.width} x ${preview.height} PNG crop ready for OCR.`;
  }, [preview]);

  useEffect(() => {
    if (!imageUrl) {
      return;
    }

    let isActive = true;

    setIsProcessing(true);
    createCroppedTableImage(imageUrl, crop, rotation, zoom)
      .then((nextPreview) => {
        if (isActive) {
          setPreview(nextPreview);
          setError(undefined);
        }
      })
      .catch((caughtError: unknown) => {
        if (isActive) {
          setPreview(undefined);
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "Unable to prepare the cropped image.",
          );
        }
      })
      .finally(() => {
        if (isActive) {
          setIsProcessing(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [crop, imageUrl, rotation, zoom]);

  function handleImageSelected(file: File) {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    setImageUrl(URL.createObjectURL(file));
    setCrop(defaultCrop);
    setRotation(0);
    setZoom(1);
    setPreview(undefined);
    setError(undefined);
  }

  function handleRotate() {
    setRotation((currentRotation) => (currentRotation + 90) % 360);
  }

  function handleReset() {
    setCrop(defaultCrop);
    setRotation(0);
    setZoom(1);
  }

  function handleContinue() {
    if (!preview) {
      setError("Select and crop a schedule image before continuing.");
      return;
    }

    saveImportedScheduleImage(preview);
    router.push("/review");
  }

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <section className="space-y-5">
        <PasteZone compact onImageSelected={handleImageSelected} />
        <div className="soft-panel space-y-2 p-5">
          <p className="text-sm font-bold text-[var(--purple)]">{previewDescription}</p>
          <p className="muted-copy text-sm leading-6">
            Crop only the upper subject table when possible. The timetable grid and
            decorative background will make OCR less reliable.
          </p>
          {error ? (
            <p className="rounded-2xl border border-[#ffb7b7] bg-[#fff1f1] px-3 py-2 text-sm font-bold text-[#8a2a2a]">
              {error}
            </p>
          ) : null}
        </div>
      </section>

      <ImageCropper
        imageUrl={imageUrl}
        crop={crop}
        rotation={rotation}
        zoom={zoom}
        previewUrl={preview?.imageDataUrl}
        isProcessing={isProcessing}
        onCropChange={setCrop}
        onRotate={handleRotate}
        onZoomChange={setZoom}
        onReset={handleReset}
        onContinue={handleContinue}
      />
    </div>
  );
}
