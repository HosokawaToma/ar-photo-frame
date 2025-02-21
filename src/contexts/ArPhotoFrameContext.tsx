import React, { createContext, useState } from 'react';

export const ArPhotoFrameContext = createContext<ArPhotoFrameContextType | undefined>(undefined);

export const ArPhotoFrameProvider: React.FC<ArPhotoFrameProviderProps> = ({ children }) => {
  const [capturedCanvas, setCapturedCanvas] = useState<HTMLCanvasElement | null>(null);
  const [overlayGif, setOverlayGif] = useState<Gif | null>(null);

  return (
    <ArPhotoFrameContext.Provider
    value={
      {
        capturedCanvas,
        setCapturedCanvas,
        overlayGif,
        setOverlayGif
      }
    }>
      {children}
    </ArPhotoFrameContext.Provider>
  );
};