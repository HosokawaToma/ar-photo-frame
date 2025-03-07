import { decodePng } from "@/utils/pngDecoder";
import { useState, useEffect } from "react";

const usePngDecoder = (file: Uint8Array | null) => {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  useEffect(() => {
    if(file){
      decodePng(file).then((imageData) => {
        setImageData(imageData)
      })
    }
  }, [file]);

  return { imageData };
};

export default usePngDecoder;
