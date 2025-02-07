import { useRef, useEffect, useContext } from 'react';
import { ArPhotoFrameContext } from '@/contexts/ArPhotoFrameContext';
import { canvasComposition } from '@/utils/canvasProcessor';

const useCanvasRenderer = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useContext(ArPhotoFrameContext);

  if (!context) {
    throw new Error('Context must be used within a Provider');
  }

  const { capturedCanvas, overlayCanvas } = context;

  useEffect(() => {
    const canvasContext = canvasRef.current?.getContext('2d');
    if (!capturedCanvas || !overlayCanvas || !canvasRef.current || !canvasContext) {
      return;
    }

    const arPhotoFrameCanvas = canvasComposition(capturedCanvas, overlayCanvas);
    if (!arPhotoFrameCanvas) {
      return;
    }

    canvasRef.current.width = arPhotoFrameCanvas.width;
    canvasRef.current.height = arPhotoFrameCanvas.height;
    canvasContext.clearRect(0, 0, arPhotoFrameCanvas.width, arPhotoFrameCanvas.height);
    canvasContext.drawImage(arPhotoFrameCanvas, 0, 0);
  }, [capturedCanvas, overlayCanvas]);

  return { canvasRef };
};

export default useCanvasRenderer;
