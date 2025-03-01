import { useContext, useState, useCallback } from 'react';
import { ArPhotoFrameContext } from "@/contexts/ArPhotoFrameContext";
import { useRouter } from 'next/router';
import Camera from '@/components/Camera';
import Canvas from '@/components/Canvas';
import CaptureButton from '@/components/CaptureButton';
import useCapture from '@/hooks/useCapture';
import { GetStaticPaths, GetStaticProps } from 'next';
import { imageData } from '@/data/images';
import useGifDecoder from '@/hooks/useGifDecoder';
import useFetchFileAsUint8Array from '@/hooks/useFetchFileAsUint8Array';
import style from '@/styles/page.module.css';
import Spinner from '@/components/Spinner';
import useGifAnimator from '@/hooks/useGifAnimator';
import { useShutterEffect } from "@/hooks/useShutterEffect";
import ShutterFadeIn from '@/components/ShutterFadeIn';

const ArPhotoFramePage = ({ url, width, height }: ArPhotoFramePageProps) => {
  const context = useContext(ArPhotoFrameContext);
  if (!context) {
    throw new Error('Context must be used within a Provider');
  }
  const { setCapturedCanvas, setOverlayGif } = context;
  const [isCameraReady, setIsCameraReady] = useState(false);
  const { webcamRef, onCapture } = useCapture();
  const { file } = useFetchFileAsUint8Array(url);
  const { gif } = useGifDecoder(file);
  const { canvasRef, animate } = useGifAnimator(gif);
  const { isShutterActive, triggerShutter } = useShutterEffect();
  const router = useRouter();

  const onMount = useCallback(() => {
    animate()
  }, [animate]);

  const onUserMedia = useCallback(() => {
    setIsCameraReady(true);
  }, []);

  const onClick = useCallback(() => {
    triggerShutter();
    stop();
    setOverlayGif(gif);
    setCapturedCanvas(onCapture());
    router.push('/saveImage');
  }, [gif, onCapture, router, setCapturedCanvas, setOverlayGif, triggerShutter]);

  return (
    <div className={style.body}>
      <div>
        {!file && <Spinner className={style.spinner}>GIFファイルを取得中...</Spinner>}
        {file && !gif && <Spinner className={style.spinner}>GIFをデコード中...</Spinner>}
        {gif && !isCameraReady && <Spinner className={style.spinner}>カメラを検索中...</Spinner>}

        <Camera webcamRef={webcamRef} width={width} height={height} onUserMedia={onUserMedia} />

        {isCameraReady && (
          <div>
            <Canvas canvasRef={canvasRef} onMount={onMount}/>
            <CaptureButton onClick={onClick} />
          </div>
        )}
      </div>
      <ShutterFadeIn isActive={isShutterActive}/>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = imageData.map((image) => ({
    params: { id: image.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ArPhotoFramePageProps> = async ({ params }) => {
  const image = imageData.find((img) => img.id === params?.id);

  if (!image) {
    return { notFound: true };
  }

  return {
    props: image,
  };
};

export default ArPhotoFramePage;
