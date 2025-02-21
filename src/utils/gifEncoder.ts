import GIF from 'gif.js';

export const encodeGif = (gif: Gif): Promise<Blob> => {
  return new Promise((resolve) => {
    const newGif = new GIF({
      workers: 2,
      quality: 10,
      width: gif.width,
      height: gif.height
    });

    gif.frames.map((frame) => {
      newGif.addFrame(frame.imageData, {delay: frame.delay, copy: true})
    });

    newGif.on('finished', (blob: Blob) => {
      resolve(blob);
    });

    newGif.render();
  });
};
