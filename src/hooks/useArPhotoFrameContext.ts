import { useContext } from "react";
import { ArPhotoFrameContext } from "@/contexts/ArPhotoFrameContext";

const useArPhotoFrameContext = () => {
  const context = useContext(ArPhotoFrameContext);
  if (!context) {
    throw new Error("useArPhotoFrameContext must be used within an ArPhotoFrameProvider");
  }
  return context;
};

export default useArPhotoFrameContext;