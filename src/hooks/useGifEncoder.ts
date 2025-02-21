import { encodeGif } from "@/utils/gifEncoder";
import { useState, useEffect } from "react";

const useGifEncoder = (gif: Gif | null) => {
  const [blob, setBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if (gif) {
      encodeGif(gif).then((blob) => {
        setBlob(blob);
      });
    }
  }, [gif]);

  return { blob };
};

export default useGifEncoder;
