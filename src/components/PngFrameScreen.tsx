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
import useFetchFile from "@/hooks/useFetchFile";
import usePngDecoder from "@/hooks/usePngDecoder";
import useImageDataDrawer from "@/hooks/useImageDataDrawer";

const PngFrameScreen = ({ fileUrl, width, height }: ScreenProps) => {
  const { setCapturedCanvas, setOverlayCanvas } = useArPhotoFrameContext();
  const { webcamRef, facingMode, isCameraReady, onCapture, onUserMedia, toggleFacingMode } = useWebcam();
  const { file } = useFetchFile(fileUrl);
  const { imageData } = usePngDecoder(file);
  const { canvasRef, onMount } = useImageDataDrawer(imageData)
  const { isShutterActive, triggerShutter } = useShutterEffect();
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/savePNG')
  }, [router]);

  const onClick = useCallback(() => {
    triggerShutter();
    setCapturedCanvas(onCapture());
      setOverlayCanvas(canvasRef.current)
      router.push("/savePNG");
  }, [canvasRef, onCapture, router, setCapturedCanvas, setOverlayCanvas, triggerShutter]);

  return (
    <div className={style.body}>
      <ProgressIndicator isLoading={!file} className={style["progress-indicator"]}>PNGファイルを取得中...</ProgressIndicator>
      <ProgressIndicator isLoading={file && !imageData} className={style["progress-indicator"]}>PNGをデコード中...</ProgressIndicator>
      <ProgressIndicator isLoading={file && imageData && !isCameraReady} className={style["progress-indicator"]}>カメラを検索中...</ProgressIndicator>
      <div className={style["top-container"]}></div>
      <div className={style["container"]}>
        <Camera webcamRef={webcamRef} width={width} height={height} facingMode={facingMode} onUserMedia={onUserMedia} className={style["camera"]} />
        {isCameraReady && <Canvas canvasRef={canvasRef} onMount={onMount} className={style["canvas"]} />}
      </div>
      <div className={style["bottom-container"]}>
        <div className={style["bottom-grid"]}>
          <CaptureButton onClick={onClick} className={style["capture-button"]} />
          <CameraToggleFacingButton onClick={toggleFacingMode} className={style["camera-toggle-facing-button"]} />
        </div>
      </div>
      <ShutterFadeIn isActive={isShutterActive} />
    </div>
  );
};

export default PngFrameScreen;