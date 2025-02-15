import React, { ReactNode, RefObject } from 'react';

declare global {
  interface Window {
    gifler: (src: string) => {
      get: (callback: (animator: GiflerAnimator) => void) => void;
    };
  }

  type GiflerAnimator = {
    onDrawFrame: (ctx: CanvasRenderingContext2D, frame: { buffer: CanvasImageSource }) => void;
    animateInCanvas: (canvas: HTMLCanvasElement | null, loop: boolean) => void;
    stop: () => void;
  };

  interface CameraProps {
    webcamRef: RefObject<Webcam | null>;
  }

  interface CanvasProps {
    canvasRef: RefObject<HTMLCanvasElement | null>
  }

  interface ButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }

  interface GifCanvasProps {
    canvasRef: RefObject<HTMLCanvasElement | null>
  }

  type ArPhotoFrameProviderProps = {
    children: ReactNode;
  };

  type ArPhotoFrameContextType = {
    capturedCanvas: HTMLCanvasElement | null,
    setCapturedCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>
    overlayCanvas: HTMLCanvasElement | null,
    setOverlayCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>
  };

  type ArPhotoFramePageProps = {
    id: string,
    src: string
  }
}

export {};