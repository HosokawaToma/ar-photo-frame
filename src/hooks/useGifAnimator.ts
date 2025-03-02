import { animateGif } from "@/utils/gifAnimator";
import { useRef, useCallback } from "react";

const useGifAnimator = (gif: Gif | null) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onMount = useCallback(() => {
    if (gif && canvasRef.current) {
      animateGif(gif, canvasRef.current);
    }
  }, [gif]);

  return { canvasRef, onMount };
};

export default useGifAnimator;
