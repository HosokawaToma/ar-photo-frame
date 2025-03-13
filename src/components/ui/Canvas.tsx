import style from '@/styles/canvas.module.css'
import { classNames } from '@/utils/classNames';
import { useEffect } from "react";

const Canvas = ({ canvasRef, onMount, className }: CanvasProps) => {
  useEffect(() => {
    if (onMount) {
      onMount();
    }
  }, [onMount]);

  return (
    <canvas
      ref={canvasRef}
      className={classNames(style.canvas, className)}
      ></canvas>
  )
}

export default Canvas