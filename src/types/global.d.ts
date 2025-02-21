import React, { ReactNode, RefObject } from "react";

declare global {

  interface CameraProps {
    webcamRef: RefObject<Webcam | null>;
    width: number;
    height: number;
  }

  interface CanvasProps {
    canvasRef: RefObject<HTMLCanvasElement | null>;
  }

  interface ButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }

  interface GifCanvasProps {
    canvasRef: RefObject<HTMLCanvasElement | null>;
  }

  type ArPhotoFrameProviderProps = {
    children: ReactNode;
  };

  type ArPhotoFrameContextType = {
    capturedCanvas: HTMLCanvasElement | null;
    setCapturedCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
    overlayGif: Gif | null;
    setOverlayGif: React.Dispatch<React.SetStateAction<Gif | null>>;
  };

  type ArPhotoFramePageProps = {
    id: string;
    url: string;
    width: number;
    height: number;
  };

  interface GifFrame {
    imageData: ImageData;
    delay: number;
  }

  interface Gif {
    frames: GifFrame[];
    width: number;
    height: number;
    totalFrames: number;
  }
}

export {};
