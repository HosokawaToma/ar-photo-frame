import Canvas from "@/components/Canvas";
import SaveButton from "@/components/SaveButton";
import useImageDataCompositor from "@/hooks/useImageDataCompositor";
import usePngEncoder from "@/hooks/usePngEncoder";
import useOnSave from "@/hooks/useOnSave";
import style from '@/styles/page.module.css'
import ShutterFadeOut from "@/components/ShutterFadeOut";
import ProgressIndicator from "@/components/ProgressIndicator";
import useArPhotoFrameContext from "@/hooks/useArPhotoFrameContext";
import useDrawImageData from "@/hooks/useDrawImageData";

const SaveImage = () => {
  const { capturedCanvas, overlayCanvas } = useArPhotoFrameContext();
  const { combinedImageData } = useImageDataCompositor(capturedCanvas, overlayCanvas);
  const { canvasRef } = useDrawImageData(combinedImageData);
  const { blob } = usePngEncoder(combinedImageData);
  const { onSave } = useOnSave(blob, '.png');

  return (
    <div className={style.body}>
        {combinedImageData && 
        <>
        <div>
          <Canvas canvasRef={canvasRef} />
          {blob && <SaveButton onClick={onSave} />}
          <ShutterFadeOut/>
        </div>
        <ProgressIndicator isLoading={!blob} className={style["mini-progress-indicator"]}>PNGにエンコード中...</ProgressIndicator>
        </>
        }
    </div>
  );
};

export default SaveImage;
