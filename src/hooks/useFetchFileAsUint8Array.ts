import { fetchFileAsUint8Array } from "@/utils/fetchFileAsUint8Array";
import { useState, useEffect } from "react";

const useFetchFileAsUint8Array = (url: string) => {
  const [file, setFile] = useState<Uint8Array | null>(null);

  useEffect(() => {
    fetchFileAsUint8Array(url).then((file) => {
      setFile(file)
    })
  }, [url]);

  return { file };
};

export default useFetchFileAsUint8Array;
