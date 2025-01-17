"use client";

import { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { useRouter } from 'next/router';
import NextjsImage from 'next/image';
import style from '../styles/camera.module.css';

interface CameraProps {
  captureImageSavePage: string;
}

const Camera = ({ captureImageSavePage }: CameraProps) => {
  const webcamRef = useRef<Webcam>(null);
  const router = useRouter();
  const overlyImagePath = '/logo.png';
  const overlyImageWidth = 1000;
  const overlyImageHeight = 164;
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
              width: { ideal: 4096 },
              height: { ideal: 2160 },
            },
          };

          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          const videoTrack = stream.getVideoTracks()[0];
          const capabilities = videoTrack.getCapabilities();
          setWebCameraWidth(capabilities.width?.max || 1280);
          setWebCameraHeight(capabilities.height?.max || 720);
          setWebCameraId(videoInputDevices[0].deviceId);

          videoTrack.stop();
        }
      } catch (error) {
        console.error("カメラの最大解像度取得エラー:", error);
      }
    };
    getMaxResolution();
  }, []);

  const captureImage = async () => {
    if (!webcamRef.current) {
      alert('webカメラを扱うことが出来ません！')
      return;
    }

    const base64captureImage = webcamRef.current.getScreenshot({
      width: webCameraWidth,
      height: webCameraHeight
    });

    if (!base64captureImage) {
      alert('撮影が出来ません！')
      return;
    }

    const captureImageCanvas = document.createElement('canvas');
    const captureImageContext = captureImageCanvas.getContext('2d');
    if (!captureImageContext) {
      alert('キャンバスを作成できません！')
      return;
    }

    const captureImage = new Image();
    captureImage.src = base64captureImage;

    captureImage.onload = () => {
      captureImageCanvas.width = captureImage.width;
      captureImageCanvas.height = captureImage.height;
      captureImageContext.drawImage(captureImage, 0, 0);

      const overlyImage = new Image();
      overlyImage.src = overlyImagePath;

      overlyImage.onload = () => {
        captureImageContext.drawImage(
          overlyImage,
          0,
          (webCameraHeight - webCameraWidth / overlyImageWidth * overlyImageHeight) / 2,
          webCameraWidth,
          webCameraWidth / overlyImageWidth * overlyImageHeight
        );

        const finalBase64captureImage = captureImageCanvas.toDataURL("image/png");
        sessionStorage.setItem("base64captureImage", finalBase64captureImage);
        router.push(captureImageSavePage);
      };
    };
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
        layout='fill'
        objectFit="contain"
        className={style.image}
      />
      <a onClick={captureImage} className={style.button}>
        Capture Image
      </a>
    </div>
  );
};

export default Camera;
