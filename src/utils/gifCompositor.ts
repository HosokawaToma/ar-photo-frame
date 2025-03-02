export const compositeGif = (gif: Gif, imageData: ImageData): Gif => {
  const width = imageData.width;
  const height = imageData.height;
  const frames = [];
  const totalFrames = gif.totalFrames;

  for (let i = 0; i < totalFrames; i++) {
    const delay = gif.frames[i].delay
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.putImageData(imageData, 0, 0)
      const overlayCanvas = document.createElement("canvas");
      overlayCanvas.width = gif.frames[i].imageData.width;
      overlayCanvas.height = gif.frames[i].imageData.height;
      const overlayCtx =  overlayCanvas.getContext("2d");
      if (overlayCtx) {
        overlayCtx.putImageData(gif.frames[i].imageData, 0, 0);
        ctx.drawImage(overlayCanvas, 0, 0, width, height);
      }
      const combinedImageData = ctx.getImageData(0, 0, width, height);
      frames.push({ imageData: combinedImageData, delay: delay });
    }
  }

  return { frames: frames, width: width, height: height, totalFrames: totalFrames };
};