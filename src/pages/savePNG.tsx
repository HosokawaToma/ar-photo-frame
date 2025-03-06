import Canvas from "@/components/Canvas";
import SaveButton from "@/components/SaveButton";
import useImageDataCompositor from "@/hooks/useImageDataCompositor";
import usePngEncoder from "@/hooks/usePngEncoder";
import useOnSave from "@/hooks/useOnSave";
import style from '@/styles/page.module.css'
import ShutterFadeOut from "@/components/ShutterFadeOut";
import Spinner from "@/components/Spinner";
import useArPhotoFrameContext from "@/hooks/useArPhotoFrameContext";
import useDrawImageData from "@/hooks/useDrawImageData";

const SaveImage = () => {
  const { capturedCanvas, overlayCanvas } = useArPhotoFrameContext();
  const { combinedImageData } = useImageDataCompositor(capturedCanvas, overlayCanvas);
  const { canvasRef } = useDrawImageData(combinedImageData);
  const { blob } = usePngEncoder(combinedImageData);
  const { onSave } = useOnSave(blob);

  return (
    <div className={style.body}>
        {combinedImageData && 
        <>
        <div>
          <Canvas canvasRef={canvasRef} />
          {blob && <SaveButton onClick={onSave} />}
          <ShutterFadeOut/>
        </div>
        {!blob && <Spinner className={style["mini-spinner"]}>PNGにエンコード中...</Spinner>}
        </>
        }
    </div>
  );
};

export default SaveImage;
