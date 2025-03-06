import { animateGif } from "@/utils/gifAnimator";
import { useCallback, useRef, useState } from "react";

const useGifAnimator = (gif: Gif | null) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [animateStop, setAnimateStop] = useState<() => void>(() => {});

  const onMount = useCallback(() => {
    if (gif && canvasRef.current){
      const { start, stop } = animateGif(gif, canvasRef.current);
      start();
      setAnimateStop(() => stop)
    }
  }, [gif]);


  return { canvasRef, onMount, animateStop};
};

export default useGifAnimator;
