import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Camera from "@/components/Camera";
import Canvas from "@/components/Canvas";
import CaptureButton from "@/components/CaptureButton";
import ProgressIndicator from "@/components/ProgressIndicator";
import ShutterFadeIn from "@/components/ShutterFadeIn";
import CameraToggleFacingButton from "@/components/CameraToggleFacingButton";
import useArPhotoFrameContext from "@/hooks/useArPhotoFrameContext";
import useWebcam from "@/hooks/useWebcam";
import { useShutterEffect } from "@/hooks/useShutterEffect";
import style from "@/styles/page.module.css";
import { useFaceDetection } from "@/hooks/useFaceDetection";

const PngFrameScreen = ({ fileUrl, width, height }: ScreenProps) => {
  const { setCapturedCanvas, setOverlayCanvas } = useArPhotoFrameContext();
  const { webcamRef, facingMode, isCameraReady, onCapture, onUserMedia, toggleFacingMode } =
    useWebcam();
  const { canvasRef, modelsLoaded, detectFaces } = useFaceDetection(webcamRef, fileUrl);
  const { isShutterActive, triggerShutter } = useShutterEffect();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/savePNG");
  }, [router]);

  const newOnUserMedia = useCallback(() => {
    onUserMedia();
    detectFaces();
  }, [onUserMedia, detectFaces]);

  const onClick = useCallback(() => {
    triggerShutter();
    setCapturedCanvas(onCapture());
    setOverlayCanvas(canvasRef.current);
    router.push("/savePNG");
  }, [canvasRef, onCapture, router, setCapturedCanvas, setOverlayCanvas, triggerShutter]);

  return (
    <div className={style.body}>
      <ProgressIndicator isLoading={!modelsLoaded} className={style["progress-indicator"]}>
        モデルをロード中...
      </ProgressIndicator>
      <ProgressIndicator
        isLoading={modelsLoaded && !isCameraReady}
        className={style["progress-indicator"]}>
        カメラを検索中...
      </ProgressIndicator>
      <div className={style["container"]}>
        <div className={style["camera-container"]}>
          {modelsLoaded && (
            <Camera
              webcamRef={webcamRef}
              width={width}
              height={height}
              facingMode={facingMode}
              onUserMedia={newOnUserMedia}
              className={style["camera"]}
            />
          )}
          {isCameraReady && (
            <Canvas canvasRef={canvasRef} className={style["orvaly-canvas"]} />
          )}
        </div>
        {isCameraReady && (
          <>
            <CaptureButton onClick={onClick} className={style["capture-button"]} />
            <CameraToggleFacingButton
              onClick={toggleFacingMode}
              className={style["camera-toggle-facing-button"]}
            />
          </>
        )}
      </div>
      <ShutterFadeIn isActive={isShutterActive} />
    </div>
  );
};

export default PngFrameScreen;
