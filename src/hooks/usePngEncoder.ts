import { encodePng } from "@/utils/pngEncoder";
import { useState, useEffect } from "react";

const useGifEncoder = (ImageData: ImageData | null) => {
  const [blob, setBlob] = useState<Blob | null>(null);

  useEffect(() => {
    if (ImageData) {
      encodePng(ImageData).then((blob) => {
        setBlob(blob);
      });
    }
  }, [ImageData]);

  return { blob };
};

export default useGifEncoder;
