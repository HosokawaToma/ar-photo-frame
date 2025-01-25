import React, { createContext, useState, ReactNode } from 'react';

export type ArPhotoFrameContextType = {
  capturedImageCanvas: HTMLCanvasElement | null,
  setCapturedImageCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>
  overlayImage: HTMLImageElement | null,
  setOverlayImage: React.Dispatch<React.SetStateAction<HTMLImageElement | null>>
};

export const ArPhotoFrameContext = createContext<ArPhotoFrameContextType | undefined>(undefined);

type ArPhotoFrameProviderProps = {
  children: ReactNode;
};

export const ArPhotoFrameProvider: React.FC<ArPhotoFrameProviderProps> = ({ children }) => {
  const [capturedImageCanvas, setCapturedImageCanvas] = useState<HTMLCanvasElement | null>(null);
  const [overlayImage, setOverlayImage] = useState<HTMLImageElement | null>(null);

  return (
    <ArPhotoFrameContext.Provider
    value={
      {
        capturedImageCanvas,
        setCapturedImageCanvas,
        overlayImage,
        setOverlayImage
      }
    }>
      {children}
    </ArPhotoFrameContext.Provider>
  );
};