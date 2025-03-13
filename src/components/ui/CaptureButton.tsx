import React from "react";
import style from "@/styles/captureButton.module.css";
import { classNames } from "@/utils/classNames";

const CaptureButton = ({ onClick, className }: ButtonProps) => {
  return (
    <button onClick={onClick} className={classNames(style["button"], className)}/>
  );
};

export default CaptureButton;
