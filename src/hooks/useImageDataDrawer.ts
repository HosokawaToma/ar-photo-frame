import { drawImageData } from "@/utils/imageDataDrawer";
import { useCallback, useRef } from "react";

const useImageDataDrawer = (imageData: ImageData | null) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onMount = useCallback(() => {
    if (imageData && canvasRef.current){
      drawImageData(imageData, canvasRef.current);
    }
  }, [imageData]);


  return { canvasRef, onMount };
};

export default useImageDataDrawer;
