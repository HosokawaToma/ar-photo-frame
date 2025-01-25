"use client";

import { MouseEventHandler, useRef, useEffect, useContext, RefObject } from "react";
import style from "@/styles/captureImageSave.module.css";
import { ArPhotoFrameContext } from '@/contexts/ArPhotoFrameContext';

interface ImageProcessorProps {
  capturedImageCanvas: HTMLCanvasElement | null,
  overlayImage: HTMLImageElement | null,
  arPhotoFrameImageCanvasRef: RefObject<HTMLCanvasElement | null>
}

interface ImageDisplayProps {
  arPhotoFrameImageCanvasRef: RefObject<HTMLCanvasElement | null>,
  onDownload: MouseEventHandler<HTMLButtonElement>
}

const ImageProcessor = ({ capturedImageCanvas, overlayImage, arPhotoFrameImageCanvasRef }: ImageProcessorProps) => {
  useEffect(() => {
    if (!capturedImageCanvas || !overlayImage || !arPhotoFrameImageCanvasRef) {
      alert('!capturedImageCanvas || !overlayImage || !arPhotoFrameImageCanvasRef')
      return;
    }
    const capturedImageCanvasContext = capturedImageCanvas.getContext('2d');
    const arPhotoFrameImageCanvasContext = arPhotoFrameImageCanvasRef.current?.getContext('2d');
    if (!capturedImageCanvasContext || !arPhotoFrameImageCanvasContext) {
      alert('!capturedImageCanvasContext || !arPhotoFrameImageCanvasContext')
      return;
    }
    capturedImageCanvasContext.drawImage(
      overlayImage,
      0,
      0,
      capturedImageCanvas.width,
      capturedImageCanvas.height
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

const ArPhotoFrameImageSavePage = () => {
  const arPhotoFrameImageCanvasRef = useRef<HTMLCanvasElement>(null);
  const context = useContext(ArPhotoFrameContext);
  if (!context) {
    throw new Error('Context must be used within a Provider');
  }
  const { capturedImageCanvas, overlayImage } = context;

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
      link.download = "arPhotoFrameImage.png";
      link.click();
      URL.revokeObjectURL(url);
    });
    link.download = "arPhotoFrameImage.png";
    link.click();
  };

  return (
    <div>
      <ImageProcessor capturedImageCanvas = {capturedImageCanvas} overlayImage={overlayImage} arPhotoFrameImageCanvasRef={arPhotoFrameImageCanvasRef} />
      <ImageDisplay arPhotoFrameImageCanvasRef={arPhotoFrameImageCanvasRef} onDownload={handleDownload} />
    </div>
  );
};

export default ArPhotoFrameImageSavePage;