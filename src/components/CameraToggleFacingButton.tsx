import React from "react";
import Image from "next/image";
import style from "@/styles/cameraToggleFacingButton.module.css";
import { classNames } from "@/utils/classNames";

const CameraToggleFacingButton = ({ onClick, className }: ButtonProps) => {
  return (
    <button onClick={onClick} className={classNames(style["button"], className)}>
      <Image src="/icons/switch_camera.svg" alt="カメラ切替" layout='fill' className={style["icon"]} />
    </button>
  );
};

export default CameraToggleFacingButton;
