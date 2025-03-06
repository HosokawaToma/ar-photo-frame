import React, { ReactNode, RefObject } from "react";

declare global {

  interface CameraProps {
    webcamRef: RefObject<Webcam | null>;
    width: number;
    height: number;
    aspectRatio: number;
    facingMode: string;
    onUserMedia?: (stream: MediaStream) => void;
  }

  interface CanvasProps {
    canvasRef: RefObject<HTMLCanvasElement | null>;
    onMount?: () => void;
  }

  interface ButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
  }

  interface GifCanvasProps {
    canvasRef: RefObject<HTMLCanvasElement | null>;
  }

  interface ProgressIndicatorProps {
    isLoading: boolean | null;
    children?: React.ReactNode;
    className?: string;
  }

  interface ShutterFadeInProps {
    isActive: boolean;
    children?: ReactNode;
  }

  interface ShutterFadeOutProps {
    children?: ReactNode;
  }

  interface ToggleSwitchProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
    enabled: boolean;
  }

  type ArPhotoFrameProviderProps = {
    children: ReactNode;
    className?: string;
  };

  type ArPhotoFrameContextType = {
    capturedCanvas: HTMLCanvasElement | null;
    setCapturedCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
    overlayGif: Gif | null;
    setOverlayGif: React.Dispatch<React.SetStateAction<Gif | null>>;
    overlayCanvas: HTMLCanvasElement | null;
    setOverlayCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
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
