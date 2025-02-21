export const loadFile = async (fileSrc: string): Promise<ArrayBuffer | null> => {
  try {
    const response = await fetch(fileSrc);
    const file = await response.arrayBuffer();
    return file;
  } catch (error) {
    console.error("GIF読み込みエラー:", error);
    return null;
  }
};
