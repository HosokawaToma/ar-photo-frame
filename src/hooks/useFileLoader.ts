import { loadFile } from "@/utils/fileLoader";
import { useState, useEffect } from "react";

const useFileLoader = (fileSrc: string) => {
  const [file, setFile] = useState<ArrayBuffer | null>(null);

  useEffect(() => {
    loadFile(fileSrc).then((file) => {
      setFile(file);
    });
  }, [fileSrc]);

  return { file };
};

export default useFileLoader