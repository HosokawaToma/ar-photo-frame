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
  const { setCapturedImage, overlayImagePath } = context;

  const videoConstraints: MediaTrackConstraints = {
    width: { ideal: 6144 },
    height: { ideal: 8192 },
    aspectRatio: { exact: 4/3 },
    facingMode: { ideal: "environment"}
  }

  const captureImage = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if(!imageSrc) {
      return;
    }
    setCapturedImage(imageSrc);
    router.push(arPhotoFrameImagePage);
  }, [webcamRef, setCapturedImage, router, arPhotoFrameImagePage]);

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
        src={overlayImagePath}
        alt="overlyImage"
        layout={"fill"}
        className={style.image}
      />
      <button onClick={captureImage} className={style.button}>
        Capture Image
      </button>
    </div>
  );
};

export default ArPhotoFrameCamera;
