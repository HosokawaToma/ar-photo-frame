"use client";

import { Dispatch, MouseEventHandler, SetStateAction, useState, useEffect, useContext } from "react";
import NextjsImage from "next/image";
import style from "@/styles/captureImageSave.module.css";
import { ArPhotoFrameContext } from '@/contexts/ArPhotoFrameContext';

interface ImageProcessorProps {
  capturedImage: string | null,
  overlayImagePath: string,
  onProcessed: Dispatch<SetStateAction<string | null>>
}

interface ImageDisplayProps {
  capturedImage: string | null,
  onDownload: MouseEventHandler<HTMLButtonElement>
}

const ImageProcessor = ({ capturedImage, overlayImagePath, onProcessed }: ImageProcessorProps) => {
  useEffect(() => {
    if (!capturedImage) {
      return;
    }

    const captureImageCanvas = document.createElement("canvas");
    const captureImageContext = captureImageCanvas.getContext("2d");
    if (!captureImageContext) {
      return;
    }

    const captureImage = new Image();
    captureImage.src = capturedImage;
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
  }, [capturedImage, overlayImagePath, onProcessed]);

  return null;
};

const ImageDisplay = ({ capturedImage, onDownload }: ImageDisplayProps) => (
  <div className={style.container}>
    {capturedImage ? (
      <NextjsImage
        src={capturedImage}
        alt="Captured"
        layout={"fill"}
        className={style.image}
      />
    ) : (
      <p>No image captured</p>
    )}
    <button onClick={onDownload} className={style.button}>ダウンロード</button>
  </div>
);

const ArPhotoFrameImageSavePage = () => {
  const [arPhotoFrameImage, setArPhotoFrameImage] = useState<string | null>(null);
  const context = useContext(ArPhotoFrameContext);
  if (!context) {
    throw new Error('Context must be used within a Provider');
  }
  const { capturedImage, overlayImagePath } = context;

  const handleDownload = () => {
    if (!arPhotoFrameImage) {
      return;
    }
    const link = document.createElement("a");
    link.href = arPhotoFrameImage;
    link.download = "arPhotoFrameImage.png";
    link.click();
  };

  return (
    <div>
      <ImageProcessor capturedImage = {capturedImage} overlayImagePath={overlayImagePath} onProcessed={setArPhotoFrameImage} />
      <ImageDisplay capturedImage={arPhotoFrameImage} onDownload={handleDownload} />
    </div>
  );
};

export default ArPhotoFrameImageSavePage;