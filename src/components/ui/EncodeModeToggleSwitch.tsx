import { useCallback } from "react"
import style from "@/styles/encodeModeToggleSwitch.module.css";
import { classNames } from "@/utils/classNames";

const EncodeModeToggleSwitch = ({ fileEncodeMode, setFileEncodeMode, className }: ToggleSwitchProps) => {
  const onClick = useCallback(() => {
      setFileEncodeMode(fileEncodeMode === "png" ? "gif" : "png")
    }, [setFileEncodeMode, fileEncodeMode]);

  return (
    <div className={classNames(style["toggle-container"], className)} onClick={onClick}>
      <span className={classNames(style["toggle-thumb"], style[fileEncodeMode === "png" ? "png" : "gif"])} />
      <span className={classNames(style["icon"], style[fileEncodeMode === "png" ? "active" : "inactive"])}>PNG</span>
      <span className={classNames(style["icon"], style[fileEncodeMode === "gif" ? "active" : "inactive"])}>GIF</span>
    </div>
  );
};

export default EncodeModeToggleSwitch;
