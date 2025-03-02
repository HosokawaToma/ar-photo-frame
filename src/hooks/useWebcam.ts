import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const useWebcam = () => {
  const webcamRef = useRef<Webcam>(null);
  const [aspectRatio, setAspectRatio] = useState(4/3);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const onCapture = useCallback((): HTMLCanvasElement | null => {
    if (!webcamRef.current) {
      return null
    }
    const captureCanvas = webcamRef.current.getCanvas();
    return captureCanvas
  }, []);

  const onUserMedia = useCallback((stream: MediaStream) => {
    const videoTrack = stream.getVideoTracks()[0];
    const settings = videoTrack.getSettings();
    const aspectRatio = settings.width! / settings.height!;
    if (aspectRatio > 1) {
      setAspectRatio(3/4)
    }
    setIsCameraReady(true);
  }, []);

  return { webcamRef, aspectRatio, isCameraReady, onCapture, onUserMedia };
};

export default useWebcam;
