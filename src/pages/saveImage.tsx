import Canvas from "@/components/Canvas";
import SaveButton from "@/components/SaveButton";
import { ArPhotoFrameContext } from "@/contexts/ArPhotoFrameContext";
import useGifAnimator from "@/hooks/useGifAnimator";
import useGifCombiner from "@/hooks/useGifCombiner";
import useGifEncoder from "@/hooks/useGifEncoder";
import useOnSave from "@/hooks/useOnSave";
import { useCallback, useContext } from "react";
import style from '@/styles/page.module.css'
import ShutterFadeOut from "@/components/ShutterFadeOut";
import Spinner from "@/components/Spinner";

const SaveImage = () => {
  const context = useContext(ArPhotoFrameContext);
  if (!context) {
    throw new Error("Context must be used within a Provider");
  }
  const { capturedCanvas, overlayGif } = context;
  const { combineGif } = useGifCombiner(overlayGif, capturedCanvas);
  const { canvasRef, animate } = useGifAnimator(combineGif);
  const { blob } = useGifEncoder(combineGif);
  const { onSave } = useOnSave(blob);

 const onMount = useCallback(() => {
  animate()
 }, [animate])

  return (
    <div className={style.body}>
        <div>
          <Canvas canvasRef={canvasRef} onMount={onMount} />
          {blob && <SaveButton onClick={onSave} />}
          <ShutterFadeOut/>
        </div>
        {!blob && <Spinner className={style["mini-spinner"]}>GIFにエンコード中...</Spinner>}
    </div>
  );
};

export default SaveImage;
