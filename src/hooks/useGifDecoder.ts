import { decodeGif } from "@/utils/gifDecoder";
import { useState, useEffect } from "react";

const useGifDecoder = (file: Uint8Array | null) => {
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
