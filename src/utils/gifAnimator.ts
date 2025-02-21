export const animateGif = (gif: Gif, canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");

  if (ctx){
    canvas.width = gif.width;
    canvas.height = gif.height;
  
    let currentFrame = 0;
  
    const drawFrame = (frameIndex: number) => {
      const frame = gif.frames[frameIndex]
      const delay = frame.delay;
  
      ctx.putImageData(frame.imageData, 0, 0);
  
      setTimeout(() => {
          currentFrame = (currentFrame + 1) % gif.totalFrames;
          drawFrame(currentFrame);
      }, delay);
    };
  
    drawFrame(currentFrame); 
  }
};