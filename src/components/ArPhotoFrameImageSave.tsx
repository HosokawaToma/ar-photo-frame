"use client";

import { MouseEventHandler, useRef, useEffect, useContext, RefObject } from "react";
import style from "@/styles/captureImageSave.module.css";
import { ArPhotoFrameContext } from '@/contexts/ArPhotoFrameContext';

interface ImageProcessorProps {
  capturedImageCanvas: HTMLCanvasElement | null,
  overlayImageCanvas: HTMLCanvasElement | null,
  arPhotoFrameImageCanvasRef: RefObject<HTMLCanvasElement | null>
}

interface ImageDisplayProps {
  arPhotoFrameImageCanvasRef: RefObject<HTMLCanvasElement | null>,
  onDownload: MouseEventHandler<HTMLButtonElement>
}

const ImageProcessor = ({ capturedImageCanvas, overlayImageCanvas, arPhotoFrameImageCanvasRef }: ImageProcessorProps) => {
  useEffect(() => {
    if (!capturedImageCanvas || !overlayImageCanvas || !arPhotoFrameImageCanvasRef) {
      alert('!capturedImageCanvas || !overlayImageCanvas || !arPhotoFrameImageCanvasRef')
      return;
    }
    const capturedImageCanvasContext = capturedImageCanvas.getContext('2d');
    const arPhotoFrameImageCanvasContext = arPhotoFrameImageCanvasRef.current?.getContext('2d');
    if (!capturedImageCanvasContext || !arPhotoFrameImageCanvasContext) {
      alert('!capturedImageCanvasContext || !arPhotoFrameImageCanvasContext')
      return;
    }
    capturedImageCanvasContext.drawImage(
      overlayImageCanvas,
      0,
      capturedImageCanvas.height / 2 - ((capturedImageCanvas.width / overlayImageCanvas.width) * overlayImageCanvas.height) / 2,
      capturedImageCanvas.width,
      (capturedImageCanvas.width / overlayImageCanvas.width) * overlayImageCanvas.height
    );
    if (!arPhotoFrameImageCanvasRef.current) {
      return;
    }
    arPhotoFrameImageCanvasRef.current.width = capturedImageCanvas.width;
    arPhotoFrameImageCanvasRef.current.height = capturedImageCanvas.height;
    arPhotoFrameImageCanvasContext.clearRect(0, 0, capturedImageCanvas.width, capturedImageCanvas.height)
    arPhotoFrameImageCanvasContext.drawImage(capturedImageCanvas, 0, 0)
  }, []);
  return null;
};

const ImageDisplay = ({ arPhotoFrameImageCanvasRef, onDownload }: ImageDisplayProps) => (
  <div className={style.container}>
    {arPhotoFrameImageCanvasRef ? (
      <canvas
        ref={arPhotoFrameImageCanvasRef}
        width={arPhotoFrameImageCanvasRef.current?.width}
        height={arPhotoFrameImageCanvasRef.current?.height}
        className={style.canvas}
      ></canvas>
    ) : (
      <p>No image captured</p>
    )}
    <button onClick={onDownload} className={style.button}>ダウンロード</button>
  </div>
);

function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

const ArPhotoFrameImageSavePage = () => {
  const arPhotoFrameImageCanvasRef = useRef<HTMLCanvasElement>(null);
  const context = useContext(ArPhotoFrameContext);
  if (!context) {
    throw new Error('Context must be used within a Provider');
  }
  const { capturedImageCanvas, overlayImageCanvas } = context;

  const handleDownload = async () => {
    if (!arPhotoFrameImageCanvasRef) {
      return;
    }
    if (!arPhotoFrameImageCanvasRef.current){
      return;
    }
    const link = document.createElement("a");
    arPhotoFrameImageCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        return;
      }
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = generateRandomString(16) + ".png";
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div>
      <ImageProcessor capturedImageCanvas = {capturedImageCanvas} overlayImageCanvas={overlayImageCanvas} arPhotoFrameImageCanvasRef={arPhotoFrameImageCanvasRef} />
      <ImageDisplay arPhotoFrameImageCanvasRef={arPhotoFrameImageCanvasRef} onDownload={handleDownload} />
    </div>
  );
};

export default ArPhotoFrameImageSavePage;