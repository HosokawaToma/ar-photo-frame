import Canvas from "@/components/ui/Canvas";
import SaveButton from "@/components/ui/SaveButton";
import useImageDataCompositor from "@/hooks/useImageDataCompositor";
import usePngEncoder from "@/hooks/usePngEncoder";
import useOnSave from "@/hooks/useOnSave";
import style from "@/styles/page.module.css";
import ShutterFadeOut from "@/components/ui/ShutterFadeOut";
import ProgressIndicator from "@/components/ui/ProgressIndicator";
import useArPhotoFrameContext from "@/hooks/useArPhotoFrameContext";
import useDrawImageData from "@/hooks/useDrawImageData";

const SaveImage = () => {
  const { capturedCanvas, overlayCanvas } = useArPhotoFrameContext();
  const { combinedImageData } = useImageDataCompositor(capturedCanvas, overlayCanvas);
  const { canvasRef } = useDrawImageData(combinedImageData);
  const { blob } = usePngEncoder(combinedImageData);
  const { onSave } = useOnSave(blob, ".png");

  return (
    <div className={style.body}>
      <div className={style["container"]}>
        {combinedImageData && (
          <>
            <Canvas canvasRef={canvasRef} className={style["canvas"]} />
            <ProgressIndicator isLoading={!blob} className={style["mini-progress-indicator"]}>
              PNGにエンコード中...
            </ProgressIndicator>
            {blob && <SaveButton onClick={onSave} className={style["save-button"]} />}
          </>
        )}
      </div>
      {combinedImageData && <ShutterFadeOut />}
    </div>
  );
};

export default SaveImage;
