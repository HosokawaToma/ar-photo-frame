import { GifReader } from "omggif";

export const decodeGif = (file: Uint8Array): Gif => {
  const reader = new GifReader(file);
  const width = reader.width;
  const height = reader.height;
  const frames = [];
  const totalFrames = reader.numFrames()

  for (let i = 0; i < totalFrames; i++) {
    const frameInfo = reader.frameInfo(i);
    const delay = frameInfo.delay * 10;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const imageData = ctx.createImageData(width, height);
      reader.decodeAndBlitFrameRGBA(i, imageData.data);
      frames.push({ imageData, delay: delay });
    }
  }

  return { frames: frames, width: width, height: height, totalFrames: totalFrames };
};
