export const mirrorCanvas = (canvas: HTMLCanvasElement | null) => {
  if (!canvas) return null;
  const newCanvas = document.createElement("canvas");
  newCanvas.width = canvas.width;
  newCanvas.height = canvas.height;
  const ctx = newCanvas.getContext("2d");
  if (!ctx) return null;
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height);

  return newCanvas;
};
