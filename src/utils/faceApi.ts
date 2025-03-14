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

let lastDetectionTime = 0;
const detectionInterval = 100; // 100msごとに処理

export const drawDetections = async (
  video: HTMLVideoElement,
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  mirrored: boolean
) => {
  if (image.width === 0 || image.height === 0) {
    requestAnimationFrame(() => drawDetections(video, context, canvas, image, mirrored));
    return;
  }
  if (video.videoWidth === 0 || video.videoHeight === 0) {
    requestAnimationFrame(() => drawDetections(video, context, canvas, image, mirrored));
    return;
  }
  const now = performance.now();
  if (now - lastDetectionTime < detectionInterval) {
    requestAnimationFrame(() => drawDetections(video, context, canvas, image, mirrored));
    return;
  }
  lastDetectionTime = now;

  const detections = await faceapi.detectAllFaces(video, faceDetectorOptions);

  context.clearRect(0, 0, canvas.width, canvas.height);
  if (detections.length > 0) {
    detections.forEach((detection) => {
      const { x, y, width, height } = detection.box;
      const centerX = x + width / 2;
      const centerY = y + height / 2;
      const overlaySize = width * 1.2;
      let overlayX = centerX - overlaySize / 2;
      const overlayY = centerY - overlaySize / 2;

      if (mirrored) overlayX = -overlayX - overlaySize + canvas.width;
      context.drawImage(image, overlayX, overlayY, overlaySize, overlaySize);
    });
  }

  requestAnimationFrame(() => drawDetections(video, context, canvas, image, mirrored));
};
