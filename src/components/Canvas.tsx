import style from '@/styles/canvas.module.css'
import { useEffect } from "react";

const Canvas = ({ canvasRef, onMount }: CanvasProps) => {
  useEffect(() => {
    if (onMount) {
      onMount();
    }
  }, [onMount]);

  return (
    <canvas
      ref={canvasRef}
      className={style.canvas}
      ></canvas>
  )
}

export default Canvas