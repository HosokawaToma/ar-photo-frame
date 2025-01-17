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
  const [videoConstraints, setVideoConstraints] = useState<MediaTrackConstraints | undefined>(undefined);
  const webcamRef = useRef<Webcam>(null);
  const router = useRouter();
  const overlyImagePath = '/logo.png'; // オーバーレイ画像のパス
  const [overlyImageWidth, setOverlyImageWidth] = useState<number>(0);
  const [overlyImageHeight, setOverlyImageHeight] = useState<number>(0);

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

          // 一時的にストリームを取得して最大解像度を取得
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          const videoTrack = stream.getVideoTracks()[0];
          const capabilities = videoTrack.getCapabilities();

          const maxWidth = capabilities.width?.max || 1280;
          const maxHeight = capabilities.height?.max || 720;

          setVideoConstraints({
            width: maxWidth,
            height: maxHeight,
            deviceId: videoInputDevices[0].deviceId,
          });

          // ストリームを停止
          videoTrack.stop();
        }
      } catch (error) {
        console.error("カメラの最大解像度取得エラー:", error);
      }
    };

    getMaxResolution();
  }, []);

  const handleImageLoad = (imageElement: HTMLImageElement) => {
    setOverlyImageWidth(imageElement.width);
    setOverlyImageHeight(imageElement.height);
  };

  const captureImage = async () => {
    if (!webcamRef.current) {
      return;
    }
    const base64captureImage = webcamRef.current.getScreenshot();
    if (!base64captureImage) {
      return;
    }

    // Canvasを作成し、撮影した画像とオーバーレイ画像を合成
    const captureImageCanvas = document.createElement('canvas');
    const captureImageContext = captureImageCanvas.getContext('2d');
    if (!captureImageContext) {
      return;
    }

    const captureImage = new Image();
    captureImage.src = base64captureImage;

    captureImage.onload = () => {
      captureImageCanvas.width = captureImage.width;
      captureImageCanvas.height = captureImage.height;
      captureImageContext.drawImage(captureImage, 0, 0);

      // オーバーレイ画像を追加
      const overlyImage = new Image();
      overlyImage.src = overlyImagePath;

      overlyImage.onload = () => {
        captureImageContext.drawImage(
          overlyImage,
          (captureImage.width - overlyImageWidth) / 2,
          (captureImage.height - overlyImageHeight) / 2,
          overlyImageWidth,
          overlyImageHeight
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
        videoConstraints={videoConstraints}
        screenshotQuality={1}
        className={style.camera}
      />
      <NextjsImage
        src={overlyImagePath}
        alt="overlyImage"
        width={1000}
        height={164}
        objectFit="contain"
        className={style.image}
        onLoadingComplete={handleImageLoad}
      />
      <button onClick={captureImage} className={style.button}>
        Capture Image
      </button>
    </div>
  );
};

export default Camera;
