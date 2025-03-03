import React from "react";
import styles from "@/styles/cameraToggleFacingButton.module.css";

const CameraToggleFacingButton = ({ onToggle }: { onToggle: () => void }) => {
  return (
    <button onClick={onToggle} className={styles.toggleButton}>
      <img src="/images/switch_camera.svg" alt="カメラ切替" className={styles.icon} />
    </button>
  );
};

export default CameraToggleFacingButton;
