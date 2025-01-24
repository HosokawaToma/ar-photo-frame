import React, { createContext, useState, ReactNode } from 'react';

export type ArPhotoFrameContextType = {
  capturedImage: string | null,
  setCapturedImage: React.Dispatch<React.SetStateAction<string | null>>
  overlayImagePath: string,
};

export const ArPhotoFrameContext = createContext<ArPhotoFrameContextType | undefined>(undefined);

type ArPhotoFrameProviderProps = {
  children: ReactNode;
};

export const ArPhotoFrameProvider: React.FC<ArPhotoFrameProviderProps> = ({ children }) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const overlayImagePath = '/6144x8192.png';

  return (
    <ArPhotoFrameContext.Provider
    value={
      {
        capturedImage,
        setCapturedImage,
        overlayImagePath,
      }
    }>
      {children}
    </ArPhotoFrameContext.Provider>
  );
};