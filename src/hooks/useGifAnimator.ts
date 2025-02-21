import { animateGif } from "@/utils/gifAnimator";
import { useRef, useEffect } from "react";

const useGifAnimator = (gif: Gif | null) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (gif && canvasRef.current) {
      animateGif(gif, canvasRef.current);
    }
  }, [gif]);

  return { canvasRef};
};

export default useGifAnimator;
