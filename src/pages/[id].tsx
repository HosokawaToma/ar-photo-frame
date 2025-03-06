import { useState, useCallback, useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
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
import useFetchFileAsUint8Array from "@/hooks/useFetchFileAsUint8Array";
import useGifDecoder from "@/hooks/useGifDecoder";
import useGifAnimator from "@/hooks/useGifAnimator";
import { useShutterEffect } from "@/hooks/useShutterEffect";
import { imageData } from "@/data/images";
import style from "@/styles/page.module.css";

const ArPhotoFramePage = ({ url, width, height }: ArPhotoFramePageProps) => {
  const { setCapturedCanvas, setOverlayGif, setOverlayCanvas } = useArPhotoFrameContext();
  const { webcamRef, facingMode, isCameraReady, onCapture, onUserMedia, toggleFacingMode } = useWebcam();
  const { file } = useFetchFileAsUint8Array(url);
  const { gif } = useGifDecoder(file);
  const { canvasRef, onMount, animateStop } = useGifAnimator(gif);
  const { isShutterActive, triggerShutter } = useShutterEffect();
  const [enabled, setEnabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/saveGIF')
    router.prefetch('/savePNG')
  }, [router, gif]);

  const onToggleClick = useCallback(() => {
    setEnabled(!enabled)
  }, [enabled]);

  const onClick = useCallback(() => {
    animateStop()
    triggerShutter();
    setCapturedCanvas(onCapture());
    if (enabled) {
      setOverlayGif(gif);
      router.push("/saveGIF");
    } else {
      setOverlayCanvas(canvasRef.current)
      router.push("/savePNG");
    }
  }, [onCapture, router, setCapturedCanvas, triggerShutter, animateStop, setOverlayGif, gif, setOverlayCanvas, canvasRef, enabled]);

  return (
    <div className={style.body}>
      <div className={style.container}>
        <ProgressIndicator isLoading={!file} className={style["progress-indicator"]}>GIFファイルを取得中...</ProgressIndicator>
        <ProgressIndicator isLoading={file && !gif} className={style["progress-indicator"]}>GIFをデコード中...</ProgressIndicator>
        <ProgressIndicator isLoading={gif && !isCameraReady} className={style["progress-indicator"]}>カメラを検索中...</ProgressIndicator>

        <Camera webcamRef={webcamRef} width={width} height={height} facingMode={facingMode} onUserMedia={onUserMedia} />
        {isCameraReady && (
          <>
            <Canvas canvasRef={canvasRef} onMount={onMount} />
            <CaptureButton onClick={onClick} />
            <CameraToggleFacingButton onToggle={toggleFacingMode} />
            <EncodeModeToggleSwitch onClick={onToggleClick} enabled={enabled}/>
          </>
        )}
      </div>
      <ShutterFadeIn isActive={isShutterActive} />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: imageData.map(({ id }) => ({ params: { id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const image = imageData.find(({ id }) => id === params?.id);
  return image ? { props: image } : { notFound: true };
};

export default ArPhotoFramePage;
