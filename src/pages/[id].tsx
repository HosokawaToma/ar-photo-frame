import { useContext } from 'react';
import { ArPhotoFrameContext } from "@/contexts/ArPhotoFrameContext";
import { useRouter } from 'next/router';
import Camera from '@/components/Camera'
import Canvas from '@/components/Canvas';
import CaptureButton from '@/components/CaptureButton';
import useCapture from '@/hooks/useCapture';
import useGifAnimator from '@/hooks/useGifAnimator';
import style from '@/styles/index.module.css'
import { GetStaticPaths, GetStaticProps } from 'next';
import { imageData } from '@/data/images';

const ArPhotoFramePage = ({ src }: ArPhotoFramePageProps) => {
  const context = useContext(ArPhotoFrameContext);
    if (!context) {
      throw new Error('Context must be used within a Provider');
    }
  const { setCapturedCanvas, setOverlayCanvas } = context;
  const { canvasRef, captureFrame } = useGifAnimator(src);
  const { webcamRef, onCapture } = useCapture();
  const router = useRouter();

  const onClick = () => {
    setOverlayCanvas(captureFrame())
    setCapturedCanvas(onCapture())
    router.push('/saveImage')
  }

  return (
    <div className={style.container}>
      <Camera webcamRef={webcamRef}/>
      <Canvas canvasRef={canvasRef}/>
      <CaptureButton onClick={onClick}/>
    </div>
  )
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = imageData.map((image) => ({
    params: { id: image.id },
  }));

  return { paths, fallback: false };
}

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
