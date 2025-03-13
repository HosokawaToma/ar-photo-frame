import { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { loadFaceAipModels, preparingFaceDetection, drawDetections } from "@/utils/faceApi";

export const useFaceDetection = (webcamRef: React.RefObject<Webcam | null>, fileUrl: string) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [overlayImage, setOverlayImage] = useState<HTMLImageElement | null>(null);

  // 最新の requestAnimationFrame の ID を管理
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = fileUrl;
    img.onload = () => setOverlayImage(img);
  }, [fileUrl]);

  useEffect(() => {
    loadFaceAipModels();
    setModelsLoaded(true);
  }, []);

  const detectFaces = useCallback(
    async (mirrored: boolean) => {
      // 以前の requestAnimationFrame をキャンセル
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      const faceDetectionInstance = preparingFaceDetection(
        modelsLoaded,
        canvasRef.current,
        overlayImage,
        webcamRef.current
      );
      if (!faceDetectionInstance) {
        setTimeout(() => detectFaces(mirrored), 100);
        return;
      }

      const { video, context, canvas, image } = faceDetectionInstance;
      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      faceapi.matchDimensions(canvas, displaySize);

      const processDetection = async () => {
        drawDetections(video, context, canvas, image, mirrored);
        animationFrameRef.current = requestAnimationFrame(processDetection);
      };

      processDetection();
    },
    [modelsLoaded, overlayImage, webcamRef]
  );

  // クリーンアップ関数で requestAnimationFrame をキャンセル
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return { canvasRef, modelsLoaded, detectFaces };
};
