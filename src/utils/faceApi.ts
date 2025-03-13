import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

const faceDetectorOptions = new faceapi.TinyFaceDetectorOptions({
  inputSize: 512, // 入力サイズを大きく（128, 160, 224, 320, 416, 512, 608）
  scoreThreshold: 0.3, // スコア閾値（デフォルト 0.1 だと誤検出しやすい）
});

export const loadFaceAipModels = async () => {
  const MODEL_URL = "/models";
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
  await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
};

export const preparingFaceDetection = (
  modelsLoaded: boolean,
  canvas: HTMLCanvasElement | null,
  image: HTMLImageElement | null,
  webcam: Webcam | null
) => {
  if (!modelsLoaded || !canvas || !image || !webcam) {
    return null;
  }
  const video = webcam.video;
  if (!video || video.readyState !== 4) {
    return null;
  }
  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }
  return { video, context, canvas, image };
};

export const drawDetectionsLandmark = async (
  video: HTMLVideoElement,
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  image: HTMLImageElement
) => {
  const detections = await faceapi.detectAllFaces(video, faceDetectorOptions).withFaceLandmarks();
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (detections.length > 0) {
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

      context.drawImage(image, overlayX, overlayY, overlaySize, overlaySize);
    });
  }
};
