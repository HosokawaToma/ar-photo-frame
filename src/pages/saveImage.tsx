import Canvas from "@/components/Canvas";
import SaveButton from "@/components/SaveButton";
import { ArPhotoFrameContext } from "@/contexts/ArPhotoFrameContext";
import useGifAnimator from "@/hooks/useGifAnimator";
import useGifCombiner from "@/hooks/useGifCombiner";
import useGifEncoder from "@/hooks/useGifEncoder";
import useOnSave from "@/hooks/useOnSave";
import { useContext } from "react";

const SaveImage = () => {
  const context = useContext(ArPhotoFrameContext);
  if (!context) {
    throw new Error("Context must be used within a Provider");
  }
  const { capturedCanvas, overlayGif } = context;
  const { combineGif } = useGifCombiner(overlayGif, capturedCanvas);
  const { canvasRef } = useGifAnimator(combineGif);
  const { blob } = useGifEncoder(combineGif);
  const { onSave } = useOnSave(blob);

  return (
    <div>
      <Canvas canvasRef={canvasRef} />
      {blob && <SaveButton onClick={onSave} />}
    </div>
  );
};

export default SaveImage;
