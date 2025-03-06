import { compositeImageData } from "@/utils/imageDataCompositor";
import { useState, useEffect } from "react";

const useImageDataCompositor = (backgroundCanvas: HTMLCanvasElement | null, foregroundCanvas: HTMLCanvasElement | null) => {
  const [combinedImageData, setCombineImageData] = useState<ImageData | null>(null);

  useEffect(() => {
    if (backgroundCanvas && foregroundCanvas) {
      const backgroundCanvasContext = backgroundCanvas.getContext("2d");
      const foregroundCanvasContext = foregroundCanvas.getContext("2d");
      if (backgroundCanvasContext && foregroundCanvasContext) {
        const backgroundImageData = backgroundCanvasContext.getImageData(0, 0, backgroundCanvas.width, backgroundCanvas.height);
        const foregroundImageData = foregroundCanvasContext.getImageData(0, 0, foregroundCanvas.width, foregroundCanvas.height)
        const combinedImageData = compositeImageData(backgroundImageData, foregroundImageData);
        setCombineImageData(combinedImageData);
      }
    }
  }, [backgroundCanvas, foregroundCanvas]);

  return { combinedImageData };
};

export default useImageDataCompositor;
