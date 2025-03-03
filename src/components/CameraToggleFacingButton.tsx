import React from "react";
import { IconButton } from "@mui/material";
import PartyModeIcon from "@mui/icons-material/PartyMode";
import styles from "@/styles/CameraToggleFacingButton.module.css";

const CameraToggleFacingButton = ({ onToggle }: { onToggle: () => void }) => {
  return (
    <div className={styles.buttonWrapper}>
      <IconButton onClick={onToggle} className={styles.toggleButton}>
        <PartyModeIcon className={styles.icon} sx={{ fontSize: "3rem" }} />
      </IconButton>
    </div>
  );
};

export default CameraToggleFacingButton;
