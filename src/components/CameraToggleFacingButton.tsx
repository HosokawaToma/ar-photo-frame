import React from "react";
import styles from "@/styles/cameraToggleFacingButton.module.css";

const CameraToggleFacingButton = ({ onToggle }: { onToggle: () => void }) => {
  return (
    <button onClick={onToggle} className={styles.toggleButton}>
      <div className={styles.icon} />
    </button>
  );
};

export default CameraToggleFacingButton;
