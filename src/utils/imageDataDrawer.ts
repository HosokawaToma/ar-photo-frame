export const drawImageData = (imageData: ImageData, canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get 2D context");

    canvas.width = imageData.width;
    canvas.height = imageData.height;

    ctx.putImageData(imageData, 0, 0);
}