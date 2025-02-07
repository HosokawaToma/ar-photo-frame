import { useContext } from 'react';
import { ArPhotoFrameContext } from "@/contexts/ArPhotoFrameContext";
import { useRouter } from 'next/router';
import Camera from '@/components/Camera'
import Canvas from '@/components/Canvas';
import CaptureButton from '@/components/CaptureButton';
import useCapture from '@/hooks/useCapture';
import useGifAnimator from '@/hooks/useGifAnimator';
import style from '@/styles/index.module.css'

const Index = () => {
  const context = useContext(ArPhotoFrameContext);
    if (!context) {
      throw new Error('Context must be used within a Provider');
    }
  const { setCapturedCanvas, setOverlayCanvas } = context;
  const { canvasRef, captureFrame } = useGifAnimator('original.gif');
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

export default Index;
