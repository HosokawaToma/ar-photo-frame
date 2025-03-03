import { useCallback, useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Camera from "@/components/Camera";
import Canvas from "@/components/Canvas";
import CaptureButton from "@/components/CaptureButton";
import Spinner from "@/components/Spinner";
import ShutterFadeIn from "@/components/ShutterFadeIn";
import CameraToggleFacingButton from "@/components/CameraToggleFacingButton";
import useArPhotoFrameContext from "@/hooks/useArPhotoFrameContext";
import useWebcam from "@/hooks/useWebcam";
import useFetchFileAsUint8Array from "@/hooks/useFetchFileAsUint8Array";
import useGifDecoder from "@/hooks/useGifDecoder";
import useGifAnimator from "@/hooks/useGifAnimator";
import { useShutterEffect } from "@/hooks/useShutterEffect";
import { imageData } from "@/data/images";
import style from "@/styles/page.module.css";

const ArPhotoFramePage = ({ url, width, height }: ArPhotoFramePageProps) => {
  const { setCapturedCanvas, setOverlayGif } = useArPhotoFrameContext();
  const { webcamRef, aspectRatio, facingMode, isCameraReady, onCapture, onUserMedia, toggleFacingMode } = useWebcam();
  const { file } = useFetchFileAsUint8Array(url);
  const { gif } = useGifDecoder(file);
  const { canvasRef, onMount } = useGifAnimator(gif);
  const { isShutterActive, triggerShutter } = useShutterEffect();
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/saveImage')
    setOverlayGif(gif);
  }, [router, gif, setOverlayGif]);

  const onClick = useCallback(() => {
    triggerShutter();
    setCapturedCanvas(onCapture());
    router.push("/saveImage");
  }, [onCapture, router, setCapturedCanvas, triggerShutter]);

  return (
    <div className={style.body}>
      <div>
        {!file && <Spinner className={style.spinner}>GIFファイルを取得中...</Spinner>}
        {file && !gif && <Spinner className={style.spinner}>GIFをデコード中...</Spinner>}
        {gif && !isCameraReady && <Spinner className={style.spinner}>カメラを検索中...</Spinner>}

        <Camera webcamRef={webcamRef} width={width} height={height} aspectRatio={aspectRatio} facingMode={facingMode} onUserMedia={onUserMedia} />

        {isCameraReady && (
          <>
            <Canvas canvasRef={canvasRef} onMount={onMount} />
            <CaptureButton onClick={onClick} />
            <CameraToggleFacingButton onToggle={toggleFacingMode} />
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
