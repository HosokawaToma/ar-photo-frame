import { formatDate } from '@/utils/formatDate';
import { useCallback } from 'react';

const useOnSave = (blob: Blob | null, extension: string) => {
  const onSave = useCallback(() => {
    if (blob) {
      const link = document.createElement('a');
      document.body.appendChild(link);
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.download = 'oecu_' + formatDate() + extension;
      link.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    }
  }, [blob, extension]);
  return { onSave };
};

export default useOnSave;
