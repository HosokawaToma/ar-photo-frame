import Webcam from "react-webcam";
import style from "@/styles/camera.module.css";

const Camera = ({ webcamRef }: CameraProps) => {
  const videoConstraints: MediaTrackConstraints = {
    width: { ideal: 6144 },
    height: { ideal: 8192 },
    aspectRatio: { exact: 4 / 3 },
    facingMode: { ideal: "environment" },
  };

  return (
    <Webcam
      audio={false}
      ref={webcamRef}
      forceScreenshotSourceSize={true}
      screenshotFormat="image/png"
      videoConstraints={videoConstraints}
      className={style.camera}
    />
  );
};

export default Camera;
