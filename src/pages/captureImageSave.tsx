"use client";

import { useEffect, useState } from 'react';
import NextjsImage from 'next/image';
import style from '../styles/captureImageSave.module.css';
import '../styles/reset.css';

const CaptureImageSavePage = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    const base64captureImage = sessionStorage.getItem('base64captureImage');
    if (base64captureImage) {
      setCapturedImage(base64captureImage);
    }
  }, []);

  const handleDownload = () => {
    if (!capturedImage) {
      return
    }
    const link = document.createElement("a");
    link.href = capturedImage;
    link.download = "capturedImage.png";
    link.click();
  };

  return (
    <div>
      {capturedImage ? (
        <NextjsImage
          src={capturedImage}
          alt="Captured"
          width={1000}
          height={100}
          className={style.image} />
      ) : (
        <p>No image captured</p>
      )}
      <button onClick={handleDownload}>ダウンロード</button>
    </div>
  );
};

export default CaptureImageSavePage;
