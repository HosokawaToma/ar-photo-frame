import { decodeGif } from "@/utils/gifDecoder";
import { useState, useEffect } from "react";

const useGifDecoder = (file: ArrayBuffer | null) => {
  const [gif, setGif] = useState<Gif | null>(null);

  useEffect(() => {
    if(file){
      const gif = decodeGif(file);
      setGif(gif);
    }
  }, [file]);

  return { gif };
};

export default useGifDecoder;
