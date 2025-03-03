export const compositeGif = (gif: Gif, imageData: ImageData): Gif => {
  const imageWidth = imageData.width;
  const imageHeight = imageData.height;
  const frames = [];
  const totalFrames = gif.totalFrames;

  for (let i = 0; i < totalFrames; i++) {
    const delay = gif.frames[i].delay;
    const canvas = document.createElement("canvas");
    canvas.width = imageWidth;
    canvas.height = imageHeight;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.putImageData(imageData, 0, 0);
      const overlayCanvas = document.createElement("canvas");
      const canvasWidth = gif.frames[i].imageData.width;
      const canvasHeight = gif.frames[i].imageData.height;
      overlayCanvas.width = canvasWidth;
      overlayCanvas.height = canvasHeight;
      const overlayCtx = overlayCanvas.getContext("2d");
      if (overlayCtx) {
        overlayCtx.putImageData(gif.frames[i].imageData, 0, 0);
        // 画像のアスペクト比
        const canvasAspectRatio = canvasWidth / canvasHeight;

        const drawWidth = imageHeight * canvasAspectRatio
        const drawHeight = imageHeight

        const offsetX = (imageWidth - drawWidth) / 2;
        const offsetY = (imageHeight - drawHeight) / 2;

        // アスペクト比を維持しながら描画
        ctx.drawImage(overlayCanvas, offsetX, offsetY, drawWidth, drawHeight);
      }
      const combinedImageData = ctx.getImageData(0, 0, imageWidth, imageHeight);
      frames.push({ imageData: combinedImageData, delay: delay });
    }
  }

  return { frames: frames, width: imageWidth, height: imageHeight, totalFrames: totalFrames };
};
