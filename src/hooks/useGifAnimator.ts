import { animateGif } from "@/utils/gifAnimator";
import { useRef, useCallback } from "react";

const useGifAnimator = (gif: Gif | null) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const animate = useCallback(() => {
    if (gif && canvasRef.current) {
      animateGif(gif, canvasRef.current);
    }
  }, [gif])

  return { canvasRef, animate };
};

export default useGifAnimator;
