import React from "react";
import style from "@/styles/captureButton.module.css";

const CaptureButton = ({ onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={style.button}>
      撮影
    </button>
  );
};

export default CaptureButton;
