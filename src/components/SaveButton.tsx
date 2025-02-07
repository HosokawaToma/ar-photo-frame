import React from "react";
import style from "@/styles/saveButton.module.css";

const CaptureButton = ({ onClick }: ButtonProps) => {
  return (
    <button onClick={onClick} className={style.button}>
      保存
    </button>
  );
};

export default CaptureButton;