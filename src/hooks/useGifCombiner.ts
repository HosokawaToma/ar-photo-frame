import { combineGifWithImageData } from "@/utils/gifCombiner";
import { useState, useEffect } from "react";

const useGifCombiner = (gif: Gif | null, canvas: HTMLCanvasElement | null) => {
  const [combineGif, setCombineGif] = useState<Gif | null>(null);

  useEffect(() => {
    if (gif && canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const combineGif = combineGifWithImageData(gif, imageData);
        setCombineGif(combineGif);
      }
    }
  }, [gif, canvas]);

  return { combineGif };
};

export default useGifCombiner;
