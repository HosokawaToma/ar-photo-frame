"use client";

import { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { useRouter } from 'next/router';
import NextjsImage from 'next/image';
import style from '../styles/arPhotoFrameCamera.module.css';

interface ArPhotoFrameCameraProps {
  arPhotoFrameImagePage: string;
}

const ArPhotoFrameCamera = ({ arPhotoFrameImagePage }: ArPhotoFrameCameraProps) => {
  const webcamRef = useRef<Webcam>(null);
  const router = useRouter();
  const overlyImagePath = '/6144x8192.png';
  const cameraAspectRatio = 4/3;
  const [webCameraWidth, setWebCameraWidth] = useState<number>(0);
  const [webCameraHeight, setWebCameraHeight] = useState<number>(0);
  const [webCameraId, setWebCameraId] = useState<string>('');

  useEffect(() => {
    const getMaxResolution = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInputDevices = devices.filter(device => device.kind === "videoinput");

        if (videoInputDevices.length > 0) {
          const constraints = {
            video: {
              deviceId: videoInputDevices[0].deviceId,
              width: { ideal: 1280 },
              height: { ideal: 720 },
            },
          };

          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          const videoTrack = stream.getVideoTracks()[0];
          const capabilities = videoTrack.getCapabilities();
          let width = capabilities.width?.max || 1280;
          let height = capabilities.height?.max || 720;
          if (width / height > cameraAspectRatio) {
            width = (height * 3) / 4;
          } else {
            height = (width * 4) / 3;
          }
          setWebCameraWidth(width);
          setWebCameraHeight(height);
          setWebCameraId(videoInputDevices[0].deviceId);
          console.log(width, height)

          videoTrack.stop();
        }
      } catch (error) {
        console.error("カメラの最大解像度取得エラー:", error);
      }
    };
    getMaxResolution();
  });

  const captureImage = async () => {
    if (!webcamRef.current) {
      return;
    }

    const base64captureImage = webcamRef.current.getScreenshot({
      width: webCameraWidth,
      height: webCameraHeight
    });

    if (!base64captureImage) {
      return;
    }

    sessionStorage.setItem("base64captureImage", base64captureImage);
    router.push(arPhotoFrameImagePage);
  };

  return (
    <div className={style.container}>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={{width: webCameraWidth, height: webCameraHeight, deviceId: webCameraId}}
        screenshotQuality={1}
        className={style.camera}
      />
      <NextjsImage
        src={overlyImagePath}
        alt="overlyImage"
        layout={"fill"}
        objectFit={"contain"}
        className={style.image}
      />
      <button onClick={captureImage} className={style.button}>
        Capture Image
      </button>
    </div>
  );
};

export default ArPhotoFrameCamera;
