"use client";

import { useContext, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { useRouter } from 'next/router';
import NextjsImage from 'next/image';
import style from '@/styles/arPhotoFrameCamera.module.css';
import { ArPhotoFrameContext } from '@/contexts/ArPhotoFrameContext';

interface ArPhotoFrameCameraProps {
  arPhotoFrameImagePage: string;
}

const ArPhotoFrameCamera = ({ arPhotoFrameImagePage }: ArPhotoFrameCameraProps) => {
  const webcamRef = useRef<Webcam>(null);
  const router = useRouter();
  const context = useContext(ArPhotoFrameContext);
  if (!context) {
    throw new Error('Context must be used within a Provider');
  }
  const { setCapturedImageCanvas, setOverlayImage } = context;

  const videoConstraints: MediaTrackConstraints = {
    width: { ideal: 6144 },
    height: { ideal: 8192 },
    aspectRatio: { exact: 4/3 },
    facingMode: { ideal: "environment"}
  }

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current?.getCanvas();
    if(!imageSrc) {
      return;
    }
    setCapturedImageCanvas(imageSrc);
    router.push(arPhotoFrameImagePage);
  }, [webcamRef, setCapturedImageCanvas, router, arPhotoFrameImagePage]);

  const handleImageLoad = (image: HTMLImageElement) => {
    setOverlayImage(image);
  };

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
      <NextjsImage
        src={'/6144x8192.png'}
        alt="overlyImage"
        layout={"fill"}
        className={style.image}
        onLoadingComplete={handleImageLoad}
      />
      <button onClick={captureImage} className={style.button}>
        Capture Image
      </button>
    </div>
  );
};

export default ArPhotoFrameCamera;
