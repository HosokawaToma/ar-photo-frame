export const animateGif = (gif: Gif, canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("animateGif関数内で canvas の context を取得できませんでした...");
    return { start: () => {}, stop: () => {} };
  }

  let currentFrame = 0;
  let isAnimating = false;
  let timeoutId: NodeJS.Timeout | null = null;

  canvas.width = gif.width;
  canvas.height = gif.height;

  const drawFrame = (frameIndex: number) => {
    if (!isAnimating) return;

    const frame = gif.frames[frameIndex];
    const delay = frame.delay;

    ctx.putImageData(frame.imageData, 0, 0);

    timeoutId = setTimeout(() => {
      currentFrame = (currentFrame + 1) % gif.totalFrames;
      drawFrame(currentFrame);
    }, delay);
  };

  const start = () => {
    if (!isAnimating) {
      isAnimating = true;
      drawFrame(currentFrame);
    }
  };

  const stop = () => {
    isAnimating = false;
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return { start, stop };
};
