export const canvasComposition = (capturedCanvas: HTMLCanvasElement, overlayCanvas: HTMLCanvasElement): HTMLCanvasElement | null => {
  const capturedCanvasContext = capturedCanvas.getContext('2d');
  if (!capturedCanvasContext) {
    return null;
  }
  capturedCanvasContext.drawImage(
    overlayCanvas,
    0,
    capturedCanvas.height / 2 - ((capturedCanvas.width / overlayCanvas.width) * overlayCanvas.height) / 2,
    capturedCanvas.width,
    (capturedCanvas.width / overlayCanvas.width) * overlayCanvas.height
  );
  return capturedCanvasContext.canvas
};