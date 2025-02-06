import React, { createContext, useState, ReactNode } from 'react';

export type ArPhotoFrameContextType = {
  capturedImageCanvas: HTMLCanvasElement | null,
  setCapturedImageCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>
  overlayImageCanvas: HTMLCanvasElement | null,
  setOverlayImageCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>
};

export const ArPhotoFrameContext = createContext<ArPhotoFrameContextType | undefined>(undefined);

type ArPhotoFrameProviderProps = {
  children: ReactNode;
};

export const ArPhotoFrameProvider: React.FC<ArPhotoFrameProviderProps> = ({ children }) => {
  const [capturedImageCanvas, setCapturedImageCanvas] = useState<HTMLCanvasElement | null>(null);
  const [overlayImageCanvas, setOverlayImageCanvas] = useState<HTMLCanvasElement | null>(null);

  return (
    <ArPhotoFrameContext.Provider
    value={
      {
        capturedImageCanvas,
        setCapturedImageCanvas,
        overlayImageCanvas,
        setOverlayImageCanvas
      }
    }>
      {children}
    </ArPhotoFrameContext.Provider>
  );
};