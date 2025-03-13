import { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { loadFaceAipModels, preparingFaceDetection, drawDetectionsLandmark } from "@/utils/faceApi";

export const useFaceDetection = (
  webcamRef: React.RefObject<Webcam | null>,
  fileUrl: string
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [overlayImage, setOverlayImage] = useState<HTMLImageElement | null>(null);

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
    async () => {
      const faceDetectionInstance = preparingFaceDetection(
        modelsLoaded,
        canvasRef.current,
        overlayImage,
        webcamRef.current
      );
      if (!faceDetectionInstance) {
        setTimeout(detectFaces, 100);
        return;
      }
      const { video, context, canvas, image } = faceDetectionInstance;
      const displaySize = { width: video.videoWidth, height: video.videoHeight };
      faceapi.matchDimensions(canvas, displaySize);

      const processDetection = async () => {
        drawDetectionsLandmark(video, context, canvas, image);
        requestAnimationFrame(processDetection);
      };

      processDetection();
    },
    [modelsLoaded, overlayImage, webcamRef]
  );

  return { canvasRef, modelsLoaded, detectFaces };
};
