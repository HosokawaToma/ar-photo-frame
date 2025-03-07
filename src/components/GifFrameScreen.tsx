import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import Camera from "@/components/Camera";
import Canvas from "@/components/Canvas";
import CaptureButton from "@/components/CaptureButton";
import ProgressIndicator from "@/components/ProgressIndicator";
import ShutterFadeIn from "@/components/ShutterFadeIn";
import CameraToggleFacingButton from "@/components/CameraToggleFacingButton";
import EncodeModeToggleSwitch from "@/components/EncodeModeToggleSwitch";
import useArPhotoFrameContext from "@/hooks/useArPhotoFrameContext";
import useWebcam from "@/hooks/useWebcam";
import useGifDecoder from "@/hooks/useGifDecoder";
import useGifAnimator from "@/hooks/useGifAnimator";
import { useShutterEffect } from "@/hooks/useShutterEffect";
import style from "@/styles/page.module.css";
import useFetchFile from "@/hooks/useFetchFile";

const GifFrameScreen = ({ fileUrl, width, height }: ScreenProps) => {
  const { setCapturedCanvas, setOverlayGif, setOverlayCanvas } = useArPhotoFrameContext();
  const { webcamRef, facingMode, isCameraReady, onCapture, onUserMedia, toggleFacingMode } = useWebcam();
  const { file } = useFetchFile(fileUrl);
  const { gif } = useGifDecoder(file);
  const { canvasRef, onMount, animateStop } = useGifAnimator(gif);
  const { isShutterActive, triggerShutter } = useShutterEffect();
  const [fileEncodeMode, setFileEncodeMode] = useState<FileType>("png");
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/saveGIF')
    router.prefetch('/savePNG')
  }, [router, gif]);

  const onClick = useCallback(() => {
    animateStop()
    triggerShutter();
    setCapturedCanvas(onCapture());
    if (fileEncodeMode === "png") {
      setOverlayCanvas(canvasRef.current)
      router.push("/savePNG");
    } 
    if (fileEncodeMode === "gif") {
      setOverlayGif(gif);
      router.push("/saveGIF");
    }
  }, [onCapture, router, setCapturedCanvas, triggerShutter, animateStop, setOverlayGif, gif, setOverlayCanvas, canvasRef, fileEncodeMode]);

  return (
    <div className={style.body}>
      <div className={style.container}>
        <ProgressIndicator isLoading={!file} className={style["progress-indicator"]}>GIFファイルを取得中...</ProgressIndicator>
        <ProgressIndicator isLoading={file && !gif} className={style["progress-indicator"]}>GIFをデコード中...</ProgressIndicator>
        <ProgressIndicator isLoading={gif && !isCameraReady} className={style["progress-indicator"]}>カメラを検索中...</ProgressIndicator>

        <Camera webcamRef={webcamRef} width={width} height={height} facingMode={facingMode} onUserMedia={onUserMedia} />
        {isCameraReady && (
          <>
            <Canvas canvasRef={canvasRef} onMount={onMount} className={style["canvas"]} />
            <CaptureButton onClick={onClick} className={style["capture-button"]} />
            <CameraToggleFacingButton onClick={toggleFacingMode} className={style["camera-toggle-facing-button"]} />
            <EncodeModeToggleSwitch fileEncodeMode={fileEncodeMode} setFileEncodeMode={setFileEncodeMode} className={style["encode-mode-toggle-switch"]}/>
          </>
        )}
      </div>
      <ShutterFadeIn isActive={isShutterActive} />
    </div>
  );
};

export default GifFrameScreen;