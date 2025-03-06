import style from "@/styles/encodeModeToggleSwitch.module.css";

const EncodeModeToggleSwitch = ({ onClick, enabled }: ToggleSwitchProps) => {
  return (
    <div className={style["toggle-container"]} onClick={onClick}>
      <span className={style[enabled ? "enabled" : "disabled"]}>
        <span className={style["toggle-thumb"]} />
      </span>
      <div className={style["toggle-icons"]}>
        <span className={style[enabled ? "inactive" : "active"]}>
          <span className={style["icon"]}>PNG</span>
        </span>
        <span className={style[enabled ? "active" : "inactive"]}>
          <span className={style["icon"]}>GIF</span>
        </span>
      </div>
    </div>
  );
};

export default EncodeModeToggleSwitch;
