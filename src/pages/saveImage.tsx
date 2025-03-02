import Canvas from "@/components/Canvas";
import SaveButton from "@/components/SaveButton";
import useGifAnimator from "@/hooks/useGifAnimator";
import useGifCompositor from "@/hooks/useGifCompositor";
import useGifEncoder from "@/hooks/useGifEncoder";
import useOnSave from "@/hooks/useOnSave";
import style from '@/styles/page.module.css'
import ShutterFadeOut from "@/components/ShutterFadeOut";
import Spinner from "@/components/Spinner";
import useArPhotoFrameContext from "@/hooks/useArPhotoFrameContext";

const SaveImage = () => {
  const { capturedCanvas, overlayGif } = useArPhotoFrameContext();
  const { combineGif } = useGifCompositor(overlayGif, capturedCanvas);
  const { canvasRef, onMount } = useGifAnimator(combineGif);
  const { blob } = useGifEncoder(combineGif);
  const { onSave } = useOnSave(blob);

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
