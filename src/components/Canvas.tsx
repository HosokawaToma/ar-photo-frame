import style from '@/styles/canvas.module.css'

const Canvas = ({ canvasRef }: CanvasProps) => {
  return (
    <canvas
      ref={canvasRef}
      className={style.canvas}
      ></canvas>
  )
}

export default Canvas