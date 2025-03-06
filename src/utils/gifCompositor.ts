import { compositeImageData } from "./imageDataCompositor";

export const compositeGif = (gif: Gif, imageData: ImageData): Gif => {
  const imageWidth = imageData.width;
  const imageHeight = imageData.height;
  const frames = [];
  const totalFrames = gif.totalFrames;

  for (let i = 0; i < totalFrames; i++) {
    const delay = gif.frames[i].delay;
    const combinedImageData = compositeImageData(imageData, gif.frames[i].imageData);
    if (combinedImageData) {
      frames.push({ imageData: combinedImageData, delay: delay });
    }
  }
  return { frames: frames, width: imageWidth, height: imageHeight, totalFrames: totalFrames };
};
