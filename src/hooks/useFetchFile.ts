import { fetchFile } from "@/utils/fetchFile";
import { useState, useEffect } from "react";

const useFetchFile = (fileUrl: string) => {
  const [file, setFile] = useState<Uint8Array | null>(null);

  useEffect(() => {
    fetchFile(fileUrl).then((file) => {
      setFile(file)
    })
  }, [fileUrl]);

  return { file };
};

export default useFetchFile;
