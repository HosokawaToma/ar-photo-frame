import Canvas from '@/components/Canvas';
import SaveButton from '@/components/SaveButton';
import useCanvasRenderer from '@/hooks/useCanvasRenderer';
import useImageSaver from '@/hooks/useImageSaver';

const SaveImage = () => {
  const { canvasRef } = useCanvasRenderer();
  const { onSave } = useImageSaver(canvasRef);

  return (
    <div>
      <Canvas canvasRef={canvasRef} />
      <SaveButton onClick={onSave} />
    </div>
  );
};

export default SaveImage;
