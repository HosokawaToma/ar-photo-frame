export async function fetchFileAsUint8Array(url: string): Promise<Uint8Array | null> {
  const response = await fetch(url);
  if (!response.ok) {
    return null;
  }
  const arrayBuffer = await response.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}
