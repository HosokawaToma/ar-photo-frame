import Canvas from "@/components/ui/Canvas";
import SaveButton from "@/components/ui/SaveButton";
import useGifAnimator from "@/hooks/useGifAnimator";
import useGifCompositor from "@/hooks/useGifCompositor";
import useGifEncoder from "@/hooks/useGifEncoder";
import useOnSave from "@/hooks/useOnSave";
import style from "@/styles/page.module.css";
import ShutterFadeOut from "@/components/ui/ShutterFadeOut";
import ProgressIndicator from "@/components/ui/ProgressIndicator";
import useArPhotoFrameContext from "@/hooks/useArPhotoFrameContext";

const SaveImage = () => {
  const { capturedCanvas, overlayGif } = useArPhotoFrameContext();
  const { combineGif } = useGifCompositor(overlayGif, capturedCanvas);
  const { canvasRef, onMount } = useGifAnimator(combineGif);
  const { blob } = useGifEncoder(combineGif);
  const { onSave } = useOnSave(blob, ".gif");

  return (
    <div className={style.body}>
      <div className={style.container}>
        {combineGif && (
          <>
            <Canvas canvasRef={canvasRef} onMount={onMount} />
            <ProgressIndicator isLoading={!blob} className={style["mini-spinner"]}>
              GIFにエンコード中...
            </ProgressIndicator>
            {blob && <SaveButton onClick={onSave} className={style["save-button"]} />}
          </>
        )}
      </div>
      {combineGif && <ShutterFadeOut />}
    </div>
  );
};

export default SaveImage;
