import { useCallback } from 'react';
import { generateRandomString } from '@/utils/generateRandomString';

const useImageSaver = (canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
  const onSave = useCallback(() => {
    if (!canvasRef.current) {
      return;
    }

    const link = document.createElement('a');
    canvasRef.current.toBlob((blob) => {
      if (!blob) {
        return;
      }
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = generateRandomString(16) + '.png';
      link.click();
      URL.revokeObjectURL(url);
    });
  }, [canvasRef]);

  return { onSave };
};

export default useImageSaver;
