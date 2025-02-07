import { useCallback, useRef } from "react";
import Webcam from "react-webcam";

const useCapture = () => {
  const webcamRef = useRef<Webcam>(null);

  const onCapture = useCallback((): HTMLCanvasElement | null => {
    if (!webcamRef.current) {
      return null
    }
    const captureCanvas = webcamRef.current.getCanvas();
    return captureCanvas
  }, []);

  return { webcamRef, onCapture };
};

export default useCapture;
