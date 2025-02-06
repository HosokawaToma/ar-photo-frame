"use client";

import { useContext, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import "gifler";
import { useRouter } from "next/router";
import style from "@/styles/arPhotoFrameCamera.module.css";
import { ArPhotoFrameContext } from "@/contexts/ArPhotoFrameContext";

interface ArPhotoFrameCameraProps {
  arPhotoFrameImagePage: string;
}

const ArPhotoFrameCamera = ({ arPhotoFrameImagePage }: ArPhotoFrameCameraProps) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const context = useContext(ArPhotoFrameContext);
  const overlayGif = "original.gif";

  if (!context) {
    throw new Error("Context must be used within a Provider");
  }

  const { setCapturedImageCanvas, setOverlayImageCanvas } = context;

  const videoConstraints: MediaTrackConstraints = {
    width: { ideal: 6144 },
    height: { ideal: 8192 },
    aspectRatio: { exact: 4 / 3 },
    facingMode: { ideal: "environment" },
  };

  useEffect(() => {
    window.gifler(overlayGif).animate(canvasRef.current);
  });

  const captureImage = useCallback(() => {
    const captureImageCanvas = webcamRef.current?.getCanvas();
    if (!captureImageCanvas) {
      return;
    }
    setCapturedImageCanvas(captureImageCanvas);
    setOverlayImageCanvas(canvasRef.current);
    router.push(arPhotoFrameImagePage);
  }, [webcamRef, setCapturedImageCanvas, setOverlayImageCanvas, router, arPhotoFrameImagePage]);

  return (
    <div className={style.container}>
      <Webcam
        audio={false}
        ref={webcamRef}
        forceScreenshotSourceSize={true}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
        className={style.camera}
      />
      <canvas
        ref={canvasRef}
        className={style.image}
      ></canvas>
      <button onClick={captureImage} className={style.button}>
        Capture Image
      </button>
    </div>
  );
};

export default ArPhotoFrameCamera;
