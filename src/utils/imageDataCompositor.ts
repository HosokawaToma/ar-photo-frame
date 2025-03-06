export const compositeImageData = (background: ImageData, foreground: ImageData): ImageData | null => {
  const canvas = document.createElement("canvas");
  canvas.width = background.width;
  canvas.height = background.height;
  const ctx = canvas.getContext("2d");
  const overlayCanvas = document.createElement("canvas");
  overlayCanvas.width = foreground.width;
  overlayCanvas.height = foreground.height;
  const overlayCtx = overlayCanvas.getContext("2d");

  if (!ctx || !overlayCtx) {
    return null;
  }

  ctx.putImageData(background, 0, 0);
  overlayCtx.putImageData(foreground, 0, 0);
  const canvasAspectRatio = foreground.width / foreground.height;
  const drawWidth = background.height * canvasAspectRatio;
  const drawHeight = background.height;
  const offsetX = (background.width - drawWidth) / 2;
  const offsetY = (background.height - drawHeight) / 2;
  ctx.drawImage(overlayCanvas, offsetX, offsetY, drawWidth, drawHeight);
  const combinedImageData = ctx.getImageData(0, 0, background.width, background.height);
  return combinedImageData;
};
