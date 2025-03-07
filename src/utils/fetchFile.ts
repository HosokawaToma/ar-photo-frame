export async function fetchFile(fileUrl: string): Promise<Uint8Array | null> {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) return null;

    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  } catch (error) {
    console.error("Error fetching file from public:", error);
    return null;
  }
}
