import { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

export const useFaceDetection = (webcamRef: React.RefObject<Webcam | null>, fileUrl: string) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [overlayImage, setOverlayImage] = useState<HTMLImageElement | null>(null);

  const faceDetectorOptions = new faceapi.TinyFaceDetectorOptions({
    inputSize: 512, // 入力サイズを大きく（128, 160, 224, 320, 416, 512, 608）
    scoreThreshold: 0.3, // スコア閾値（デフォルト 0.1 だと誤検出しやすい）
  });

  useEffect(() => {
    const img = new Image();
    img.src = fileUrl;
    img.onload = () => setOverlayImage(img);
  }, [fileUrl]);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
      await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  const detectFaces = useCallback(async () => {
    if (!modelsLoaded || !canvasRef.current || !overlayImage || !webcamRef.current) {
      setTimeout(detectFaces, 500);
      return;
    }

    const video = webcamRef.current.video;
    if (!video) {
      setTimeout(detectFaces, 500);
      return;
    }
    if (video.readyState !== 4) {
      setTimeout(detectFaces, 500);
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) {
      setTimeout(detectFaces, 500);
      return;
    }

    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    faceapi.matchDimensions(canvas, displaySize);

    const processDetection = async () => {
      if (!canvas || !video) {
        processDetection()
        return;
      }
      const detections = await faceapi
        .detectAllFaces(video, faceDetectorOptions)
        .withFaceLandmarks();
      if (detections.length > 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        detections.forEach((detection) => {
          const landmarks = detection.landmarks;

          const eyeLeft = landmarks.positions[36];
          const eyeRight = landmarks.positions[45];
          const nose = landmarks.positions[30];
          const mouth = landmarks.positions[62];

          const centerX = (eyeLeft.x + eyeRight.x + nose.x) / 3;
          const centerY = (eyeLeft.y + eyeRight.y + nose.y + mouth.y) / 4;
          const faceWidth = eyeRight.x - eyeLeft.x;
          const overlaySize = faceWidth * 3.0;
          const overlayX = centerX - overlaySize / 2;
          const overlayY = centerY - overlaySize / 2;

          context.drawImage(overlayImage, overlayX, overlayY, overlaySize, overlaySize);
        });
      } else if (detections.length == 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }

      requestAnimationFrame(processDetection);
    };

    processDetection();
  }, [modelsLoaded, overlayImage, webcamRef]);

  return { canvasRef, detectFaces };
};
