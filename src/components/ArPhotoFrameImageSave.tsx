"use client";

import { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from "react";
import NextjsImage from "next/image";
import style from "../styles/captureImageSave.module.css";

interface ImageProcessorProps {
  overlayImagePath: string,
  onProcessed: Dispatch<SetStateAction<string | null>>
}

interface ImageDisplayProps {
  capturedImage: string | null,
  onDownload: MouseEventHandler<HTMLButtonElement>
}

const ImageProcessor = ({ overlayImagePath, onProcessed }: ImageProcessorProps) => {
  useEffect(() => {
    const base64captureImage = sessionStorage.getItem("base64captureImage");
    if (!base64captureImage) {
      return;
    }

    const captureImageCanvas = document.createElement("canvas");
    const captureImageContext = captureImageCanvas.getContext("2d");
    if (!captureImageContext) {
      return;
    }

    const captureImage = new Image();
    captureImage.src = base64captureImage;
    captureImage.onload = () => {
      captureImageCanvas.width = captureImage.width;
      captureImageCanvas.height = captureImage.height;
      captureImageContext.drawImage(captureImage, 0, 0);

      const overlayImage = new Image();
      overlayImage.src = overlayImagePath;
      overlayImage.onload = () => {
        captureImageContext.drawImage(
          overlayImage,
          0,
          0,
          captureImage.width,
          captureImage.height
        );

        const finalBase64captureImage = captureImageCanvas.toDataURL("image/png");
        onProcessed(finalBase64captureImage);
      };
    };
  }, [overlayImagePath, onProcessed]);

  return null;
};

const ImageDisplay = ({ capturedImage, onDownload }: ImageDisplayProps) => (
  <div>
    {capturedImage ? (
      <NextjsImage
        src={capturedImage}
        alt="Captured"
        width={1000}
        height={100}
        className={style.image}
      />
    ) : (
      <p>No image captured</p>
    )}
    <button onClick={onDownload}>ダウンロード</button>
  </div>
);

const ArPhotoFrameImageSavePage = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const overlayImagePath = "/6144x8192.png";

  const handleDownload = () => {
    if (!capturedImage) {
      return;
    }
    const link = document.createElement("a");
    link.href = capturedImage;
    link.download = "capturedImage.png";
    link.click();
  };

  return (
    <div>
      <ImageProcessor overlayImagePath={overlayImagePath} onProcessed={setCapturedImage} />
      <ImageDisplay capturedImage={capturedImage} onDownload={handleDownload} />
    </div>
  );
};

export default ArPhotoFrameImageSavePage;