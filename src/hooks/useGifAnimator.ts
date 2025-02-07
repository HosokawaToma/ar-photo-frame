import { useEffect, useRef, useCallback } from "react";
import "gifler";

const useGifAnimator = (Gif: string) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const giflerAnimatorRef = useRef<GiflerAnimator | null>(null);

  useEffect(() => {
    const onDrawFrame = (ctx: CanvasRenderingContext2D, frame: { buffer: CanvasImageSource }) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(frame.buffer, 0, 0, ctx.canvas.width, ctx.canvas.height);
    };

    if (window.gifler) {
      window.gifler(Gif).get((animator) => {
        giflerAnimatorRef.current = animator;
        animator.onDrawFrame = onDrawFrame;
        animator.animateInCanvas(canvasRef.current, false);
      });
    }
  }, [Gif]);

  const captureFrame = useCallback((): HTMLCanvasElement | null => {
    if (!giflerAnimatorRef.current) {
      return null;
    }
    giflerAnimatorRef.current.stop();
    return canvasRef.current
    }, []);

  return { canvasRef, captureFrame };
};

export default useGifAnimator;
